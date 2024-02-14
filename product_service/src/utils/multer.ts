import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({})

const fileFilter = (
  req: any,
  file: { originalname: any },
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  console.log('file')
  console.log(file)
  let ext = path.extname(file.originalname)
  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
    cb(new Error('File type is not supported'), false)
    return
  }
  cb(null, true)
}

const upload = multer({ storage, fileFilter })

export default upload
