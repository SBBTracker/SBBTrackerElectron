import React from 'react';
import {
    useRoutes
} from 'react-router-dom';
import ROUTES from "Constants/routes";
import loadable from "@loadable/component";


// Load bundles asynchronously so that the initial render happens faster
const Welcome = loadable(() =>
    import(/* webpackChunkName: "WelcomeChunk" */ "Pages/welcome/welcome")
);
const Logs = loadable(() =>
    import(/* webpackChunkName: "WelcomeChunk" */ "Pages/logs/logs")
);


export default function App() {
    let element = useRoutes([
        { path: ROUTES.WELCOME, element: <Welcome /> },
        { path: ROUTES.LOGS, element: <Logs /> }
    ])

    return element
}
