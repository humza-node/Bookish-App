const fs = require('fs');

function deletefile(filePath) {
    try {
        fs.unlinkSync(filePath);
        console.log('File deleted successfully');
    } catch (err) {
        console.error('Error deleting file:', err);
    }
}

module.exports = { deletefile };
