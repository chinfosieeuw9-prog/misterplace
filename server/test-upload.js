import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'test-upload.txt');
fs.writeFileSync(filePath, 'Testbestand voor upload');

const form = new FormData();
form.append('file', fs.createReadStream(filePath));
form.append('folder', 'root');

fetch('http://localhost:5000/api/upload', {
  method: 'POST',
  body: form,
  headers: form.getHeaders(),
})
  .then(res => res.text())
  .then(console.log)
  .catch(console.error);
