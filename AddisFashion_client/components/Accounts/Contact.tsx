import React, { useState } from 'react'

interface ContactProps {
  user: {
    name: string
    email: string
  }
  handleEditPhone: () => void
  handleEditName: () => void
  isEditingName: boolean
  isEditngPhoneNumber: boolean
  handleCancelName: () => void
  handleSaveName: () => void
}

const Contact: React.FC<ContactProps> = ({
  user,
  handleEditPhone,
  handleEditName,
  isEditingName,
  isEditngPhoneNumber,
  handleCancelName,
  handleSaveName,
}) => {
  const [localUser, setLocalUser] = useState(user)
  return (
    <>
      <div className="flex py-5 justify-between border-b-2 border-dotted border-gray-500">
        {isEditingName ? (
          <div className="flex gap-3 flex-col w-full">
            <div>
              <input
                type="text"
                className="w-full h-14 px-4 focus:outline rounded-lg"
                placeholder="First Name"
              />
            </div>
            <div>
              <input
                type="text"
                className="w-full h-14 px-4 focus:outline rounded-lg"
                placeholder="Second Name"
              />
            </div>
            <div className="flex gap-4">
              <button
                className="w-1/6 py-2 rounded-full font-bold text-lg bg-gray-100"
                onClick={handleCancelName}
              >
                Cancel
              </button>
              <button
                className="w-1/6 py-2 rounded-full bg-black text-white font-bold text-lg"
                onClick={handleSaveName}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 flex flex-col">
              <p className="text-gray-500 font-medium">Your Name</p>
              <p>{user.name} hello</p>
            </div>
            <div className="w-[45px] flex justify-center items-center">
              <button onClick={handleEditName}>Edit</button>
            </div>
          </>
        )}
      </div>
      <div className="flex py-5 justify-between border-b-2 border-dotted border-gray-500">
        {isEditngPhoneNumber ? (
          <div className="flex gap-3 flex-col w-full">
            <div>
              <input
                type="text"
                className="w-full h-14 px-4 focus:outline rounded-lg"
                placeholder="Phone  Number"
              />
            </div>
            <div className="flex gap-4">
              <button
                className="w-1/6 py-2 rounded-full font-bold text-lg bg-gray-100"
                onClick={handleCancelName}
              >
                Cancel
              </button>
              <button
                className="w-1/6 py-2 rounded-full bg-black text-white font-bold text-lg"
                onClick={handleSaveName}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 flex flex-col">
              <p className="text-gray-500 font-medium">Phone Number</p>
              <p>{user.name} hello</p>
            </div>
            <div className="w-[45px] flex justify-center items-center">
              <button onClick={handleEditPhone}>Edit</button>
            </div>
          </>
        )}
      </div>
      <div className="flex py-5 flex-col border-b-2 border-dotted border-gray-500">
        <p className="text-gray-500 font-medium">Your Email</p>
        <p className="font-medium">{user.email} helo</p>
      </div>
      <div className="w-1/3 text-red-500 font-medium py-5 flex justify-center">
        <button>Reset your password</button>
      </div>
    </>
  )
}

export default Contact
