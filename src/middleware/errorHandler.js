import createHttpError from 'http-errors';

export function errorHandler(err, req, res, next) {
  console.error('Error Middleware:', err);

  if (err instanceof createHttpError) {
    return res.status(500).json({
      error: err.message || err.name,
    });
  }

  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
}
