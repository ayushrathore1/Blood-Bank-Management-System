const generateId = (prefix, length = 6) => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 5);
  return (prefix + timestamp.slice(-4) + random).toUpperCase();
};

module.exports = generateId;
