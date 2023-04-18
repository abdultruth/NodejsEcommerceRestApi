const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/uploads/products')
    },
    filename: (req, file, cb) => {
        
        cb(null, file.originalname + ' ' + Date.now()) 
    }
});

const upload = multer({ storage: storage });
