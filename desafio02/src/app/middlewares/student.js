export default async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Student ID is required' });
  }
  return next();
};
