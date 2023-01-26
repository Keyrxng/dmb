import writeJson from '../api/writeJson';

export default async (req, res) => {
console.log("req", req.body)
  switch (req.method) {
    case 'POST':
      return writeJson(req.body, res);
    default:
      res.status(405).end();
      break;
  }
}