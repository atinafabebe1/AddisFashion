'use client'
import React, { useEffect, useState } from 'react'
import AboutYou from './AboutYou'
import Addresses from './Addresses'
import Contact from './Contact'

interface UserProfileUpdateProps {
  userId: string
}
const EditProfile: React.FC<UserProfileUpdateProps> = ({ userId }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
  })
  const [isEditingAddresses, setIsEditingAddresses] = useState(false)
  const [isEditingAbout, setIsEditingAbout] = useState(false)
  const [isAboutClicked, setIsAboutClicked] = useState(false)
  const [isContactClicked, setIsContactClicked] = useState(false)
  const [isAddressesClicked, setIsAddressesClicked] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditngPhoneNumber, setIsEditinPhoneNumber] = useState(false)

  useEffect(() => {
    // Fetch user data based on the userId and populate the state
    // API call:
  }, [userId])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevUser) => ({ ...prevUser, [name]: value }))
  }
  const handleAboutEdit = () => {
    setIsEditingAbout(true)
  }
  const handleCancel = () => {
    setIsEditingAbout(false)
  }
  const handleSave = () => {
    setIsEditingAbout(false)
  }
  const handleAboutClicked = () => {
    setIsAboutClicked(!isAboutClicked)
  }
  const handleContactClicked = () => {
    setIsContactClicked(!isContactClicked)
  }
  const handleAddressesClicked = () => {
    setIsAddressesClicked(!isAddressesClicked)
  }
  const handleEditName = () => {
    setIsEditingName(true)
    setIsEditinPhoneNumber(false)
  }
  const handleEditPhone = () => {
    setIsEditinPhoneNumber(true)
    setIsEditingName(false)
  }
  const handleSaveName = () => {
    setIsEditingName(false)
    setIsEditinPhoneNumber(false)
  }
  const handleCancelName = () => {
    setIsEditingName(false)
    setIsEditinPhoneNumber(false)
  }
  const handleAddressesEdit = () => {
    setIsEditingAddresses(!isEditingAddresses)
  }
  const handleAddressesSave = () => {
    setIsEditingAddresses(false)
  }
  const handleAddressesCancel = () => {
    setIsEditingAddresses(false)
  }
  return (
    <div className="flex flex-col items-center gap-7 py-10 ">
      <div className="w-2/3 flex justify-start">
        <h1 className="font-black font-sans text-6xl">My INFO</h1>
      </div>
      <div className="w-2/3 border-b-2 border-gray-400 flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between px-2">
          <h2
            className="text-2xl items-center cursor-pointer font-black"
            onClick={handleAboutClicked}
          >
            ABOUT YOU
          </h2>
          {!isEditingAbout && isAboutClicked && (
            <p
              className="font-bold border-b-2 border-gray-800 cursor-pointer"
              onClick={handleAboutEdit}
            >
              Edit
            </p>
          )}
        </div>
        {isAboutClicked && (
          <AboutYou
            handleAboutEdit={handleAboutEdit}
            isEditingAbout={isEditingAbout}
          />
        )}
        {isEditingAbout && (
          <div className="w-full flex justify-end gap-6 h-[100px] items-start">
            <button
              className="w-1/6 py-4 rounded-full font-bold text-lg bg-gray-100"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="w-1/6 py-4 rounded-full bg-black text-white font-bold text-lg"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        )}
      </div>
      <div className="w-2/3  px-2 border-b-2 border-gray-400 flex flex-col gap-3">
        <div className="w-full items-center">
          <h1
            className="text-2xl items-center cursor-pointer font-black"
            onClick={handleContactClicked}
          >
            CONTACT DETAILS
          </h1>
        </div>
        {isContactClicked && (
          <Contact
            user={user}
            handleEditPhone={handleEditPhone}
            handleEditName={handleEditName}
            isEditingName={isEditingName}
            isEditngPhoneNumber={isEditngPhoneNumber}
            handleCancelName={handleCancelName}
            handleSaveName={handleSaveName}
          />
        )}
      </div>
      <div className="w-2/3 border-b-2 border-gray-400 flex flex-col gap-3">
        <div className="">
          <div className="flex justify-between px-2 items-center">
            <h1
              className="text-2xl items-center cursor-pointer font-black"
              onClick={handleAddressesClicked}
            >
              ADDRESSES
            </h1>
            {isAddressesClicked && (
              <p className="items-center font-medium border-b-2 px-2 cursor-pointer border-gray-800">
                Add new
              </p>
            )}
          </div>
          {isAddressesClicked && (
            <Addresses
              handleAddressesEdit={handleAddressesEdit}
              isEditingAddresses={isEditingAddresses}
            />
          )}
        </div>
      </div>
    </div>
  )
}
export default EditProfile
