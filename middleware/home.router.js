const homeserver = async (req, res) => {
  const path = process.cwd() + '/index.html';

  res.sendFile(path);
};

export default homeserver;
