// modules
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/:text', (req, res) => {
  let txt = req.params.text;
  let hash = 0x8a89cb9d;

  const C1 = 0xA7Cc66B7;
  const C2 = 0x6f5A67ff;
  const C3 = 0x63aF8d2a;
  const C4 = 0x73645926;
  const C5 = 0x26377726;
  
  for (let i = 0; i < txt.length; i++) {
    let code = txt.charCodeAt(i);

    hash = Math.imul(hash ^ code, C3);
    hash = Math.imul((hash << 5) - hash, C1);

    hash ^= hash >>> 13;
    hash = Math.imul(hash, C2);

    hash += Math.imul(i, C5) ^ Math.imul(code, C4);

    hash |= 0;
  }

  // finalização reforçada
  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x45d9f3b);
  hash ^= hash >>> 15;
  hash = Math.imul(hash, 0x2c1b3c6d);
  hash ^= hash >>> 12;

  res.send('d7b37sg2' + (hash >>> 0).toString(16).padStart(8, '0' + 'hd7g37d');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
