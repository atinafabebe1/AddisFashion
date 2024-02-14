import React, { useEffect, useState } from 'react'

const CartCard = (props: {
  item: { product: any; image: string | undefined }
  onRemove: any
}) => {
  const [quantityPrice, setQuantityPrice] = useState(props.item.product.price)
  const [quantity, setQuantity] = useState(1)
  useEffect(() => {
    console.log(props, 'the value')
  }, [])

  const handleQuantityMinus = () => {
    console.log('minus clicked')
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1))
  }

  const handleQuantityAdd = () => {
    console.log('add clicked')
    setQuantity((prevQuantity) => prevQuantity + 1)
  }

  const getTotalPrice = () => {
    return quantity * props.item.product.price
  }
  const handleRemove = () => {
    props.onRemove(props.item, quantity)
  }

  return (
    <div className="py-4 mb-8 border-t border-b border-gray-200 dark:border-gray-700">
      <div className="w-full flex justify-end px-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="top-0 right-0 cursor-pointer duration-150 hover:text-red-500"
          width="15"
          height="15"
          viewBox="0 0 100 100"
          onClick={handleRemove}
        >
          <line
            x1="10"
            y1="10"
            x2="90"
            y2="90"
            stroke="black"
            stroke-width="5"
          />
          <line
            x1="90"
            y1="10"
            x2="10"
            y2="90"
            stroke="black"
            stroke-width="5"
          />
          <style jsx>{`
            svg:hover {
              fill: red;
            }
          `}</style>
        </svg>
      </div>
      <div className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
        <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full px-4 mb-3 md:w-1/3">
              <div className="w-full h-96 md:h-24 md:w-24">
                <img
                  src={props.item.product.image}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="w-2/3 px-4">
              <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                DSL Camera
              </h2>
              <p className="text-gray-500 dark:text-gray-400 ">
                {props.item.product.detail}
              </p>
            </div>
          </div>
        </div>
        <div className="hidden px-4 lg:block lg:w-2/12">
          <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
            ${props.item.product.price}
          </p>
        </div>
        <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
          <div className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-200 rounded-md dark:border-gray-700 ">
            <button
              onClick={() => handleQuantityMinus()}
              className="py-2 hover:text-gray-700 dark:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-dash"
                viewBox="0 0 16 16"
              >
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path>
              </svg>
            </button>
            <input
              type="number"
              className="w-12 px-2 py-4 text-center border-0 rounded-md dark:bg-gray-800 bg-gray-50 dark:text-gray-400 md:text-right"
              placeholder="1"
              value={quantity}
            />
            <button
              onClick={() => handleQuantityAdd()}
              className="py-2 hover:text-gray-700 dark:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="w-auto px-4 text-right h-full md:w-1/6 lg:w-2/12 ">
          <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
            ${getTotalPrice()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartCard
