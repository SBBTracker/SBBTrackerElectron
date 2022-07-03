const {
    app,
    protocol,
    BrowserWindow,
    ipcMain
} = require('electron')
const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS
} = require("electron-devtools-installer");
const Protocol = require("./protocol");
const path = require('path')
const { contextIsolated } = require('process');
const { AppInfo } = require('electron-builder');
const { LoaderTargetPlugin } = require('webpack');
const { parse } = require('path');
const isDev = process.env.NODE_ENV === "development";
const port = 40992; // Hardcoded; needs to match webpack.development.js and package.json
const selfHost = `http://localhost:${port}`;


/*************************************************************
 * py process
 *************************************************************/

let log_parser_process
let battle_simulator_process

const PY_DIST_FOLDER = '../dist-python'
const PY_FOLDER = '../python'
const LOG_PARSER = 'log_parser'
const BATTLE_SIM = 'battle_simulator'

const getScriptPath = (py_module) => {
    if (isDev) {
        return path.join(__dirname, PY_FOLDER, py_module + '.py')
    }
    if (process.platform === 'win32') {
        return path.join(__dirname, PY_DIST_FOLDER, py_module, py_module + '.exe')
    }
    return path.join(__dirname, PY_DIST_FOLDER, py_module, py_module)
}

const createPyProc = (py_module) => {
    let script = getScriptPath(py_module)

    if (!isDev) {
        pyProc = require('child_process').execFile(script)
    } else {
        pyProc = require('child_process').spawn('python', [script])
    }

    return pyProc
}

const {
    round_number,
    current_player,
    counter,
    session_id,
    build_id,
    combats,
} = [0, null, 0, null, null, null, new Array()]

function newGame() {
    return [0, null, 0, null, null, null, new Array()]
}

const jobTypes = require('./constants/jobTypes.json')
const parseLog = (data) => {
    if (data.job == jobTypes.JOB_MATCHMAKING){
        
    } else if (data.job == jobTypes.JOB_NEWGAME && data.state.session_id != session_id){

    }
}

/*************************************************************
 * window management
 *************************************************************/

const createWindow = () => {

    if (!isDev) {
        // Needs to happen before creating/loading the browser window;
        // protocol is only used in prod
        protocol.registerBufferProtocol(Protocol.scheme, Protocol.requestHandler); /* eng-disable PROTOCOL_HANDLER_JS_CHECK */
    }

    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: true,
        maximizable: false,
        frame: false,
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            nodeIntegrationInWorker: false,
            nodeIntegrationInSubFrames: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    // and load the index.html of the app.
    win.loadFile('./app/src/index.html')

    // Open the DevTools.
    win.webContents.openDevTools()

    // Load app
    if (isDev) {
        win.loadURL(selfHost);
    } else {
        win.loadURL(`${Protocol.scheme}://rse/index.html`);
    }

    // Only do these things when in development
    if (isDev) {

        // Errors are thrown if the dev tools are opened
        // before the DOM is ready
        win.webContents.once("dom-ready", async () => {
            await installExtension([REACT_DEVELOPER_TOOLS])
                .then((name) => console.log(`Added Extension: ${name}`))
                .catch((err) => console.log("An error occurred: ", err))
                .finally(() => {
                    require("electron-debug")(); // https://github.com/sindresorhus/electron-debug
                    win.webContents.openDevTools();
                });
        });
    }

    // Listener for custom title bar minimize button
    ipcMain.on('app/minimize', () => {
        win.minimize();
    });

    // Listener for custom title bar close button
    ipcMain.on('app/close', () => {
        app.quit()
    });

    // Log Process and Processing
    log_parser_process = createPyProc(LOG_PARSER)
    log_parser_process.stdout.on('data', (data) => {
        for (const log of data.toString().split('\n')) {
            if (log) {
                win.webContents.send("logs/new", log)
            }
        }
    })
    log_parser_process.stderr.on('data', (data) => {
        console.log(`STDERR ${data}`)
        app.quit()
    })
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    log_parser_process.kill()
    if (process.platform !== 'darwin') app.quit()
});
