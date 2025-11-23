import { ca } from 'zod/locales';
import main from '../utils/gemni-api-config.js';
import fs from 'fs';
const getresult = async (req, res) => {
  const value = req.body;
  const result = await main(value);

  try {
    const fileSave = await fs.writeFileSync('log.json', JSON.stringify({ output: result }) + '\n');
    console.log('Saved to log file', fileSave);
  } catch (error) {
    console.error('Error saving to log file:', error);
  }

  res.send(result);
};

export default getresult;
