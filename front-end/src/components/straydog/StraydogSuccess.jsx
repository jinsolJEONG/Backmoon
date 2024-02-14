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

function StraydogSuccess() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const dataChunks = chunkArray(data, 3);
    const perPage = 12;

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/adopteddog?page=${currentPage + 1}&pageSize=${perPage}`);
            setData(response.data.adoptedDog); // set data
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

            <h1 style={{ paddingBottom: '20px', fontFamily: 'GmarketSansMedium' }}>| 입양 완료 |</h1>
            <p style={{ fontFamily: 'GmarketSansMedium', textAlign: 'center', }}>저희 보호소에서 입양이 완료된 아이들입니다.
            </p>

            <table style={{ marginTop: '140px' }}>
                <tbody >
                    {dataChunks.map((chunk, i) =>
                        <tr key={i} >
                            {chunk.map(item =>
                                <td key={item.DogID} >
                                    <div className="flip" >
                                        <div className="card" >
                                            <div className="front">
                                                <img src={`/uploads/${item.Image}`} alt={item.DogId} style={{ width: '300px', height: '300px', borderRadius: '10px' }} className="nav-link active" />
                                            </div>
                                            <div className="back">
                                                <div className='dogbaiscinfodiv'>
                                                    <div>
                                                        <p style={{ fontFamily: 'GmarketSansMedium', padding: '20px' }}>
                                                            {item.Comment}
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
export default StraydogSuccess