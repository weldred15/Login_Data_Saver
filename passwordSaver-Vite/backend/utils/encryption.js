// backend/utils/encryption.js
const CryptoJS = require('crypto-js');

// SECURITY: Store this in environment variable
const SECRET_KEY = process.env.ENCRYPTION_KEY || 'r4nd0m_3ncrypt10n_KEY??';

function encrypt(text) {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

function decrypt(encryptedText) {
    const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = { encrypt, decrypt };