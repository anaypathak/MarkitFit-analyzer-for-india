const download2 = (req, res) => {
  const file = `./log.json`;
  res.download(file, 'log.json', (err) => {
    if (err) {
      console.error('Error downloading the file:', err);
      res.status(500).send('Error downloading the file.');
    }
  });
};

export default download2;
