from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .machine_learning import model_save_path, knn_model, train_image_paths, perform_image_retrieval, update_model_with_new_images
import json
import os
import tempfile
import tensorflow as tf
from PIL import Image
import io
import imghdr  

# Load the saved model
visual_search_model = tf.keras.models.load_model(model_save_path)

@csrf_exempt
@require_POST
def search_similar_products(request):
    try:
        # Access the uploaded file from the request.FILES
        uploaded_file = request.FILES['image']

        # Process the uploaded file
        with tempfile.NamedTemporaryFile(delete=False, suffix=get_file_extension(uploaded_file)) as temp_file:
            # Save the uploaded file to a temporary location
            for chunk in uploaded_file.chunks():
                temp_file.write(chunk)

            # Get the path to the saved temporary file
            temp_file_path = temp_file.name

            # Perform image retrieval with the file path
            similar_images = perform_image_retrieval(temp_file_path, knn_model, visual_search_model)

            # Return the list of similar images
            print(similar_images)
            response_data = {'similar_images': similar_images}
            return JsonResponse(response_data)
    except Exception as e:
        error_message = str(e)
        response_data = {'error': error_message}
        return JsonResponse(response_data, status=500)

@csrf_exempt
@require_POST
def update_model_with_new_images_view(request):
    try:
        # Access the uploaded file from the request.FILES
        uploaded_file = request.FILES['image']

        # Process the uploaded file
        with tempfile.NamedTemporaryFile(delete=False, suffix=get_file_extension(uploaded_file)) as temp_file:
            # Save the uploaded file to a temporary location
            for chunk in uploaded_file.chunks():
                temp_file.write(chunk)

            # Get the path to the saved temporary file
            temp_file_path = temp_file.name

            # Assuming the request contains a JSON body with additional data
            data = json.loads(request.POST.get('data', '{}'))
            new_images_directory = data.get('new_images_directory', '')

            # Update the model with new images using the temporary file path
            update_model_with_new_images(new_images_directory, visual_search_model, knn_model, [temp_file_path])

            # Return a success message
            response_data = {'message': 'Model updated successfully.'}
            return JsonResponse(response_data)
    except Exception as e:
        error_message = str(e)
        response_data = {'error': error_message}
        return JsonResponse(response_data, status=500)

def get_file_extension(uploaded_file):
    # Get the content type of the uploaded file
    content_type = uploaded_file.content_type

    # Determine the file extension based on the content type
    if content_type == 'image/jpeg':
        return '.jpg'
    elif content_type == 'image/png':
        return '.png'
    elif content_type == 'image/svg+xml':
        return '.svg'
    else:
        # Use a default extension (you can modify this based on your requirements)
        return '.jpg'


# Load the saved model
visual_search_model = tf.keras.models.load_model(model_save_path)

@csrf_exempt
@require_POST
def search_similar_products(request):
    try:
        # Access the uploaded file from the request.FILES
        uploaded_file = request.FILES['image']

        # Process the uploaded file
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            # Save the uploaded file to a temporary location
            for chunk in uploaded_file.chunks():
                temp_file.write(chunk)

            # Get the path to the saved temporary file
            temp_file_path = temp_file.name

            # Perform image retrieval with the file path
            similar_images = perform_image_retrieval(temp_file_path, knn_model, visual_search_model)

            # Return the list of similar images
            print(similar_images)
            response_data = {'similar_images': similar_images}
            return JsonResponse(response_data)
    except Exception as e:
        error_message = str(e)
        response_data = {'error': error_message}
        return JsonResponse(response_data, status=500)

@csrf_exempt
@require_POST
def update_model_with_new_images_view(request):
    try:
        # Access the uploaded file from the request.FILES
        uploaded_file = request.FILES['image']

        # Process the uploaded file
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            # Save the uploaded file to a temporary location
            for chunk in uploaded_file.chunks():
                temp_file.write(chunk)

            # Get the path to the saved temporary file
            temp_file_path = temp_file.name

            # Assuming the request contains a JSON body with additional data
            data = json.loads(request.POST.get('data', '{}'))
            new_images_directory = data.get('new_images_directory', '')

            # Update the model with new images using the temporary file path
            update_model_with_new_images(new_images_directory, visual_search_model, knn_model, [temp_file_path])

            # Return a success message
            response_data = {'message': 'Model updated successfully.'}
            return JsonResponse(response_data)
    except Exception as e:
        error_message = str(e)
        response_data = {'error': error_message}
        return JsonResponse(response_data, status=500)
