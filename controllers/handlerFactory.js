const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.deleteOne = (Model, name) => catchAsync(async (req, res) => {
    const model = await Model.findByIdAndDelete({_id:req.params.id});
  
    if(!model) {
      return next(new AppError(`No ${name} found with the ID`, 404));
    }
    
    return res.status(204).json({
      status: 'Success',
      requestedAt: req.requestTime,
      data: null
    });
  });


exports.updateOne = ( Model, name) => catchAsync(async (req, res) =>  {
    
    const model = await Model.findByIdAndUpdate(
        {_id:req.params.id}, req.body, {new: true, runValidators: true});

    if(!model) {
        return next(new AppError(`No ${name} found with the ID`, 404))
    }

    return res.status(301).json({
            status: 'Success',
            data: {
                model
            }
    });
});



exports.createOne = (Model, name ) => catchAsync(async (req, res) => {
   
  const model = await Model.create(req.body);

  return res.status(201).json({
      status: 'Success',
      requestedAt: req.requestTime,
      data: {
        model
      }
  });

});


exports.getOne = (Model, name, popOptions) => catchAsync(async(req, res, next) => {

  const model = popOptions ? await Model.findById({_id:req.params.id}).populate(`${popOptions}`) : await Model.findById({_id:req.params.id})

  if(!model) {
    return next(new AppError(`No ${name} found with the ID: ${req.params.id}`, 404));
  }

  return res.status(200).json({
    status: 'Success',
    requestedAt: req.requestTime,
    data:{
        model
    }
  });


});
  