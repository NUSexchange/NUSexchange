import React from "react";
import {MainView} from "./components";
import Carousel from "react-bootstrap/Carousel";
import firstPicture from './images/1.png';
import secondPicture from './images/2.png';
import thirdPicture from './images/3.png';

const SlideShow =   <Carousel>
                        <Carousel.Item interval={1500}>
                            <img
                            className="d-block w-100"
                            src = {firstPicture}
                            alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={5000}>
                            <img
                            className="d-block w-100"
                            src = {secondPicture}
                            alt="Third slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img
                            className="d-block w-100"
                            src = {thirdPicture}
                            alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>

const Home = () => {
    return (
        <div>
            <MainView sideView = {SlideShow}/>
        </div>
    )
}

export default Home;