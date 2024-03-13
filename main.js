const path = require('path')
const {app, BrowserWindow} = require('electron')

if (require('electron-squirrel-startup')) {
  app.quit()
}

const isDev = process.env.IS_DEV === 'true'

function createWindow() {
  const mainWindow = new BrowserWindow({
    show: false,
    icon: ''
  });
  // 设置图标
  app.dock.setIcon('');
  // 最大化
  mainWindow.maximize();
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../integration', 'index.html'))
  }
  mainWindow.show();
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})