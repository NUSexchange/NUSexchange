import React from "react";
import Navbar from "react-bootstrap/Navbar";
import PageNavigation from "./PageNavigation/PageNavigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "react-router-dom/Link";

const MainView = (props) => {
    return (
        <div>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>
                    <Link to ="/" style={{ textDecoration: 'none', color: "white", fontSize : 28}}>
                        NUSExchange
                    </Link>
                </Navbar.Brand>
            </Navbar>
            <Container fluid>
                <Row>
                    <Col lg = {2} sm = {12}>
                        <PageNavigation />
                    </Col>
                    <Col lg = {10} sm = {12}>
                        {props.sideView}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MainView;