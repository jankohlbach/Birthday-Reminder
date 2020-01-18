const generateHash = () => {
  const currentDate = new Date().getTime();
  const random = Math.floor(Math.random() * 100);
  const hash = currentDate.toString() + random.toString();
  return hash;
};

export default generateHash;
