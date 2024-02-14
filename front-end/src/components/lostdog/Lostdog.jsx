import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import '../straydog/Straydog.css';
import ReactPaginate from 'react-paginate';


function chunkArray(array, size) {
    const chunked_arr = [];
    let copied = [...array];
    while (copied.length > 0) {
        chunked_arr.push(copied.splice(0, size));
    }
    return chunked_arr;
}
function Lostdog() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const dataChunks = chunkArray(data, 3);
    const perPage = 12;

    useEffect(() => {
        const fetchData = async () => {

            const response = await axios.get(`/api/lostdog?page=${currentPage + 1}&pageSize=${perPage}`);

            setData(response.data.lostDog);
            setTotalPage(Math.ceil(response.data.totalItem / perPage));
        }
        fetchData();
    }, [currentPage, perPage]);

    const handlePageClick = (data) => {
        let selected = data.selected;
        setCurrentPage(selected);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '200px' }}>
            <h1 style={{ paddingBottom: '20px', fontFamily: 'GmarketSansMedium' }}>| 분실견 |</h1>
            <p style={{ fontFamily: 'GmarketSansMedium', textAlign: 'center', }} >저희 보호소에서 찾는중인 분실견들입니다. <br />빠른 시일내로 주인을 찾을 수 있도록 많은 관심 부탁드립니다.
                <br /> 분실견 등록을 원하시면 페이지 하단에 등록하기 버튼을 누르시면 등록이 가능합니다.<br />집 아이콘으로 어둡게 표시된 아이들은 귀가 조치가 완료된 아이들입니다.<br />자세한 정보를 원하시면 아이를 클릭해주세요. </p>
            <table>
                <tbody >
                    {dataChunks.map((chunk, i) =>
                        <tr key={i} >
                            {chunk.map(item =>
                                <td key={item.DogID} >

                                    <div className="flip" >
                                        <div className="card" >
                                            <div className="front" style={{ position: 'relative' }}>
                                                <img src={`/uploads/${item.Image}`} alt={item.DogId} style={{ width: '300px', height: '300px', borderRadius: '5px' }} className="nav-link active" />
                                                <div>
                                                    {item.ReturnedHome === 'Yes'
                                                        ? <img src='home.jpg' alt={item.DogId} style={{ width: '300px', height: '300px', borderRadius: '5px', backgroundColor: 'rgb(0, 0, 0, 0.4)', position: 'absolute', left: '0px', top: '0px' }} className="nav-link active" />

                                                        : null
                                                    }
                                                </div>
                                            </div>
                                            <div className="back">
                                                <Link to={{ pathname: `/lostdog-detail/${item.DogID}` }} className="nav-link active " state={{ dogID: item.dogID }}>
                                                    <div className='dogbaiscinfodiv' style={{ borderRadius: '5px' }}>
                                                        <div>
                                                            <p style={{ fontFamily: 'GmarketSansMedium', padding: '20px' }}>
                                                                • 나이 : {item.Age} <br />
                                                                • 성별 : {item.Sex} <br />
                                                                • 품종 : {item.Breed} <br />
                                                                • 분실 장소 : {item.LostLocation} <br />
                                                                • 분실 날짜 : {item.LostDate} <br />
                                                                • 특징 : {item.Comment}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>

            <ReactPaginate
                previousLabel={"◁"}
                nextLabel={"▷"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />
            <Link to={{ pathname: `/lostdog/create` }} className="nav-link active">
                <button className="btn btn-secondary">
                    등록하기
                </button>
            </Link>
        </div>
    );
}
export default Lostdog