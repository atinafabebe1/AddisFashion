import React, { useState, ChangeEvent } from 'react'

interface AboutYouProps {
  handleAboutEdit: () => void
  isEditingAbout: boolean
}

const AboutYou: React.FC<AboutYouProps> = ({
  handleAboutEdit,
  isEditingAbout,
}) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevUser) => ({ ...prevUser, [name]: value }))
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-[65px] w-full gap-5">
        <p className="w-[55px]">icons</p>
        {isEditingAbout ? (
          <input
            type="text"
            name="name"
            value={user.name}
            className="w-full h-full focus:outline outline-gray-500 rounded-md "
            placeholder="Instagram"
            onChange={handleInputChange}
          />
        ) : (
          <>
            <div className="border-b-2 border-gray-300 flex w-full items-center">
              <p className="flex-1 font-medium text-lg">Add instagram</p>
            </div>
            <button
              className="cursor-pointer"
              onClick={() => handleAboutEdit()}
            >
              <p className="text-3xl w-[45px] text-gray-700">+</p>
            </button>
          </>
        )}
      </div>
      <div className="flex h-[65px] w-full gap-5">
        <p className="w-[55px]">icons</p>
        {isEditingAbout ? (
          <input
            type="text"
            name="name"
            value={user.name}
            className="w-full h-full focus:outline outline-gray-500 rounded-md "
            placeholder="TikTok"
            onChange={handleInputChange}
          />
        ) : (
          <>
            <div className=" flex border-b-2 border-gray-300 w-full items-center">
              <p className="flex-1 font-medium text-lg">Add TikTok</p>
            </div>
            <button
              className="cursor-pointer"
              onClick={() => handleAboutEdit()}
            >
              <p className="text-3xl w-[45px] text-gray-700">+</p>
            </button>
          </>
        )}
      </div>
      <div className="flex h-[65px] w-full gap-5">
        <p className="w-[55px]">icons</p>
        {isEditingAbout ? (
          <input
            type="text"
            name="name"
            value={user.name}
            className="w-full h-full focus:outline outline-gray-500 rounded-md "
            placeholder="Twitter"
            onChange={handleInputChange}
          />
        ) : (
          <>
            <div className=" flex border-b-2 border-gray-300 w-full items-center">
              <p className="flex-1 font-medium text-lg">Add Twitter</p>
            </div>
            <button
              className="cursor-pointer"
              onClick={() => handleAboutEdit()}
            >
              <p className="text-3xl w-[45px] text-gray-700">+</p>
            </button>
          </>
        )}
      </div>
      <div className="flex h-[65px] w-full gap-5">
        <p className="w-[55px]">icons</p>
        {isEditingAbout ? (
          <input
            type="text"
            name="name"
            value={user.name}
            className="w-full h-full focus:outline outline-gray-500 rounded-md "
            placeholder="Your birthday"
            onChange={handleInputChange}
          />
        ) : (
          <>
            <div className=" flex border-b-2 border-gray-300 flex-col w-full justify-center">
              <label className="font-medium text-lg">Add Birthday</label>
              <p className="font-medium text-gray-400">
                We'll send you a surprise on your birthday
              </p>
            </div>
            <button
              className="cursor-pointer"
              onClick={() => handleAboutEdit()}
            >
              <p className="text-3xl w-[45px] text-gray-700">+</p>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default AboutYou
