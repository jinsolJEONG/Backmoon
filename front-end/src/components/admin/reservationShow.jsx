import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';


function ReservationShow() {
    const [data, setData] = useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const token = localStorage.getItem('rasyueToken');
    const perPage = 10; // 페이지당 항목 수

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `/api/admin/reservation?page=${currentPage + 1}&pageSize=${perPage}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setData(response.data.reservation);
            setTotalItem(response.data.totalItem);
            setTotalPage(Math.ceil(response.data.totalItem / perPage));
        }
        fetchData();
    }, [currentPage, perPage]);

    const formatType = (type) => {
        return type === "play" ? "놀이" : "방문";
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시`;
        // return `${dateStr.slice(0, 4)}년 ${dateStr.slice(5, 7)}월 ${dateStr.slice(8, 10)}일 ${dateStr.slice(11, 13)}시`;
    }

    // 페이지 클릭 처리
    const handlePageClick = (data) => {
        let selected = data.selected;
        setCurrentPage(selected);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '200px' }}>
            <h1 style={{ paddingBottom: '50px', fontFamily: 'GmarketSansMedium' }}>예약 현황 (총 예약 건수: {totalItem}건)</h1>

            <table style={{ marginTop: '50px', width: '80%' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>UserID</th>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>DogID</th>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>유형</th>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>예약 시간</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(reservation =>
                        <tr key={reservation.ReservationID}>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{reservation.seq}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{reservation.DogID}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{formatType(reservation.type)}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{formatDate(reservation.ReservationDatetime
                            )}</td>
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

export default ReservationShow;