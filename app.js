const server = require('./infrastructure/server');
const settings = require('./infrastructure/config/settings');

server.listen(settings.port, () => console.log(`Server is running on port ${settings.port}`));

module.exports = server;
