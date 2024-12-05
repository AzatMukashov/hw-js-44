import express from 'express';
import cors from 'cors';

const Vigenere = require('caesar-salad').Vigenere;
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.post('/encode', (req, res) => {
    try {
        const {password, message} = req.body;
        if (!password || !message) {
            res.status(400).json({error: 'Password and message are required.'});
            return;
        }
        const encodedMessage = Vigenere.Cipher(password).crypt(message);
        res.json({encoded: encodedMessage});
    } catch (error) {
        console.error('Error encoding message:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});
app.post('/decode', (req, res) => {
    try {
        const {password, message} = req.body;
        if (!password || !message) {
            res.status(400).json({error: 'Password and message are required.'});
            return;
        }
        const decodedMessage = Vigenere.Decipher(password).crypt(message);
        res.json({decoded: decodedMessage});
    } catch (error) {
        console.error('Error decoding message:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});
app.listen(port, () => {
    console.log(`Server - http://localhost:${port}`);
});