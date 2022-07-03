import { useState, useEffect } from 'react';
import React from "react";
import "./logs.css"

const Logs = ({ log_history }) => {
    const [logs, setLogs] = useState(log_history)

    useEffect(() => {
        api.once("logs/new", (log) => {
            setLogs([...logs, log])
        })
    })

    return (
        <div id='logBox'>
            {
                logs.map((data) => {
                    return <div id='logText'>{data}</div>
                })
            }
        </div>
    )
}

export default Logs;