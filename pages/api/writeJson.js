import fs from 'fs';
import path from 'path';

export default (data, res) => {
  // Write the data to a JSON file
  const fPath = path.join(process.cwd(), '/data.json');
  fs.writeFileSync('./data.json', JSON.stringify(data));

  // Send a response to the client
  res.status(200).json({ message: 'Data written to JSON file.' });
}