import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from "./nav";
import SideBar from "./sidebar"
import App from "./routes"

import "./root.css";

class Root extends React.Component {
    render() {
        const { store, history } = this.props;

        return (
            <React.Fragment>
                <Nav history={history}></Nav>
                <Router>
                    <SideBar />
                    <App />
                </Router>
            </React.Fragment>
        );
    }
}

export default Root;