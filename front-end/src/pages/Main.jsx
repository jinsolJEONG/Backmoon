import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import Straydog from '../components/straydog/Straydog'
import StraydogDetail from '../components/straydog/StraydogDetail'
import StraydogGuide from '../components/straydog/StraydogGuide'
import StraydogSuccess from '../components/straydog/StraydogSuccess'
import StraydogFail from '../components/straydog/StraydogFail'
import Lostdog from '../components/lostdog/Lostdog'
import Remoteplay from '../components/remoteplay/Remoteplay'
import RemoteplayGuide from '../components/remoteplay/RemoteplayGuide'
import Aboutus from '../components/navbar/Aboutus'
import YoutubeUCC from '../components/navbar/YoutubeUCC'
import Mypage from '../components/navbar/Mypage'
import Maincarousel from '../components/main/Carousel'
import StraydogCreate from '../components/admin/straydogCreate'
import StraydogUpdate from '../components/admin/straydogUpdate'
import ReservationShow from '../components/admin/reservationShow'
import DogInfoShow from '../components/admin/doginfoShow'
import UserInfoShow from '../components/admin/userinfoShow'
import LostdogDetail from '../components/lostdog/LostdogDetail'
import LostdogCreate from '../components/lostdog/LostdogCreate'
import LostdogUpdate from '../components/lostdog/LostdogUpdate'
import Reservation from '../components/reservation/Reservation'
import Recommenddog from '../components/remoteplay/Recommenddog'
import './Main.css';
import { useNavigate } from "react-router-dom";
import React from 'react'






