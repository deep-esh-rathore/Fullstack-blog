import multer from 'multer';

// if you want to store files on disk

// const storage = multer.diskStorage({
//   destination: "uploads/", // temp folder (auto deleted later if needed)
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;