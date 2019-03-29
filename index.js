const electron = require('electron');

const {app, BrowserWindow} = electron; 

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({width: 1440, height: 1024, titleBarStyle: 'hidden', nodeIntegration:false});

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin')
        app.quit();
});