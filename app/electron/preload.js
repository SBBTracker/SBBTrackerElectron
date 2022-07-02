const { contextBridge, ipcRenderer } = require("electron");
const Store = require('electron-store');
const { schema, migrations } = require('./settings')





contextBridge.exposeInMainWorld('api', {
    settings: new Store({ schema, migrations }),
    window: {
        minimize: () => ipcRenderer.send("app/minimize"),
        close_app: () => ipcRenderer.send("app/close")
    },

    //send: (channel, data) => {
    request: (channel, data) => {
        // whitelist channels
        let validChannels = ["toMain"];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    //receive: (channel, func) => {
    response: (channel, func) => {
        let validChannels = ["logs/new"];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender` 
            ipcRenderer.on(channel, (event, ...args) => func(...args));
            console.log(channel, func)
        }
    }
})