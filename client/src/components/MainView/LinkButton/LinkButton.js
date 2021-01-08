import React from "react";
import styles from "./LinkButton.module.css";
import Row from "react-bootstrap/Row";
import {Link} from "react-router-dom";


const LinkButton = (props) => {
    return (
        <div className = {styles.block}>
            <Row>
                <Link to = {props.path} style={{ textDecoration: 'none', color: "#000000", fontSize : 24}}>
                    <Row>
                        <div className = {styles.icon}>
                            {props.icon}
                        </div>
                        <div className = {styles.icon}>
                            {props.buttonName}
                        </div>
                    </Row>
                </Link>
            </Row>
        </div>
    )
}

export default LinkButton;