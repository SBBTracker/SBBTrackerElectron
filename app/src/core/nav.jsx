import React from "react";

function minimize() {
    api.send("app/minimize")
}

function close_app() {
    api.send("app/close")
}



class Nav extends React.Component {
    render() {
        return (
            <nav>
                <div className="left-nav"></div>
                <div className="right-nav">
                    <span className="nav-link interactable" id="minimize" onClick={minimize}>&minus;</span>
                    {/*<span className="nax-link interactable" id="maximize">&#9744;</span>*/}
                    <span className="nav-link interactable" id="close_app" onClick={close_app}>&#10006;</span>
                </div>
            </nav>
        )
    }
}

export default Nav;
