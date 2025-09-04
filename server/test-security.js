// Voorbeeld security test: input validatie
const axios = require('axios');
(async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/wifi-connect', { ssid: '', password: 'test' });
    console.log('Test: lege ssid', res.data);
  } catch (e) {
    console.log('Error verwacht:', e.response?.data || e.message);
  }
})();
