const Joi = require('@hapi/joi');


const joiSchema = Joi.object({
    text: Joi.string().required().error(new Error('Please, type a text.'))
});


module.exports = joiSchema;
