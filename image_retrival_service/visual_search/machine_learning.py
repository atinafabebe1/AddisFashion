import os
import numpy as np
import tensorflow as tf
from keras.preprocessing import image as keras_image
from sklearn.neighbors import NearestNeighbors
import requests
from io import BytesIO

img_width, img_height = 224, 224  
 
def conv_block(x, filters, kernel_size, strides, name):
    shortcut = x
    x = tf.keras.layers.Conv2D(filters, kernel_size, strides=strides, padding='same', name=name + '_conv1')(x)
    x = tf.keras.layers.BatchNormalization(axis=3, name=name + '_bn1')(x)
    x = tf.keras.layers.Activation('relu', name=name + '_relu1')(x)
    x = tf.keras.layers.Conv2D(filters, kernel_size, strides=1, padding='same', name=name + '_conv2')(x)
    x = tf.keras.layers.BatchNormalization(axis=3, name=name + '_bn2')(x)
    x = tf.keras.layers.Add(name=name + '_add')([shortcut, x])
    x = tf.keras.layers.Activation('relu', name=name + '_relu2')(x)
    return x

def conv_block_proj(x, filters, kernel_size, strides, name):
    shortcut = tf.keras.layers.Conv2D(filters, 1, strides=strides, padding='same', name=name + '_conv_proj')(x)
    shortcut = tf.keras.layers.BatchNormalization(axis=3, name=name + '_bn_proj')(shortcut)
    x = tf.keras.layers.Conv2D(filters, kernel_size, strides=strides, padding='same', name=name + '_conv1')(x)
    x = tf.keras.layers.BatchNormalization(axis=3, name=name + '_bn1')(x)
    x = tf.keras.layers.Activation('relu', name=name + '_relu1')(x)
    x = tf.keras.layers.Conv2D(filters, kernel_size, strides=1, padding='same', name=name + '_conv2')(x)
    x = tf.keras.layers.BatchNormalization(axis=3, name=name + '_bn2')(x)
    x = tf.keras.layers.Add(name=name + '_add')([shortcut, x])
    x = tf.keras.layers.Activation('relu', name=name + '_relu2')(x)
    return x

def AddisVisualSearch(input_shape):
    x_input = tf.keras.layers.Input(input_shape)
    x = tf.keras.layers.ZeroPadding2D((3, 3))(x_input)
    x = tf.keras.layers.Conv2D(64, (7, 7), strides=(2, 2), name='conv1')(x)
    x = tf.keras.layers.BatchNormalization(axis=3, name='bn_conv1')(x)
    x = tf.keras.layers.Activation('relu')(x)
    x = tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2))(x)
    x = conv_block_proj(x, 256, (3, 3), strides=(1, 1), name='res2a')
    x = conv_block(x, 256, (3, 3), strides=(1, 1), name='res2b')
    x = conv_block(x, 256, (3, 3), strides=(1, 1), name='res2c')
    x = conv_block_proj(x, 512, (3, 3), strides=(2, 2), name='res3a')
    x = conv_block(x, 512, (3, 3), strides=(1, 1), name='res3b')
    x = conv_block(x, 512, (3, 3), strides=(1, 1), name='res3c')
    x = conv_block(x, 512, (3, 3), strides=(1, 1), name='res3d')
    x = conv_block_proj(x, 1024, (3, 3), strides=(2, 2), name='res4a')
    x = conv_block(x, 1024, (3, 3), strides=(1, 1), name='res4b')
    x = conv_block(x, 1024, (3, 3), strides=(1, 1), name='res4c')
    x = conv_block(x, 1024, (3, 3), strides=(1, 1), name='res4d')
    x = conv_block(x, 1024, (3, 3), strides=(1, 1), name='res4e')
    x = conv_block(x, 1024, (3, 3), strides=(1, 1), name='res4f')
    x = conv_block_proj(x, 2048, (3, 3), strides=(2, 2), name='res5a')
    x = conv_block(x, 2048, (3, 3), strides=(1, 1), name='res5b')
    x = conv_block(x, 2048, (3, 3), strides=(1, 1), name='res5c')
    x = tf.keras.layers.AveragePooling2D((7, 7), name='avg_pool')(x)
    x = tf.keras.layers.Flatten()(x)
    model = tf.keras.models.Model(inputs=x_input, outputs=x, name='AddisVisualSearch')
    return model

