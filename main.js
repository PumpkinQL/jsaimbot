const { app, BrowserWindow } = require("electron")
const { overlayWindow } = require("electron-overlay-window")

app.allowRendererProcessReuse = false
const window_name = "Aimbooster"

function createWindow () 
{
    const window = new BrowserWindow({
      width: 400,
      height: 400,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      },
      ...overlayWindow.WINDOW_OPTS
    })
  
    window.loadFile("index.html")

    window.webContents.openDevTools({ mode: "detach", activate: false })
    window.setIgnoreMouseEvents(true)
    overlayWindow.attachTo(window, window_name)
}
  
app.on("ready", () => 
{
    createWindow()
})