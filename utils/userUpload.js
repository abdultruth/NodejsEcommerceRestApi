const multer = require('multer');
const sharp = require('sharp');
const AppError = require('./appError');
const catchAsync = require('./catchAsync');


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startswith('image')){
        cb(null, true)
    } else {
        cb(new AppError('Not an image! Please uploud only images.', 400), false)
    }
};

const upload = multer({ 
    storage: multerStorage,
    fileFilter: multerFilter
});


exports.userUploadImage = upload.single('image');



exports.resizeUserImage = catchAsync(async(req, res, next) => {
   if(!req.file) return next();

   req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`

   await sharp(req.file.buffer)
   .resize(500, 500)
   .format('jpeg')
   .jpeg({quality: 90})
   .toFile(`/uploads/imgs/users/${req.file.filename}`);

   next();
}); 

