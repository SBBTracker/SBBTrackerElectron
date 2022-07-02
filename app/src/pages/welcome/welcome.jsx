import React from "react";
import logo from '../../../../resources/sbbt.ico'


class Welcome extends React.Component {
    render() {
        return(
            <div className="content" id="main">
                <div className="place_holder">
                    <img src={logo} height="200" width="200" />   
                </div>
            </div>
        )
    }   
}

export default Welcome;