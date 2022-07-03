import React from "react";
import ROUTES from "Constants/routes";
import { useNavigate } from "react-router-dom";


const SideBar = (props) => {
    const {
        history,
        location,
        match,
        staticContext,
        to,
        onClick,
        // ⬆ filtering out props that `button` doesn’t know what to do with.
        ...rest
    } = props
    
    let navigate = useNavigate(); 

    return (
        <div className="sidebar" id="sidebar">
            <button
                className="sidebarcontent interactable"
                id="boardcomps"
                onClick={() => navigate(ROUTES.BOARD_COMPS)}
            >Board Comps
            </button>
            <button
                className="sidebarcontent interactable"
                id="heroselection"
                onClick={() => navigate(ROUTES.HERO_SELECTION)}
            >Hero Selection
            </button>
            <button
                className="sidebarcontent interactable"
                id="livegraphs"
                onClick={() => navigate(ROUTES.LIVE_GRAPHS)}
            >Live Graphs
            </button>
            <button
                className="sidebarcontent interactable"
                id="matchhistory"
                onClick={() => navigate(ROUTES.MATCH_HISTORY)}
            >Match History
            </button>
            <button
                className="sidebarcontent interactable"
                id="stats"
                onClick={() => navigate(ROUTES.STATS)}
            >Stats
            </button>
            <button
                className="sidebarcontent interactable"
                id="logs"
                onClick={() => navigate(ROUTES.LOGS)}
            >Logs
            </button>
        </div>
    )
}


export default SideBar;