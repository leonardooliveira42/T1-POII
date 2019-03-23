const electron = require('electron');

const {app, BrowserWindow} = electron; 

app.on('ready', () => {
    const mainWindow = new BrowserWindow({width: 1440, height: 1024, titleBarStyle: 'hidden', nodeIntegration:false});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});