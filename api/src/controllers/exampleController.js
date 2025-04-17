const exampleHandler = (req, res) => {
  res.json({ message: 'This is an example controller' });
};

module.exports = { exampleHandler };