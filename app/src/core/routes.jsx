import React from 'react';
import {
    useRoutes
} from 'react-router-dom';
import ROUTES from "Constants/routes";
import loadable from "@loadable/component";

// Data From Logs
const log_history = new Array()

const round_number = 0
const current_player = null
const board_data = new Object()

api.on("logs/new", (log) => {
    log_history.push(log)     
})


api.on("logs/board_info", (board_info) => {
    
})


api.on("logs/new_game", () => {
    board_data = new Object()
})


// Load bundles asynchronously so that the initial render happens faster
const Welcome = loadable(() =>
    import(/* webpackChunkName: "WelcomeChunk" */ "Pages/welcome/welcome")
);

const BoardComps = loadable(() =>
    import(/* webpackChunkName: "WelcomeChunk" */ "Pages/boardcomps/boardcomps")
);

const HeroSelection = loadable(() =>
    import(/* webpackChunkName: "WelcomeChunk" */ "Pages/heroselection/heroselection")
);

const LiveGraphs = loadable(() =>
    import(/* webpackChunkName: "WelcomeChunk" */ "Pages/livegraphs/livegraphs")
);

const MatchHistory = loadable(() =>
    import(/* webpackChunkName: "WelcomeChunk" */ "Pages/matchhistory/matchhistory")
);

const Stats = loadable(() =>
    import(/* webpackChunkName: "WelcomeChunk" */ "Pages/stats/stats")
);

const Logs = loadable(() =>
    import(/* webpackChunkName: "WelcomeChunk" */ "Pages/debug/logs")
);


export default function App() {
    let element = useRoutes([
        { path: ROUTES.WELCOME, element: <Welcome /> },
        { path: ROUTES.BOARD_COMPS, element: <BoardComps board_data={board_data}/> },
        { path: ROUTES.HERO_SELECTION, element: <HeroSelection/> },
        { path: ROUTES.LIVE_GRAPHS, element: <LiveGraphs/> },
        { path: ROUTES.MATCH_HISTORY, element: <MatchHistory/> },
        { path: ROUTES.STATS, element: <Stats/> },
        { path: ROUTES.LOGS, element: <Logs log_history={log_history}/> }
    ])

    return <div className='mainWindow interactable'>{element}</div>
}
