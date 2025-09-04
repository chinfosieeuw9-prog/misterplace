import http from 'http';

http.get('http://localhost:4000/api/folders', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
  });
}).on('error', err => {
  console.error('Fout:', err.message);
});
