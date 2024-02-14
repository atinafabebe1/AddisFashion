import React from 'react'

interface AddressesProps {
  handleAddressesEdit: () => void
  isEditingAddresses: boolean
}

const Addresses: React.FC<AddressesProps> = ({
  handleAddressesEdit,
  isEditingAddresses,
}) => {
  const handleAddressesCancel = () => {
    handleAddressesEdit()
  }
  const handleAddressesSave = () => {
    handleAddressesEdit()
  }
  return (
    <div className="flex justify-between">
      <div className="flex-1">
        {isEditingAddresses ? (
          <div className="flex gap-5 mt-4 flex-col">
            <div>
              <input
                className="w-full h-14 px-4 focus:outline rounded-lg"
                placeholder="Country/region"
              />
            </div>
            <div>
              <input
                className="w-full h-14 px-4 focus:outline rounded-lg"
                placeholder="Full Name"
              />
            </div>
            <div>
              <input
                className="w-full h-14 px-4 focus:outline rounded-lg"
                placeholder="Address"
              />
            </div>
            <div>
              <input
                className="w-full h-14 px-4 focus:outline rounded-lg"
                placeholder="City"
              />
            </div>
            <div>
              <input
                className="w-full h-14 px-4 focus:outline rounded-lg"
                placeholder="Postal Code"
              />
            </div>
            <div>
              <input
                className="w-full h-14 px-4 py-2 focus:outline rounded-lg"
                placeholder="Phone Number"
              />
            </div>
            <div className="w-full flex justify-end gap-6 h-[100px] items-start">
              <button
                className="w-1/5 py-4 rounded-full font-bold text-lg bg-gray-100"
                onClick={handleAddressesCancel}
              >
                Cancel
              </button>
              <button
                className="w-1/5 py-4 rounded-full bg-black text-white font-bold text-lg"
                onClick={handleAddressesSave}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-6">
              <p className="font-bold text-lg">Wandi</p>
              <div className="flex bg-gray-300 text-gray-400 gap-4">
                <p>Default</p>
                <p>Icon</p>
              </div>
            </div>
            <p className="text-gray-500 font-medium">Location</p>
          </>
        )}
      </div>
      <div className="w-[45px] flex justify-center items-center">
        {!isEditingAddresses && (
          <p className="cursor-pointer" onClick={() => handleAddressesEdit()}>
            Edit
          </p>
        )}
      </div>
    </div>
  )
}

export default Addresses
