const Joi = require('joi');


module.exports.listingSchema= Joi.object({
    
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        image: Joi.string().allow("",null),
        price: Joi.number().required().min(0),
        country: Joi.string().required(),

});

module.exports.reviewSchema= Joi.object({
    
        content: Joi.string().required(),
        rating: Joi.number().required().max(5).min(1),
});
