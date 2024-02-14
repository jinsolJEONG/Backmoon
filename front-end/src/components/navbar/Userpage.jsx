import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Userpage = () => {

    const token = localStorage.getItem('rasyueToken');
    const [reservationtimes, setReservationTimes] = useState([])
    const [userinformation, setUserInformation] = useState({})
    const [view, setView] = useState('')
    const navigate = useNavigate()
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` // 토큰을 Bearer 토큰 형식으로 포함
        }
    };


    useEffect(() => {

        const fetchData = async () => {

            const response = await axios.get('/api/reservation/user', config);
            setReservationTimes(response.data.reservation)
            
        }
        const apiCall = async () => {
            const response = await axios.get('/api/user', config);
            setUserInformation(response.data)

        }
        fetchData();
        apiCall();

    }, []);

    const changeView = event => {
        setView(event.target.value)
    }

    const today = new Date()
    const times = reservationtimes.filter((reservationtime) => {
        return today < new Date(reservationtime.ReservationDatetime)
    })

    times.sort((a, b) => a.ReservationDatetime.localeCompare(b.ReservationDatetime))



    const DeleteReservation = async (reservationid) => {
        const response = await axios.delete(`/api/reservation/${reservationid}`);
        window.location.reload()
    }

    const onDelete = (reservationid) => {

        if (window.confirm("예약을 취소하시겠습니까?")) {

            alert("삭제되었습니다.");
            DeleteReservation(reservationid)

        }
    };
    const DeleteUser = async() => {
        const response = await axios.delete(`/api/user`, config)
    }

    const onUserDelete = async() => {
        if (window.confirm("정말 탈퇴하시겠습니까?")) {

            alert("탈퇴되었습니다.");
            DeleteUser()
            localStorage.removeItem("rasyueToken");
            navigate('/login')

        }
    }



    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '200px' }}>
            <div style={{width : '800px'}}>
                <h2 className="mb-3" style={{ fontFamily: 'GmarketSansMedium' }}>
                    기본 정보
                </h2>
                <div style={{fontFamily: 'GmarketSansMedium' }}>
                    이름   : {userinformation.Name}
                </div>
                <div style={{fontFamily: 'GmarketSansMedium' }}>
                    아이디 : {userinformation.UserID}
                </div>
                <div style={{fontFamily: 'GmarketSansMedium' }}>
                    E-mail : {userinformation.Email}
                </div>
                <div style={{fontFamily: 'GmarketSansMedium' }}>
                    닉네임 : {userinformation.Nickname}
                </div>
                <div style={{fontFamily: 'GmarketSansMedium' }}>
                    전화번호 : {userinformation.PhoneNumber}
                </div>
                <div style={{fontFamily: 'GmarketSansMedium' }}>
                    주소 : {userinformation.Address}
                </div>
                <button className="btn btn-secondary" style={{fontFamily: 'GmarketSansMedium'}} onClick={onUserDelete}>회원 탈퇴</button>

                <hr/>
                {/* ----------------------------------------------- */}
                <h2 style={{ fontFamily: 'GmarketSansMedium' }}>
                    내 예약 현황
                </h2>
                
                <div onChange={changeView} style={{ paddingBottom: '10px' }}>
                    <input className="btn-check" type="radio" name="view" value="ALL" id="ALL" /><label htmlFor="ALL" className="btn btn-outline-secondary" >ALL</label>
                    <input className="btn-check" type="radio" name="view" value="play" id="play" /><label htmlFor="play" className="btn btn-outline-secondary" >놀이</label>
                    <input className="btn-check" type="radio" name="view" value="visit" id="visit" /><label htmlFor="visit" className="btn btn-outline-secondary" >방문</label>
                </div>

                <div>
                    {view === 'ALL'
                        ? <div className='' style={{ width: '800px' }}>

                            {times.map(item =>
                                <div key={item.ReservationID} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>{item.Type === 'play'
                                        ? <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <h4 style={{ margin: '0px', padding: '10px', fontFamily: 'GmarketSansMedium' }}>놀이</h4>
                                        </div>
                                        : <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <h4 style={{ margin: '0px', padding: '10px', fontFamily: 'GmarketSansMedium' }}>방문</h4>
                                        </div>
                                    }


                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <h4 style={{ margin: '0px', padding: '10px', fontFamily: 'GmarketSansMedium' }}>{item.ReservationDatetime.slice(0, 4)}년 {item.ReservationDatetime.slice(5, 7)}월 {item.ReservationDatetime.slice(8, 10)}일 {item.ReservationDatetime.slice(11, 13)}시</h4>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }} >
                                        <Link to='/mypage'>
                                            <button className="btn" style={{ backgroundColor: 'orange', fontFamily: 'GmarketSansMedium' }} onClick={() => onDelete(item.ReservationID)}>
                                                예약 취소
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                            )}



                        </div>
                        : (view === 'play'
                            ? <div style={{ width: '800px' }}>
                                {times.filter(item => item.Type === 'play')
                                    .map(filteredItem => (
                                        <div key={filteredItem.ReservationID} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div>
                                                <h4 style={{ margin: '0px', padding: '10px', fontFamily: 'GmarketSansMedium' }}>놀이</h4>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <h4 style={{ margin: '0px', padding: '10px', fontFamily: 'GmarketSansMedium' }}>{filteredItem.ReservationDatetime.slice(0, 4)}년 {filteredItem.ReservationDatetime.slice(5, 7)}월 {filteredItem.ReservationDatetime.slice(8, 10)}일 {filteredItem.ReservationDatetime.slice(11, 13)}시</h4>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }} >
                                                <button className="btn" style={{ backgroundColor: 'orange', fontFamily: 'GmarketSansMedium' }} onClick={() => onDelete(filteredItem.ReservationID)}>
                                                    예약 취소
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            : (view === 'visit'
                                ? <div style={{ width: '800px' }}>
                                    {times.filter(item => item.Type === 'visit')
                                        .map(filteredItem => (
                                            <div key={filteredItem.ReservationID} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>
                                                    <h4 style={{ margin: '0px', padding: '10px', fontFamily: 'GmarketSansMedium' }}>방문</h4>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <h4 style={{ margin: '0px', padding: '10px', fontFamily: 'GmarketSansMedium' }}>{filteredItem.ReservationDatetime.slice(0, 4)}년 {filteredItem.ReservationDatetime.slice(5, 7)}월 {filteredItem.ReservationDatetime.slice(8, 10)}일 {filteredItem.ReservationDatetime.slice(11, 13)}시</h4>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }} >
                                                    <button className="btn" style={{ backgroundColor: 'orange', fontFamily: 'GmarketSansMedium' }} onClick={() => onDelete(filteredItem.ReservationID)}>
                                                        예약 취소
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                : null
                            )

                        )
                    }




                </div>
            </div>

        </div>
    );
};
export default Userpage