const postmark = require('postmark');
const postmarkClient = new postmark.ServerClient('c4fa11f1-fb0b-4606-b3b1-d24f77d71f3f');
module.exports = postmarkClient;