const multer = require('multer');
const path = require('path');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const directory = path.join(__dirname, 'public', 'docs');
        cb(null, directory);
    },
    filename: (req, file, cb) => {
        const sanitizedFilename = file.originalname.trim().replace(/ /g, '-');
        cb(null, sanitizedFilename);
    }
});

const upload = multer({
    storage: fileStorage,
});

module.exports = upload;