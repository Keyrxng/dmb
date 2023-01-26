import fs from 'fs';
import path from 'path';

export default async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  const { address } = req.query;
  const fPath = path.join(process.cwd(), '/pages/api/data.json');
  const data = JSON.parse(fs.readFileSync(fPath, 'utf-8'));

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("cors", "no-cors")

  const signatureData = data.find(item => item.account === address);

  if (signatureData) {
    res.status(200).json({ signature: signatureData.signature });
  } else {
    res.status(200).json({ signature: null });
  }
};
