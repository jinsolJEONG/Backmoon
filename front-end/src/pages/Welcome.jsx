import React, { useState, useEffect, useRef } from 'react';
import Dots from './Dots';
import './Welcome.css';
import { Link } from 'react-router-dom';

const DIVIDER_HEIGHT = 5;



function Welcome() {
    const outerDivRef = useRef();
    const [scrollIndex, setScrollIndex] = useState(1);

    const handleContactClick = () => {
        const pageHeight = window.innerHeight;
        outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: 'smooth'
        });
        setScrollIndex(4);
    }

    useEffect(() => {
        const wheelHandler = (e) => {
            e.preventDefault();
            const { deltaY } = e;
            const { scrollTop } = outerDivRef.current;
            const pageHeight = window.innerHeight;

            if (deltaY > 0) {
                // Down Scroll
                if (scrollTop >= 0 && scrollTop < pageHeight) {
                    // Page 1
                    outerDivRef.current.scrollTo({
                        top: pageHeight + DIVIDER_HEIGHT,
                        left: 0,
                        behavior: 'smooth',
                    });
                    setScrollIndex(2);
                } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
                    // Page 2
                    outerDivRef.current.scrollTo({
                        top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
                        left: 0,
                        behavior: 'smooth',
                    });
                    setScrollIndex(3);
                } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
                    // Page 3
                    outerDivRef.current.scrollTo({
                        top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
                        left: 0,
                        behavior: 'smooth',
                    });
                    setScrollIndex(4);
                } else {
                    // Page 4
                    setScrollIndex(4);
                }
            } else {
                // Up Scroll
                if (scrollTop >= 0 && scrollTop < pageHeight) {
                    // Page 1
                    setScrollIndex(1);
                } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
                    // Page 2
                    outerDivRef.current.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth',
                    });
                    setScrollIndex(1);
                } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
                    // Page 3
                    outerDivRef.current.scrollTo({
                        top: pageHeight + DIVIDER_HEIGHT,
                        left: 0,
                        behavior: 'smooth',
                    });
                    setScrollIndex(2);
                } else {
                    // Page 4
                    outerDivRef.current.scrollTo({
                        top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
                        left: 0,
                        behavior: 'smooth',
                    });
                    setScrollIndex(3);
                }
            }
        };
        const outerDivRefCurrent = outerDivRef.current;
        outerDivRefCurrent.addEventListener('wheel', wheelHandler);
        return () => {
            outerDivRefCurrent.removeEventListener('wheel', wheelHandler);
        };
    }, []);

    return (
        <div ref={outerDivRef} className="outer welcomebody">
            <nav className="navbar navbar-expand-lg fixed-top"   >
                <div className="container-fluid" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'

                }}>
                    <div style={{
                        flex: '1',
                        display: 'flex',
                        justifyContent: 'flex-start'
                    }}>
                        <Link to="" className="navbar-brand">
                            <img src="/logo_white.jpg" alt="" width="150" height="80" />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>



                    <div style={{
                        flex: '1',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }} className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav ms-auto pad">
                            <li className="nav-item">
                                <Link to="/login" className="nav-link" >
                                    <p style={{ marginTop: '18px', fontWeight: 'bolder', fontFamily: 'Arial', color: 'white' }}>Login</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link" >
                                    <p style={{ marginTop: '18px', fontWeight: 'bolder', fontFamily: 'Arial', color: 'white' }}>Signup</p>
                                </Link>
                            </li>






                        </ul>
                    </div>
                </div>
            </nav>

            <Dots scrollIndex={scrollIndex} />
            <div className="inner bg-1" style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/welcomedog6.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',


                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center'
            }}>
                <p style={{
                    fontSize: '70px',
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    color: 'white',
                    fontFamily: 'Arial Black',
                    // marginTop: '400px',  // 여기서 p 태그와 이미지 사이의 간격을 조정할 수 있습니다.
                    marginBottom: '10px'
                }}>
                    Welcome to 백문이불여일犬
                </p>
                <p style={{
                    fontSize: '20px',
                    fontStyle: 'italic',
                    // fontWeight: 'bold',
                    color: 'white',
                    // fontFamily: 'Arial Black',
                    // marginTop: '400px',  // 여기서 p 태그와 이미지 사이의 간격을 조정할 수 있습니다.
                    marginBottom: '40px'
                }}>We offer the best services for your convenience. if you want more information, contact us.</p>
                <a className="contactButton" onClick={handleContactClick}>Contact Us</a>
                <img src="/welcomedog11.png" alt="Welcomedog5 Image" style={{ height: '55%', width: '1200px' }} />
                <img src="/scroll.png" alt="" style={{ height: '100px', width: '100px', position: 'absolute', right: '60px', bottom: '20px', }} />
            </div>
            <div className="divider"></div>

            <div className="inner bg-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{
                        fontSize: '70px',
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        color: 'white',
                        fontFamily: 'Arial Black',
                        marginBottom: '50px'
                    }}>
                        Our Services
                    </p>

                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '40px' }}>
                            <div style={{ position: 'relative', width: '300px' }}>
                                <img src="/wel1.jpg" alt="" style={{ height: '350px', width: '100%' }} />
                                <div style={{ position: 'absolute', height: '70px', bottom: '0', left: '0', right: '0', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', textAlign: 'center' }}>

                                    <p style={{
                                        fontSize: '20px',
                                        fontStyle: 'italic',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'Arial Black',
                                    }}>유기견 입양</p>
                                </div>
                            </div>
                            <p style={{
                                width: '300px', textAlign: 'center', fontSize: '17px',
                                fontStyle: 'italic',
                                // fontWeight: 'bold',
                                color: 'white',
                                fontFamily: 'Arial Black',
                                marginTop: '25px'
                            }}>저희는 유기견들을 보호함과 동시에 <br />입양 서비스를 제공하고 있습니다.</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '40px' }}>
                            <div style={{ position: 'relative', width: '300px' }}>
                                <img src="/wel2.jpg" alt="" style={{ height: '350px', width: '100%' }} />
                                <div style={{ position: 'absolute', height: '70px', bottom: '0', left: '0', right: '0', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', textAlign: 'center' }}>
                                    <p style={{
                                        fontSize: '20px',
                                        fontStyle: 'italic',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'Arial Black',
                                    }}>분실견 찾기</p>
                                </div>
                            </div>
                            <p style={{
                                width: '300px', textAlign: 'center', fontSize: '17px',
                                fontStyle: 'italic',
                                // fontWeight: 'bold',
                                color: 'white',
                                fontFamily: 'Arial Black',
                                marginTop: '25px'
                            }}>저희는 보호자들이 분실견을 <br />찾을 수 있도록 최상의 서비스를<br /> 제공하고 있습니다.</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ position: 'relative', width: '300px' }}>
                                <img src="/wel3.jpg" alt="" style={{ height: '350px', width: '100%' }} />
                                <div style={{ position: 'absolute', height: '70px', bottom: '0', left: '0', right: '0', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', textAlign: 'center' }}>
                                    <p style={{
                                        fontSize: '20px',
                                        fontStyle: 'italic',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'Arial Black',

                                    }}>유기견 놀아주기</p>
                                </div>
                            </div>
                            <p style={{
                                width: '300px', textAlign: 'center', fontSize: '17px',
                                fontStyle: 'italic',
                                // fontWeight: 'bold',
                                color: 'white',
                                fontFamily: 'Arial Black',
                                marginTop: '25px'
                            }}>저희는 유기견들이 지루해하지 않게<br /> 원격 조종 장난감으로 놀아주기<br /> 서비스를 제공하고 있습니다.</p>
                        </div>
                    </div>

                </div>
                <img src="/scroll.png" alt="" style={{ height: '100px', width: '100px', position: 'absolute', right: '60px', bottom: '20px', }} />
            </div>
            <div className="divider"></div>

            <div className="inner bg-3" style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/welback.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>

                    <p style={{
                        fontSize: '70px',
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        color: 'white',
                        fontFamily: 'Arial Black',
                        marginTop: '100px'
                    }}>Why Us?</p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 15%', marginTop: '20px' }}>
                        <div className="speech-bubble" style={{
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Arial Black',
                            paddingLeft: '20px',
                            paddingRight: '20px'
                        }}>원격 조종시스템으로 집에서도<br /> 편안하게 강아지들과<br /> 교감할 수 있습니다.
                            <div className="bubble-tail"></div></div>
                        <div className="speech-bubble3" style={{
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Arial Black',
                            paddingLeft: '20px',
                            paddingRight: '20px'
                        }}>실시간 영상 송출로 강아지와<br /> 비슷한 눈높이로 강아지를<br /> 생생하게 볼 수 있습니다.
                            <div className="bubble-tail3"></div></div>
                        <div className="speech-bubble2" style={{
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Arial Black',
                            paddingLeft: '20px',
                            paddingRight: '20px'
                        }}>해당 유기견과의 생생한 <br /> 교감을 통해 분실견을<br /> 찾을 확률을 높입니다.
                            <div className="bubble-tail2"></div></div>
                    </div>

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', height: '500px' }}>
                        <img src="wel10.png" alt="Description of Image" />
                    </div>
                    <img src="/scroll.png" alt="" style={{ height: '100px', width: '100px', position: 'absolute', right: '60px', bottom: '20px', }} />


                </div>
            </div>
            <div className="divider"></div>

            <div className="inner2 bg-4">
                <div className="text-section">
                    <div className="company-info">
                        <p className="highlight" style={{ fontFamily: 'GmarketSansMedium' }}>백문이불여일犬</p>
                        <p className="highlight" style={{ fontFamily: 'GmarketSansMedium' }}>Samsung</p>
                        <p className="highlight" style={{ fontFamily: 'GmarketSansMedium' }}>SSSSS</p>
                        <p className="highlight" style={{ fontFamily: 'GmarketSansMedium' }}>광주 1반 C106</p>
                    </div>

                    <div className="footer-info">
                        <p style={{ fontFamily: 'GmarketSansMedium' }}>(주) 백문이불여일犬
                            <br />
                            Address : 광주시 광산구 장덕동 삼성사업장
                            <br />
                            <br />
                            사업자 번호 : 2225-896866
                            <br />
                            TEL : 010-8664-2108   FAX : 050-5656-8585
                            <br />
                            EMAIL : woojin0321@naver.com
                            <br />
                            All Photo by ⓒ C106 Crew on Unsplash view
                        </p>
                    </div>
                </div>
                <img src="/weldoglast.png" alt="Description of image" className="large-image" />
            </div>
        </div>
    );
}

export default Welcome;