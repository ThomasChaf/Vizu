// Basic init
const electron = require('electron')
const { app, BrowserWindow } = electron

// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname)

// To avoid being garbage collected
let mainWindow

app.on('ready', () => {
  BrowserWindow.addDevToolsExtension(
    '/Users/chafiol/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.2.4_1'
  )

  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  mainWindow.loadURL(`file://${__dirname}/app/index.html`)
})
