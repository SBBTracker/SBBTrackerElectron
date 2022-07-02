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
            <button className="sidebarcontent interactable" id="board_comps">Board Comps</button>
            <button className="sidebarcontent interactable" id="hero_selection">Hero Selection</button>
            <button className="sidebarcontent interactable" id="live_graphcs">Live Graphs</button>
            <button className="sidebarcontent interactable" id="match_history">Match History</button>
            <button className="sidebarcontent interactable" id="stats_graph">Stats Graph</button>
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