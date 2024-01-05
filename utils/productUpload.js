const multer = require('multer');
const sharp = require('sharp');
const AppError = require('./appError');
const catchAsync = require('./catchAsync');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')){
        cb(null, true)
    } else {
        cb(new AppError('Not an image! Please uploud only images.', 400), false)
    }
};


const upload = multer({ 
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadMultipleProductsImage = upload.fields([
    {name: 'imageCover', maxCount: 1},
    {name: 'images', maxCount: 1}
]
);

// uploadMultiple.array('images', 5)


exports.ResizeProductImage = catchAsync(async(req, res, next) => {

    if(!req.files.imageCover || !req.files.images ) return next();

    // 1)  Cover image
    req.body.imageCover = `product_${req.params.id}_${Date.now()}_cover.jpeg`
    await sharp(req.files.imageCover[0].buffer)
   .resize(2000, 1333)
   .format('jpeg')
   .jpeg({quality: 90})
   .toFile(`/uploads/imgs/products/${req.body.imageCover}`);

   // 2)
   req.body.images = [];

   await Promise.all(req.files.images.map(async(file, i) => {  
   const filename = `product_${req.params.id}_${Date.now()}_${i + 1}.jpeg`;


    await sharp(files.buffer)
   .resize(2000, 1333)
   .format('jpeg')
   .jpeg({quality: 90})
   .toFile(`/uploads/imgs/products/${filename}`);

   req.body.images.push(filename);

   })
   
   );

   next();

});


