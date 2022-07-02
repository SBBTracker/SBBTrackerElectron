import { useState, useEffect } from 'react';
import React from "react";


function Logs() {  
    const [logs, setLogs] = useState('')

    useEffect(() => {
        api.response('logs/new', (data) => {
            console.log(`SETTINGS LOGS`)
            setLogs(logs.concat('\n', data))
        })
    })
    
    return <div id='logBox'>{logs}</div>
}

export default Logs;