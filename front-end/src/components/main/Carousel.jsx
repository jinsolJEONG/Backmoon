import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const Maincarousel = () => {
    return (
        <Carousel id="carouselExampleDark" variant="dark" className="fullscreen-carousel"
            nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}
            prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}>
            <Carousel.Item interval={30000}>
                <img className="d-block w-100" src="/maindog11.jpg" alt="First slide" />
                <Carousel.Caption className="d-none d-md-block fadeIn">
                    <div style={{
                        fontSize: '75px',
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        color: 'black',
                        fontFamily: 'Arial Black',
                        textAlign: 'left',
                        marginLeft: '170px',
                        
                    }}>
                        <p style={{ marginBottom: '0px' }}>Human,</p>
                        <p>Dog,</p>
                        <Link to="/straydog" style={{
                            fontSize: '75px',
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            color: 'black',
                            fontFamily: 'Arial Black', textDecoration: 'none'
                        }}><div style={{ border: ' solid', width: ' 350px', borderRadius: '10px' }}>Family</div></Link>

                        <p style={{ whiteSpace: 'nowrap', fontSize: '20px', }}>Click it </p>
                    </div>

                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={30000}>
                <img className="d-block w-100" src="/maindog19.jpg" alt="Second slide" />
                <Carousel.Caption className="d-none d-md-block fadeIn">
                    <div style={{
                        fontSize: '75px',
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        textAlign: 'left',
                        color: 'black',
                        fontFamily: 'Arial Black',
                        marginLeft: '280px',
                    }}>
                        <p>Lost,</p>
                        <Link to="/lostdog" style={{
                            fontSize: '75px',
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            color: 'black',
                            fontFamily: 'Arial Black',
                            textDecoration: 'none'
                        }}><div style={{ border: ' solid', width: ' 280px', borderRadius: '10px' }}>
                                Find,
                            </div>
                            <p style={{ marginLeft: '20px', fontSize: '20px', marginBottom: '0px' }}>Click it</p>
                        </Link>
                        <p style={{ paddingTop: '0px' }}>Hope</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={30000}>
                <img className="d-block w-100" src="/maindog17.jpg" alt="Third slide" />
                <Carousel.Caption className="d-none d-md-block fadeIn pad w-100" >
                    <div style={{ display: 'flex', justifyContent: 'right' }}>

                        <div style={{
                            fontSize: '75px',
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            color: 'black',
                            fontFamily: 'Arial Black',
                            textAlign: 'left'
                        }}>
                            <p style={{ whiteSpace: 'nowrap', fontSize: '20px', fontWeight: 'bold', marginBottom: '0px' }}>Click it</p>
                            <Link to="/recommenddog" style={{
                                fontSize: '75px',
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                                color: 'black',
                                fontFamily: 'Arial Black',
                                textDecoration: 'none'
                            }}><div style={{ border: ' solid', width: ' 260px', borderRadius: '10px', }}>
                                    Play,
                                </div>
                            </Link>
                            <p style={{ paddingTop: '0px' }}>Joy</p>
                            <p style={{ paddingTop: '0px' }}>Peace</p>

                        </div>
                    </div>

                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};
export default Maincarousel;