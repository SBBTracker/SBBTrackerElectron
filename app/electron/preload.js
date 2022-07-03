const { contextBridge, ipcRenderer } = require("electron");
const Store = require('electron-store');
const { schema, migrations } = require('./settings')


contextBridge.exposeInMainWorld('api', {
    settings: new Store({ schema, migrations }),
    log_history: new Array(),

    send: (channel, data) => {
        let validChannels = [
            "app/minimize",
            "app/close"
        ];
        if (validChannels.includes(channel)) {
            console.log(`send ${channel} ${func}`)
            ipcRenderer.send(channel, data);
        }
    },

    on: (channel, func) => {
        let validChannels = [
            "logs/new",
            "logs/new_game",
        ];
        if (validChannels.includes(channel)) {
            console.log(`ON ${channel} ${func}`)
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    },
    
    once: (channel, func) => {
        let validChannels = [
            "logs/new",
            "logs/new_game",
        ];
        if (validChannels.includes(channel)) {
            console.log(`once ${channel} ${func}`)
            ipcRenderer.once(channel, (event, ...args) => func(...args));
        }
    }

})