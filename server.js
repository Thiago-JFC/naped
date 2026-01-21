import express from 'express';
import { join } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// making __dirname available in module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serves css files
app.use(express.static(join(__dirname, "public")));

app.get('/headline', (req, res) => {
    res.sendFile( join(__dirname, '/views/headline.html') );
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});