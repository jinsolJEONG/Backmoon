import { Pagination } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import './Straydog.css';
import ReactPaginate from 'react-paginate';

function chunkArray(array, size) {
    const chunked_arr = [];
    let copied = [...array];

    while (copied.length > 0) {
        chunked_arr.push(copied.splice(0, size));
    }
    return chunked_arr;
}



function StraydogFail() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const dataChunks = chunkArray(data, 3);
    const perPage = 12

    useEffect(() => {
        const fetchData = async () => {

            const response = await axios.get(`/api/deaddog?page=${currentPage + 1}&pageSize=${perPage}`);

            setData(response.data.DeadDog);
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
            <h1 style={{ paddingBottom: '20px', fontFamily: 'GmarketSansMedium' }}>| 추모 |</h1>
            <p style={{ fontFamily: 'GmarketSansMedium', textAlign: 'center', }} >저희 보호소에서 머물다 무지개 다리를 건넌 아이들입니다. <br />같이 추모해주시면 감사드리겠습니다.</p>
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
                                            </div>
                                            <div className="back">
                                                <div className='dogbaiscinfodiv' style={{ borderRadius: '5px' }}>
                                                    <div>
                                                        <p style={{ fontFamily: 'GmarketSansMedium' }}>
                                                            • 성별 : {item.Sex} <br />
                                                            • 품종 : {item.Breed} <br />
                                                            • 나이 : {item.Age} <br />
                                                            • 입소 날짜 : {item.EnteredDay} <br />
                                                            • 발견 장소 : {item.DiscoveredPlace}

                                                        </p>

                                                    </div>
                                                </div>
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

        </div>
    );
}
export default StraydogFail