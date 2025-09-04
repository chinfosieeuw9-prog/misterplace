// Automatische test: input validatie op upload endpoint
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

(async () => {
  const form = new FormData();
  form.append('file', fs.createReadStream('server/test-upload.txt'));
  form.append('folder', 'root');
  try {
    const res = await axios.post('http://localhost:5000/api/upload', form, {
      headers: form.getHeaders(),
    });
    console.log('Upload test:', res.data);
  } catch (e) {
    console.log('Error:', e.response?.data || e.message);
  }
})();
