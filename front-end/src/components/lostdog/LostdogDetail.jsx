import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../straydog/StraydogDetail.css';



const LostdogDetail = () => {
    const { id } = useParams()
    const [dog, setDog] = useState({
        "DogID": 37,
        "Sex": "Female",
        "Age": 15,
        "ChipNumber": "123987654321",
        "Image": "http://example.com/dog5.jpg",
        "Breed": "SiGorJabJong",
        "RemainedDay": "150",
        "DogSize": "Large",
        "Weight": 123,
        "Status": "stray",
        "EnteredDay": null,
        "DiscoveredPlace": null,
        "LostLocation": "AnYang",
        "LostDate": "2023-02-08",
        "ReturnedHome": "Yes"
    });
    useEffect(() => {
        const apiCall = async () => {
            const response = await axios.get(`/api/lostdog/${id}`);
            setDog(response.data)
        }
        apiCall()

    }, [])

    const navigate = useNavigate()
    
    const DeleteDog = async () => {
        const response = await axios.delete(`/api/straydog/${id}`);
        setDog(response.data)
    }

    const onDelete = () => {
        if (window.confirm("정말 삭제합니까?")) {
            alert("삭제되었습니다.");
            DeleteDog()
            navigate('lostdog')
        }
    };
    const admin = localStorage.getItem('admin');
    const userid = localStorage.getItem('userid');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '200px' }}>
            <h1 style={{ fontFamily: 'GmarketSansMedium', paddingBottom: '20px' }}>| 상세정보 |</h1>
            <div style={{ width: '600px', height: '1300px', border: '#D6C7B2 5px solid' }}>
                <div style={{ marginLeft: '100px', marginRight: '100px' }}>
                    <div style={{ position: ' relative' }}>

                        <img src={`../uploads/${dog.Image}`} width="400" height="350" style={{ marginBottom: '40px', marginTop : '40px' }} />

                    </div>
                    <div className='info'>
                        <div className="info_per">
                            <p>견 종 : </p>
                            <p>{dog.Breed}</p>
                        </div>
                        <hr />
                        <div className="info_per">
                            <p>칩 번호 : </p>
                            <p>{dog.ChipNumber}</p>
                        </div>
                        <hr />
                        <div className="info_per">
                            <p>나 이 : </p>
                            <p>{dog.Age}</p>
                        </div>
                        <hr />
                        <div className="info_per">
                            <p>크 기 : </p>
                            <p>{dog.DogSize}</p>
                        </div>
                        <hr />
                        <div className="info_per">
                            <p>성 별 : </p>
                            <p>{dog.Sex}</p>
                        </div>
                        <hr />
                        <div className="info_per">
                            <p>무 게 : </p>
                            <p>{dog.Weight}kg</p>
                        </div>
                        <hr />
                        <div className="info_per">
                            <p>잃어버린 날짜 : </p>
                            <p>{dog.LostDate}</p>
                        </div>
                        <hr />
                        <div className="info_per">
                            <p>잃어버린 장소 : </p>
                            <p>{dog.LostLocation}</p>
                        </div>
                        <hr />
                        <div className="info_per">
                            <p> 기타사항 : </p>
                            <p style={{width : '200px'}}>{dog.Comment}</p>
                        </div>
                        <hr />
                    </div>


                    {/* 해당 작성자와 관리자만 보이기 */}
                    <div>{admin === '1' || userid === dog.UserID
                        ? <div style={{ display: 'flex', justifyContent : 'right' }}>
                        <div>
                            <Link to={{ pathname: `/lostdog/update/${id}` }} className="nav-link active">
                                <button className="btn btn-secondary">
                                    수정하기
                                </button>
                            </Link>
                        </div>
                        <div>
                            <button className="btn btn-secondary" onClick={onDelete}>
                                삭제하기
                            </button>

                        </div>
                    </div>
                        : null
                    }
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LostdogDetail