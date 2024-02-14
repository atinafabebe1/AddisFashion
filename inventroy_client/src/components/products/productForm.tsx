import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import {
  Grid,
  Container,
  TextInput,
  Button,
  Select,
  ColorPicker,
  Checkbox,
} from '@mantine/core'
import { FileInput } from '@mantine/core'
import axios from 'axios'

interface Category {
  _id: string
  name: string
  subcategories?: Subcategory[]
}

interface Subcategory {
  subcategories: any
  _id: string
  name: string
}

interface FormData {
  name: string
  description: string
  category: string
  brand: string
  price: string
  sizeAvailable: string[]
  colorsAvailable: string[]
  quantity: number
  discountsPromotions: string
  shippingInformation?: string
  images: File[]
}

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    category: '',
    brand: '', //
    price: '', //
    sizeAvailable: [], //
    quantity: 0, //
    colorsAvailable: [],
    discountsPromotions: '',
    images: [],
  })

  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3101/api/category/get',
        )
        setCategories(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCategories()
  }, [])

  const flattenCategories = (
    categories: Category[],
    level: number = 0,
  ): { value: string; label: string; style?: React.CSSProperties }[] => {
    const flattenSubcategories = (
      subcategories: Subcategory[] = [],
      parentValue: string,
    ): { value: string; label: string; style?: React.CSSProperties }[] => {
      return subcategories.flatMap((subcategory) => [
        {
          value: `${parentValue}-${subcategory._id}`,
          label: `${'  '.repeat(level)}- ${subcategory.name}`,
          style: { marginLeft: `${level * 20}px`, fontWeight: 'normal' },
        },
        ...(subcategory.subcategories
          ? flattenSubcategories(
              subcategory.subcategories,
              `${parentValue}-${subcategory._id}`,
            )
          : []),
      ])
    }

    return categories.flatMap((category) => [
      {
        value: category._id,
        label: category.name,
        style: { fontWeight: 'bold' },
      },
      ...(category.subcategories
        ? flattenSubcategories(category.subcategories, category._id)
        : []),
    ])
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (files: (File | null)[]) => {
    const filteredFiles = files.filter(Boolean) as File[]
    setFormData({ ...formData, images: filteredFiles })
  }

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value })
  }
  const handleSizeChange = (size: string) => {
    setFormData((prevData) => {
      const updatedSizes = prevData.sizeAvailable.includes(size)
        ? prevData.sizeAvailable.filter((s) => s !== size)
        : [...prevData.sizeAvailable, size]

      return { ...prevData, sizeAvailable: updatedSizes }
    })
  }
  const handleColorChange = (color: string) => {
    console.log(color)
    setFormData({
      ...formData,
      colorsAvailable: [...formData.colorsAvailable, color],
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = new FormData()
    form.append('name', formData.name)
    form.append('description', formData.description)
    form.append('category', formData.category)
    form.append('discountsPromotions', formData.discountsPromotions)
    form.append('brand', formData.brand)
    form.append('price', formData.price)
    form.append('quantity', formData.quantity.toString())

    formData.sizeAvailable.forEach((size) => {
      form.append('sizesAvailable', size)
    })
    form.append('colorsAvailable', JSON.stringify(formData.colorsAvailable))

    formData.images.forEach((image) => {
      form.append('images', image)
    })
    console.log(formData)
    console.log(form)
    try {
      const response = await axios.post(
        'http://localhost:3101/api/product/create',
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        },
      )

      console.log(response.data)
      // Handle success, e.g., show a success message or redirect
    } catch (error) {
      console.error(error)
      // Handle error, e.g., display an error message to the user
    }
  }

  return (
    <Container size="md">
      <form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <Select
              label="Category"
              placeholder="Select a category"
              data={flattenCategories(categories)}
              value={formData.category}
              onChange={(value) => handleCategoryChange(value as string)}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <label htmlFor="colorPicker">Colors Available</label>
            <ColorPicker
              format="hex"
              onChange={handleColorChange}
              swatches={[
                '#2e2e2e',
                '#868e96',
                '#fa5252',
                '#e64980',
                '#be4bdb',
                '#7950f2',
                '#4c6ef5',
                '#228be6',
                '#15aabf',
                '#12b886',
                '#40c057',
                '#82c91e',
                '#fab005',
                '#fd7e14',
              ]}
            />
            <div style={{ marginTop: '10px' }}>
              <strong>Selected Colors:</strong>
              <div style={{ display: 'flex', marginTop: '5px' }}>
                {formData.colorsAvailable.map((color, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: color,
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      margin: '0 5px',
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </Grid.Col>

          <Grid.Col span={6}>
            <label htmlFor="sizeCheckboxes">Size Available</label>
            <div
              id="sizeCheckboxes"
              style={{
                display: 'flex',
                marginTop: '10px',
                marginBottom: '10px',
              }}
            >
              {['Small', 'Medium', 'Large', 'XL', 'XXL'].map((size) => (
                <div style={{ marginRight: '20px' }}>
                  <Checkbox
                    key={size}
                    id={`size-${size}`}
                    label={size}
                    checked={formData.sizeAvailable.includes(size)}
                    onChange={() => handleSizeChange(size)}
                  />
                </div>
              ))}
            </div>
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              label="Discounts/Promotions"
              name="discountsPromotions"
              value={formData.discountsPromotions}
              onChange={handleInputChange}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <FileInput
              label="Upload Images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Button type="submit" style={{ marginTop: 16 }}>
              Submit
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  )
}

export default ProductForm
