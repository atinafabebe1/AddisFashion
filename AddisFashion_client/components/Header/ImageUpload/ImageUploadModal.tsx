import React, { useRef } from 'react'

interface ImageUploadModalProps {
  onClose: () => void
  onImageUpload: (file: File) => void
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  onClose,
  onImageUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = () => {
    if (fileInputRef.current?.files?.length) {
      const file = fileInputRef.current.files[0]
      onImageUpload(file)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 max-w-md rounded-md">
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="mb-4"
          />
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ImageUploadModal