visual_search_model = AddisVisualSearch(input_shape=(img_width, img_height, 3))

def load_images_and_compute_features_from_api(api_url, model):
    image_paths = []
    feature_vectors = []

    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json().get('data', [])

        for product in data:
            images = product.get('images', [])

            for image_url in images:
                image_data = requests.get(image_url).content

                image = keras_image.load_img(BytesIO(image_data), target_size=(img_width, img_height))

                image_array = keras_image.img_to_array(image)
                image_array = np.expand_dims(image_array, axis=0)
                image_array = tf.keras.applications.resnet50.preprocess_input(image_array)

                feature_vector = model.predict(image_array)

                image_paths.append(image_url)  
                feature_vectors.append(feature_vector.flatten())

        print("\rLoading completed.")

        if not feature_vectors:
            print("No images were loaded. Check your API response structure and image URLs.")

    else:
        print(f"Failed to fetch data from the API. Status code: {response.status_code}")

    return image_paths, feature_vectors


def download_images_from_urls(image_urls, save_directory):
    downloaded_paths = []
    for i, url in enumerate(image_urls):
        response = requests.get(url)
        if response.status_code == 200:
            image_content = response.content
            image_name = f'image_{i}.jpg'
            image_path = os.path.join(save_directory, image_name)
            with open(image_path, 'wb') as image_file:
                image_file.write(image_content)
            downloaded_paths.append(image_path)
            print(f"Downloaded image {i + 1}/{len(image_urls)} from the API: {image_path}")
        else:
            print(f"Failed to download image {i + 1} from the API. Status code: {response.status_code}")

    return downloaded_paths

def fetch_and_save_images(api_url, save_directory):
    response = requests.get(api_url)
    if response.status_code == 200:
        data = response.json().get('data', [])
        
        image_urls = [image_info for product_info in data for image_info in product_info.get('images', [])]

        downloaded_paths = download_images_from_urls(image_urls, save_directory)

        return downloaded_paths
    else:
        print(f"Failed to fetch images from API. Status code: {response.status_code}")
        return []


def perform_image_retrieval(query_image_path, knn_model, model):
    query_image = keras_image.load_img(query_image_path, target_size=(img_width, img_height))
    query_image_array = keras_image.img_to_array(query_image)
    query_image_array = np.expand_dims(query_image_array, axis=0)
    query_image_array = tf.keras.applications.resnet50.preprocess_input(query_image_array) 
    query_feature_vector = model.predict(query_image_array).flatten()

    _, indices = knn_model.kneighbors([query_feature_vector])

    similar_image_paths = [train_image_paths[i] for i in indices.flatten()]

    return similar_image_paths

def update_model_with_new_images(new_images_directory, visual_search_model, knn_model, train_image_paths):
    existing_feature_vectors = np.array(train_feature_vectors)

    new_image_paths, new_feature_vectors = load_images_and_compute_features(new_images_directory, visual_search_model)

    new_feature_vectors = np.array(new_feature_vectors)

    all_feature_vectors = np.concatenate([existing_feature_vectors, new_feature_vectors])

    new_knn_model = NearestNeighbors(n_neighbors=5, metric='cosine')
    new_knn_model.fit(all_feature_vectors)

    knn_model._fit_X = new_knn_model._fit_X
    knn_model._tree = new_knn_model._tree

    train_image_paths.extend(new_image_paths)

    print("Model updated with new product images.")

api_url = "http://localhost:3101/api/product/get"

api_downloaded_paths = fetch_and_save_images(api_url, 'train')
print(api_downloaded_paths)
train_image_paths, train_feature_vectors = load_images_and_compute_features_from_api(api_url, visual_search_model)

train_feature_vectors = np.array(train_feature_vectors)

knn_model = NearestNeighbors(n_neighbors=5, metric='cosine')
knn_model.fit(train_feature_vectors)

model_save_path = 'visual_search_model.keras'
visual_search_model.save(model_save_path)

print("Script execution completed.")
