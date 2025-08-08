// import multer from 'multer'

// const upload = multer({dest:"uploads/"});
// export default upload

import multer from 'multer'

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024, // limit to 5MB
    files: 1                   // accept only 1 file
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "video/mp4",
        "application/pdf"  // ✅ PDF allowed
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG,PDF and MP4 files are allowed"), false);
    }
    cb(null, true);
  }
});
export default upload;