const Main = (props) => {

    let content = <Maincarousel />

    const navigate = useNavigate();
    const admin = localStorage.getItem('admin');
    const signOut = () => {
        localStorage.removeItem("rasyueToken");
        navigate("/login");
    };


    const token = localStorage.getItem('rasyueToken');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` // 토큰을 Bearer 토큰 형식으로 포함
        }
    };
    const [reservationtimes, setReservationTimes] = useState([])
    // 2. UTC 시간 계산

    const today = new Date()
    const [nowyear, setYear] = useState(today.getFullYear())
    const [nowmonth, setMonth] = useState(today.getMonth() + 1)
    const [nowdate, setDate] = useState(today.getDate())
    const [nowhour, setHour] = useState(today.getHours())
    const [nowminute, setMinute] = useState(today.getMinutes())




    // GET
    useEffect(() => {
        const intervalId = setInterval(() => {
            const fetchData = async () => {

                const response = await axios.get('/api/reservation/user', config);
                setReservationTimes(response.data.reservation)

            }
            fetchData();

            const today = new Date()
            // console.log('오늘 : ',today)
            setYear(today.getFullYear())
            setMonth(today.getMonth() + 1)
            setDate(today.getDate())
            setHour(today.getHours())
            setMinute(today.getMinutes())



        }, 1000);
        return () => {
            clearInterval(intervalId);
        }


    }, [nowmonth]);

    const reservationtime = reservationtimes.filter((time) => {
        // console.log(parseInt(now.slice(11, 13)), parseInt(time.ReservationDatetime.slice(11, 13))+1)
        return (parseInt(nowyear) === parseInt(time.ReservationDatetime.slice(0, 4)) &&
            parseInt(nowmonth) === parseInt(time.ReservationDatetime.slice(5, 7)) &&
            parseInt(nowdate) === parseInt(time.ReservationDatetime.slice(8, 10)) &&
            ((parseInt(nowhour) + 1 === parseInt(time.ReservationDatetime.slice(11, 13)) && parseInt(nowminute) >= 30) ||
                (parseInt(nowhour) === parseInt(time.ReservationDatetime.slice(11, 13)) && parseInt(nowminute) < 30)) &&
            time.Type === 'play'
        )

    })
    const page = props.page
    if (page === 'straydog') {
        content = <Straydog />
    } else if (page === 'straydog-detail') {
        content = <StraydogDetail />
    } else if (page === 'straydog-guide') {
        content = <StraydogGuide />
    } else if (page === 'straydog-success') {
        content = <StraydogSuccess />
    } else if (page === 'straydog-fail') {
        content = <StraydogFail />
    } else if (page === 'lostdog') {
        content = <Lostdog />
    } else if (page === 'lostdog-detail') {
        content = <LostdogDetail />
    } else if (page === 'lostdog-create') {
        content = <LostdogCreate />
    } else if (page === 'lostdog-update') {
        content = <LostdogUpdate />
    } else if (page === 'remoteplay') {
        if (reservationtime.length !== 0) {
            content = <Remoteplay />
        }
    } else if (page === 'remoteplay-guide') {
        content = <RemoteplayGuide />
    } else if (page === 'aboutus') {
        content = <Aboutus />
    } else if (page === 'ucc') {
        content = <YoutubeUCC />
    } else if (page === 'mypage') {
        content = <Mypage />
    } else if (page === 'admin-create') {
        if (admin === '1') {
            content = <StraydogCreate />
        }
    } else if (page === 'admin-update') {
        if (admin === '1') {
            content = <StraydogUpdate />
        }

    } else if (page === 'admin-reservation') {
        content = <ReservationShow />
    } else if (page === 'admin-dog') {
        content = <DogInfoShow />
    } else if (page === 'admin-user') {
        content = <UserInfoShow />
    } else if (page === 'reservation') {
        content = <Reservation />
    } else if (page === 'recommenddog') {
        content = <Recommenddog />
    }








    return (

        <div className='backg'>
            <div>
                <nav className="navbar navbar-expand-lg bg-body-none fixed-top">
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
                            <Link to="/main" className="navbar-brand">
                                <img src="/mainlogo.png" alt="" width="150" height="80" />
                            </Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>



                        <div style={{
                            flex: '2',
                            display: 'flex',
                            justifyContent: 'center',
                        }} >
                            <nav id="topMenu">
                                <ul>
                                    <li className="topMenuLi">
                                        <a className="menuLink bg-body-none" href="#">유기견</a>
                                        <ul className="submenu">
                                            <li><Link className="submenuLink longLink" to="/straydog">∙ 유기견 목록</Link></li>
                                            <li><Link className="submenuLink longLink" to="/straydog-guide">∙ 입양가이드</Link></li>
                                            <li><Link className="submenuLink longLink" to="/straydog-success">∙ 입양완료</Link></li>
                                            <li><Link className="submenuLink longLink" to="/straydog-fail">∙ 추모</Link></li>

                                        </ul>
                                    </li>
                                    <li>|</li>
                                    <li className="topMenuLi bg-body-none">
                                        <a className="menuLink" href="#">분실견</a>
                                        <ul className="submenu">
                                            <li><Link className="submenuLink longLink" to="/lostdog">∙ 분실견 목록</Link></li>

                                        </ul>
                                    </li>
                                    <li>|</li>
                                    <li className="topMenuLi bg-body-none">
                                        <a className="menuLink" href="#">놀아주기</a>
                                        <ul className="submenu">
                                            <li><Link className="submenuLink longLink" to="/recommenddog">∙ 추천 유기견</Link></li>
                                            <li><Link className="submenuLink longLink" to="/remoteplay-guide">∙ 이용가이드</Link></li>

                                        </ul>
                                    </li>


                                </ul>
                            </nav>


                        </div>



                        <div style={{
                            flex: '1',
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }} className="collapse navbar-collapse " id="navbarNav">
                            <ul className="navbar-nav">

                                <li className="nav-item">
                                    <Link to="/mypage" className="nav-link active">
                                        <img src="/mypage.png" alt="" width="40" height="40" style={{ marginTop: '12px', }} />
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/ucc" className="nav-link" >
                                        <img src="/youtubelogo.png" alt="" width="65" height="65" />
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/aboutus">
                                        <p style={{ marginTop: '18px', fontWeight: 'bolder', fontFamily: 'Arial' }}>about us</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button type="button" onClick={signOut} className="hidden-button nav-link">
                                        <p style={{ marginTop: '18px', fontWeight: 'bolder', fontFamily: 'Arial', }}>Logout</p>
                                    </button>
                                </li>




                            </ul>
                        </div>
                    </div>
                </nav>
            </div >
            <div >
                {content}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                <hr style={{ width: '80%' }} />
            </div>

            <div style={{ marginTop: '40px', marginLeft: '160px', paddingBottom: '40px' }}>

                <p style={{ marginBottom: '-1px' }}>(주) 백문이불여일犬
                    <br />
                    Address : 광주시 광산구 장덕동 삼성사업장
                    <br />
                    <br />
                    사업자 번호 : 2225-896866
                    <br />
                    TEL : 010-8664-2108   FAX : 050-5656-8585
                    EMAIL : woojin0321@naver.com
                    <br />
                    All Photo by ⓒ C106 Crew on Unsplash view
                </p>

            </div>
            {/* 예약시간 띄우기 */}
            <div> {reservationtime.length === 0 || page === 'remoteplay'
                ? null
                : (parseInt(nowminute) >= 50
                    ? <Link to="/remoteplay">
                        <div className='banner' >
                            <div style={{ padding: '30px', paddingRight: '230px' }}>
                                <div style={{ fontFamily: 'GmarketSansMedium', borderBottom: 'white 1px solid' }}>
                                    알림
                                </div>
                            </div>

                            <div style={{ fontFamily: 'GmarketSansMedium', textAlign: 'center' }}>
                                원격놀이 10분 전 입니다.
                            </div>

                            <div style={{ textAlign: 'center', paddingTop: '30px' }}>

                                <button style={{ fontFamily: 'GmarketSansMedium', backgroundColor: 'rgb(0,0,0,0)', border: '0px', color: 'white', borderBottom: 'white 1px solid' }}>
                                    이동
                                </button>

                            </div>

                        </div>
                    </Link>

                    : (parseInt(nowminute) >= 30
                        ? <Link to="/remoteplay">
                            <div className='banner' >
                                <div style={{ padding: '30px', paddingRight: '230px' }}>
                                    <div style={{ fontFamily: 'GmarketSansMedium', borderBottom: 'white 1px solid' }}>
                                        알림
                                    </div>
                                </div>

                                <div style={{ fontFamily: 'GmarketSansMedium', textAlign: 'center' }}>
                                    원격놀이 30분 전 입니다.
                                </div>

                                <div style={{ textAlign: 'center', paddingTop: '30px' }}>

                                    <button style={{ fontFamily: 'GmarketSansMedium', backgroundColor: 'rgb(0,0,0,0)', border: '0px', color: 'white', borderBottom: 'white 1px solid' }}>
                                        이동
                                    </button>

                                </div>

                            </div>
                        </Link>
                        : <Link to="/remoteplay">
                            <div className='banner' >
                                <div style={{ padding: '30px', paddingRight: '230px' }}>
                                    <div style={{ fontFamily: 'GmarketSansMedium', borderBottom: 'white 1px solid' }}>
                                        알림
                                    </div>
                                </div>

                                <div style={{ fontFamily: 'GmarketSansMedium', textAlign: 'center' }}>
                                    현재 놀이가 진행중입니다.
                                </div>

                                <div style={{ textAlign: 'center', paddingTop: '30px' }}>

                                    <button style={{ fontFamily: 'GmarketSansMedium', backgroundColor: 'rgb(0,0,0,0)', border: '0px', color: 'white', borderBottom: 'white 1px solid' }}>
                                        이동
                                    </button>

                                </div>

                            </div>
                        </Link>
                    )

                )

            }
            </div>


        </div >



    );
};

export default Main;