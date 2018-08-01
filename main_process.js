/* eslint-disable max-len */
// Basic init
const electron = require('electron')

const { app, ipcMain, BrowserWindow } = electron

// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname)

// To avoid being garbage collected
let mainWindow

app.on('ready', () => {
  BrowserWindow.addDevToolsExtension(
    '/Users/chafiol/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.2.4_1'
  )

  mainWindow = new BrowserWindow({ width: 1620, height: 1080 })

  mainWindow.loadURL(`file://${__dirname}/app/index.html`)
  mainWindow.openDevTools()

  mainWindow.on('close', (e) => {
    if (mainWindow) {
      e.preventDefault()
      mainWindow.webContents.send('app-close')
    }
  })

  ipcMain.on('closed', () => {
    mainWindow = null

    app.quit()
  })
})
