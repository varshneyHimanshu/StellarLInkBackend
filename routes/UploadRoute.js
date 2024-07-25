import express from 'express'
const router = express.Router()
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
const upload = multer({ storage: storage });


router.post("/", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

export default router


//exact syntax documentation me diya gya hai 



//Intercepting Packages: When a user submits a form with a file upload, Multer intercepts the incoming request from the web browser. It understands that the request might contain both regular form data (text fields, etc.) and file data.
// Sorting the Mail: Multer separates the regular form data from the file data. It makes things easier for your application code to handle them separately.
// Saving the Packages: You can configure Multer to save the uploaded files to a specific directory on your server's storage. This is like putting the packages in a designated storage area.
// Organizing the Information: Multer provides access to information about the uploaded files, such as their original filenames, sizes, and mimetypes (which indicate file types). This is like labeling the packages with details for easier identification.



