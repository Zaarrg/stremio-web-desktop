const path = require('path');
const { loadConfig, saveConfig } = require('./config');

function generateApiKey() {
    return [...Array(32)].map(() => Math.random().toString(36)[2]).join('');
}

function initApiKeyLogic(app, ipcMain) {
    const userDataPath = app.getPath('userData');
    const configPath = path.join(userDataPath, 'config.json');

    let config = loadConfig(configPath);
    if (!config.api_key) {
        config.api_key = generateApiKey();
        saveConfig(configPath, config);
    }

    const apiKey = config.api_key;

    ipcMain.handle('get-api-key', () => {
        return apiKey;
    });

    return apiKey;
}

module.exports = { initApiKeyLogic };
