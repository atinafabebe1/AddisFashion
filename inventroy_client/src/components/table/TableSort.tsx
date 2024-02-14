import { useEffect, useState } from 'react'
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
} from '@mantine/core'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import classes from './TableSort.module.css'

interface RowData {
  id: string
  userId: string
  name: string
  description: string
  category?: ICategory
  brand: string
  price: string
  // sizesAvailable?: string[]
  // colorsAvailable?: string[]
  // images?: string[]
  // availability: boolean
  quantity: number
  // discountsPromotions?: string[]
  // shippingInformation: string
  // customerReviews?: string
  // ratings?: number
  // tagsKeywords?: string[]
  // relatedProducts?: string[]
}

interface ICategory {
  name?: string
}
interface ThProps {
  children: React.ReactNode
  reversed: boolean
  sorted: boolean
  onSort(): void
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  )
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => {
      const itemValue = item[key]

      if (itemValue !== undefined && itemValue !== null) {
        return itemValue.toString().toLowerCase().includes(query)
      }

      return false
    }),
  )
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData; reversed: boolean; search: string },
) {
  const { sortBy } = payload

  if (!sortBy || !Object.prototype.hasOwnProperty.call(data[0], sortBy)) {
    return filterData(data, payload.search)
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return (b[sortBy] ?? '')
          .toString()
          .localeCompare((a[sortBy] ?? '').toString())
      }

      return (a[sortBy] ?? '')
        .toString()
        .localeCompare((b[sortBy] ?? '').toString())
    }),
    payload.search,
  )
}

interface TableSortProps {
  productData: RowData[]
  sortBy?: keyof RowData | null
}

export function TableSort({ productData }: TableSortProps) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(productData)
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)

  useEffect(() => {
    setSortedData(
      sortData(productData, {
        sortBy: sortBy!,
        reversed: reverseSortDirection,
        search,
      }),
    )
  }, [productData, sortBy, reverseSortDirection, search])

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
  }

  const handleEdit = (row: RowData) => {
    // Placeholder function for handling edit action
    console.log('Edit:', row)
  }

  const handleDelete = (row: RowData) => {
    // Placeholder function for handling delete action
    console.log('Delete:', row)
  }
  const handleAddProduct = () => {
    navigate('/product/new')
  }

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.brand}</Table.Td>
      <Table.Td>{row.category?.name}</Table.Td>
      <Table.Td>{row.price}</Table.Td>
      <Table.Td>{row.quantity}</Table.Td>
      <Table.Td>
        <UnstyledButton onClick={() => handleEdit(row)}>
          <IconEdit style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </UnstyledButton>
      </Table.Td>
      <Table.Td>
        <UnstyledButton onClick={() => handleDelete(row)}>
          <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </UnstyledButton>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <ScrollArea>
      <Group align="left" mb="md" className={classes.groupContainer}>
        <TextInput
          placeholder="Search by any field"
          leftSection={
            <IconSearch
              style={{ width: rem(14), height: rem(16) }}
              stroke={1.5}
            />
          }
          value={search}
          onChange={handleSearchChange}
          className={classes.searchInput}
        />
        <UnstyledButton
          onClick={handleAddProduct}
          className={classes.addButton}
        >
          <IconPlus className={classes.addIcon} stroke={1.5} />
          <span className={classes.addProductText}>Add Product</span>
        </UnstyledButton>
      </Group>
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={800}>
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === 'brand'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('brand')}
            >
              Brand
            </Th>
            <Th
              sorted={sortBy === 'category'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('category')}
            >
              Category
            </Th>
            <Th
              sorted={sortBy === 'price'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('price')}
            >
              Price
            </Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th>Edit</Table.Th>
            <Table.Th>Delete</Table.Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  )
}
