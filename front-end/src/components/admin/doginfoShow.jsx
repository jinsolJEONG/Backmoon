import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function DogInfoShow() {
    const [dogs, setDogs] = useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const token = localStorage.getItem('rasyueToken');

    const perPage = 10; // 페이지당 항목 수
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/admin/dogs?page=${currentPage + 1}&pageSize=${perPage}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            setDogs(response.data.Dog);
            setTotalItem(response.data.totalItem);
            setTotalPage(Math.ceil(response.data.totalItem / perPage));
        }
        fetchData();
    }, [currentPage, perPage]);

    // 페이지 클릭 처리
    const handlePageClick = (data) => {
        let selected = data.selected;
        setCurrentPage(selected);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '200px' }}>
            <h1 style={{ paddingBottom: '50px', fontFamily: 'GmarketSansMedium' }}>강아지 정보 (총 {totalItem}마리)</h1>
            <table style={{ marginTop: '50px', width: '80%' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>DogID</th>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>품종</th>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>나이</th>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>크기</th>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>입양된 날짜</th>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>분실 날짜</th>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>발견된 장소</th>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>상태</th>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>남은 날짜</th>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>성별</th>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>무게</th>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>등록자</th>
                    </tr>
                </thead>
                <tbody>
                    {dogs.map(dog =>
                        <tr key={dog.DogID}>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{dog.DogID}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{dog.Breed}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{dog.Age}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{dog.DogSize}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{dog.EnteredDay}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{dog.LostDate}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{dog.LostLocation}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{dog.Status}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{dog.RemainDay}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{dog.Sex}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{dog.Weight}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{dog.UserID}</td>
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

export default DogInfoShow;