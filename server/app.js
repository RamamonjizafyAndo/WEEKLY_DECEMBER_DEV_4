const express = require('express');
const cors = require('cors')
const app = express();
const port = 4000;
let addUrl = ''
// Un objet pour stocker les associations de liens
let urlDatabase = [];
let pathname = []
app.use(cors())
app.use(express.json());

// Route pour créer un short link
app.post('/shorten', (req, res) => {
    const { longUrl, add } = req.body;
    addUrl = add
    const myUrl = new URL('http://localhost:4000')
    myUrl.pathname = add
    if (!longUrl) {
        return res.status(400).send('URL manquante');
    }

    urlDatabase[0] = longUrl;
    pathname[0] = add
    console.log(pathname[0]);
    res.send(myUrl.href);
});

// Route pour rediriger le short link
app.get('/:add?', (req, res) => {
    console.log(pathname[0]);
    const longUrl = urlDatabase[0];
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.status(404).send('Lien non trouvé');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

function generateShortId() {
    // Générer un ID court (pour cet exemple, un simple nombre aléatoire)
    return Math.random().toString(36).substr(2, 6);
}
