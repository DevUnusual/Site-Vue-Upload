const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'temp_chunks/' });
app.use(cors()); // Permite chamadas do frontend

const UPLOAD_DIR = 'uploads';

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

app.post('/upload', upload.single('chunk'), (req, res) => {
  const { index, filename } = req.body;
  const chunkPath = path.join(UPLOAD_DIR, `${filename}.part${index}`);
  fs.renameSync(req.file.path, chunkPath);
  res.sendStatus(200);
});

// Endpoint para montar o arquivo após enviar todos os chunks (opcional)
app.post('/merge', express.json(), (req, res) => {
  const { filename, totalChunks } = req.body;
  const finalPath = path.join(UPLOAD_DIR, filename);
  const writeStream = fs.createWriteStream(finalPath);

  for (let i = 0; i < totalChunks; i++) {
    const chunkPath = path.join(UPLOAD_DIR, `${filename}.part${i}`);
    const data = fs.readFileSync(chunkPath);
    writeStream.write(data);
    fs.unlinkSync(chunkPath); // Remove chunk
  }
  writeStream.end();
  res.send('Arquivo montado!');
});

app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, UPLOAD_DIR, filename);
  res.download(filePath); // força o download
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
