const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
require('@electron/remote/main').initialize();

let win = null;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    minWidth: 950,
    minHeight: 600,
    width: 950,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("msg", (event, {payload}) => {
  console.log('got msg:', {payload});
  // require sub-module to handle the 
  console.log(payload)
  res = search(payload.searchTerm, payload.limit)
  console.log('sending reply');
  res.then(function(result) {
    win.send('result', result)
  })
})

// ipcMain.on("download", (event, data) => {

// })

var Scraper = require('../backend/google/scraper');
let google = new Scraper();

async function search(query, limit)  {
  const results = await google.scrape(query, limit); 
  
  console.log(results.length, ' results found')
  console.log('results', results);

  const results_string = JSON.stringify(results)
  return results_string
};
