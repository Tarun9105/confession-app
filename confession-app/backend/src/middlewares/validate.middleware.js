import AppError from '../utils/AppError.js';

/**
 * Middleware to validate request against a Zod schema.
 * @param {import('zod').ZodSchema} schema - The Zod schema to validate against.
 * @returns {import('express').RequestHandler}
 */
export const validate = (schema) => (req, res, next) => {
  try {
    const validatedData = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    });
    
    // Replace req data with validated data (stripping unknown fields)
    req.body = validatedData.body;
    req.query = validatedData.query;
    req.params = validatedData.params;
    
    next();
  } catch (error) {
    const errorMessage = error.errors
      ? error.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join(', ')
      : error.message;
      
    next(new AppError(errorMessage, 400));
  }
};
