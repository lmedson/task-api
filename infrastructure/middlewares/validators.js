const { celebrate, Joi, Segments } = require('celebrate');
const JoiObjectId = require('joi-objectid')(Joi);

class TaskValidator {
  constructor() {
    this.taskBaseValidator = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().optional(),
      priority: Joi.string().valid('Low', 'Normal', 'High').default('Normal'),
      dueDate: Joi.date().iso().allow(null).default(null),
      completed: Joi.boolean().default(false),
      categories: Joi.array().items(Joi.string()).default([]),
      evaluationPoints: Joi.number().integer().min(0).default(0)
    });
  }

  create() {
    return celebrate({
      [Segments.BODY]: this.taskBaseValidator
    });
  }

  idParam() {
    return celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: JoiObjectId().required()
      })
    });
  }

  update() {
    const updateSchema = this.taskBaseValidator.fork(['title'], field => field.optional());
    return celebrate({
      [Segments.BODY]: updateSchema,
      [Segments.PARAMS]: Joi.object().keys({
        id: JoiObjectId().required()
      })
    });
  }
}

module.exports = new TaskValidator();
