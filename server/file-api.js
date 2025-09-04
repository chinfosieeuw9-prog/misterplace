// Strenge rate limiting voor uploads
const uploadLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: 'Te veel uploads, probeer later opnieuw.' });
// Logging helper
function logToFile(message) {
  const logPath = path.join(__dirname, 'logs', 'app.log');
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${message}\n`);
}
import dotenv from 'dotenv';
dotenv.config();
// Forceer HTTPS (indien achter proxy)
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'http') {
    return res.redirect(301, 'https://' + req.headers.host + req.url);
  }
  next();
});
import helmet from 'helmet';
import xss from 'xss-clean';
const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(xss());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  const msg = `${req.method} ${req.url} van ${req.ip}`;
  console.log(`[${new Date().toISOString()}] ${msg}`);
  logToFile(msg);
  next();
});
// Error logging middleware
app.use((err, req, res, next) => {
  const errorMsg = `[ERROR] ${err.message} (${req.method} ${req.url})`;
  console.error(errorMsg);
  logToFile(errorMsg);
  res.status(500).json({ error: 'Interne serverfout' });
});
function auth(req, res, next) {
  // if (!req.headers.authorization) return res.status(401).json({ error: 'Niet geauthenticeerd' });
  next();
}
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
// ...existing code...

// Endpoint: verbinden met WiFi-netwerk
app.post('/api/wifi-connect', auth, (req, res) => {
  const ssid = req.body.ssid;
  const password = req.body.password || '';
  if (!ssid) return res.status(400).json({ error: 'Geen SSID opgegeven' });
  // Maak een tijdelijk profielbestand aan
  const profile = `<?xml version="1.0"?>\n<WLANProfile xmlns="http://www.microsoft.com/networking/WLAN/profile/v1">\n  <name>${ssid}</name>\n  <SSIDConfig>\n    <SSID>\n      <name>${ssid}</name>\n    </SSID>\n  </SSIDConfig>\n  <connectionType>ESS</connectionType>\n  <connectionMode>auto</connectionMode>\n  <MSM>\n    <security>\n      <authEncryption>\n        <authentication>WPA2PSK</authentication>\n        <encryption>AES</encryption>\n        <useOneX>false</useOneX>\n      </authEncryption>\n      <sharedKey>\n        <keyType>passPhrase</keyType>\n        <protected>false</protected>\n        <keyMaterial>${password}</keyMaterial>\n      </sharedKey>\n    </security>\n  </MSM>\n</WLANProfile>`;
  const tmpPath = `./${ssid}.xml`;
  fs.writeFileSync(tmpPath, profile);
  exec(`netsh wlan add profile filename="${tmpPath}"`, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    exec(`netsh wlan connect name="${ssid}"`, (err2, stdout, stderr) => {
      fs.unlinkSync(tmpPath);
      if (err2) return res.status(500).json({ error: stderr || err2.message });
      res.json({ success: true, output: stdout });
    });
  });
});
// Endpoint: beschikbare WiFi-netwerken
app.get('/api/wifi-list', auth, (req, res) => {
  import('child_process').then(({ exec }) => {
    exec('netsh wlan show networks mode=Bssid', (error, stdout, stderr) => {
      if (error) return res.status(500).json({ error: stderr || error.message });
      // Parse SSIDs
      const ssidRegex = /SSID \d+ : (.+)/g;
      let match;
      const ssids = [];
      while ((match = ssidRegex.exec(stdout)) !== null) {
        ssids.push(match[1].trim());
      }
      res.json({ networks: ssids, raw: stdout });
    });
  });
});
// WiFi info endpoint (Windows)
app.get('/api/wifi', auth, (req, res) => {
  import('child_process').then(({ exec }) => {
    exec('netsh wlan show interfaces', (error, stdout, stderr) => {
      if (error) return res.status(500).json({ error: stderr || error.message });
      // Parse output
      const ssidMatch = stdout.match(/SSID\s*:\s*(.+)/);
      const strengthMatch = stdout.match(/Signaal\s*:\s*(\d+)%/);
      const channelMatch = stdout.match(/Kanaal\s*:\s*(\d+)/);
      res.json({
        ssid: ssidMatch ? ssidMatch[1].trim() : 'Onbekend',
        strength: strengthMatch ? strengthMatch[1] + '%' : '?',
        channel: channelMatch ? channelMatch[1] : '?',
        raw: stdout
      });
    });
  });
});

// ...existing code...

// Echte traceroute endpoint
app.get('/api/traceroute', auth, (req, res) => {
  const host = req.query.host;
  console.log(`[TRACE] Request for traceroute:`, host);
  if (!host) return res.status(400).json({ error: 'Geen host opgegeven' });
  exec(`tracert -d ${host}`, (error, stdout, stderr) => {
    console.log(`[TRACE] tracert output:`, stdout);
    if (error) {
      console.log(`[TRACE] tracert error:`, stderr || error.message);
      return res.status(500).json({ error: stderr || error.message });
    }
    res.json({ host, output: stdout });
  });
});
// Echte ping endpoint
app.get('/api/ping', auth, (req, res) => {
  const host = req.query.host;
  console.log(`[PING] Request for ping:`, host);
  if (!host) return res.status(400).json({ error: 'Geen host opgegeven' });
  exec(`ping -n 1 ${host}`, (error, stdout, stderr) => {
    console.log(`[PING] ping output:`, stdout);
    if (error) {
      console.log(`[PING] ping error:`, stderr || error.message);
      return res.status(500).json({ error: stderr || error.message });
    }
    // Zoek de tijd in de output
    const match = stdout.match(/tijd=([0-9]+)ms/);
    const time = match ? match[1] : null;
    res.json({ host, time, output: stdout });
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, 'uploads', req.body.folder || 'root');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Randomiseer bestandsnaam met tijdstempel en originele extensie
    const ext = path.extname(file.originalname);
    const safeName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, safeName);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    const forbiddenExts = ['.exe', '.js', '.bat', '.sh', '.php', '.py'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedTypes.includes(file.mimetype) || forbiddenExts.includes(ext)) {
      return cb(new Error('Ongeldig bestandstype of extensie'));
    }
    cb(null, true);
  }
});

// Bestanden ophalen uit map
app.get('/api/files', auth, (req, res) => {
  const folder = req.query.folder || 'root';
  const dir = path.join(__dirname, 'uploads', folder);
  let files = [];
  if (fs.existsSync(dir)) {
    files = fs.readdirSync(dir).map(name => ({ name, path: `/api/download?folder=${folder}&name=${encodeURIComponent(name)}` }));
  }
  res.json(files);
});

// Mappen ophalen
app.get('/api/folders', auth, (req, res) => {
  const base = path.join(__dirname, 'uploads');
  let folders = [];
  if (fs.existsSync(base)) {
    folders = fs.readdirSync(base, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
  }
  res.json(folders);
});

// Upload bestand
app.post('/api/upload', uploadLimiter, auth, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'Geen bestand ontvangen' });
  }
  // Logging van uploads
  console.log(`[UPLOAD] ${req.file.filename} geüpload door ${req.ip} (${req.body.folder || 'root'})`);
  res.json({ success: true, file: req.file });
});

// Download bestand met optionele vervaldatum
app.get('/api/download', auth, (req, res) => {
  const folder = req.query.folder || 'root';
  const name = req.query.name;
  const expires = req.query.expires;
  if (expires) {
    const now = Date.now();
    const expiryTime = new Date(expires).getTime();
    if (isNaN(expiryTime) || now > expiryTime) {
      return res.status(403).send('Downloadlink is verlopen');
    }
  }
  const filePath = path.join(__dirname, 'uploads', folder, name);
  if (!fs.existsSync(filePath)) return res.status(404).send('Bestand niet gevonden');
  res.download(filePath);
});

// Verwijder bestand
app.delete('/api/delete', auth, (req, res) => {
  const folder = req.body.folder || 'root';
  const name = req.body.name;
  const filePath = path.join(__dirname, 'uploads', folder, name);
  if (!fs.existsSync(filePath)) return res.status(404).json({ success: false, error: 'Bestand niet gevonden' });
  fs.unlinkSync(filePath);
  res.json({ success: true });
});

// Sharelink endpoint
app.get('/api/share', auth, (req, res) => {
  const folder = req.query.folder || 'root';
  const name = req.query.name;
  const expires = req.query.expires;
  const url = `${req.protocol}://${req.get('host')}/api/download?folder=${folder}&name=${encodeURIComponent(name)}`;
  res.json({ url, expires });
});

const PORT = process.env.PORT || 5000;
// Voorbeeld gebruik JWT secret uit env
const JWT_SECRET = process.env.JWT_SECRET || 'geheim';
app.listen(PORT, () => {
  console.log(`File API server running on port ${PORT}`);
});
