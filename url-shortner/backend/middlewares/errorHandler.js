export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  
  if (err.code === 11000) {
    return res.status(400).json({ error: 'Duplicate entry' });
  }
  
  res.status(500).json({ error: 'Something went wrong!' });
};

export const notFound = (req, res, next) => {
  //todo - implement notFound
  res.status(404).json({ error: 'Route not found' });
}; 