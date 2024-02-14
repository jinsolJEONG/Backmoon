import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function UserInfoShow() {
    const [users, setUsers] = useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const token = localStorage.getItem('rasyueToken');

    const perPage = 10; // 페이지당 항목 수

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/admin/users?page=${currentPage + 1}&pageSize=${perPage}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            setUsers(response.data.user);
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
            <h1 style={{ paddingBottom: '50px', fontFamily: 'GmarketSansMedium' }}>회원 정보 (총 {totalItem}명)</h1>

            <table style={{ marginTop: '50px', width: '80%' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>UserID</th>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>사용자 이름</th>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>이메일</th>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>전화번호</th>
                        <th style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>관리자</th>

                        {/* 추가로 필요한 다른 컬럼들도 여기에 넣을 수 있습니다. */}
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.UserID}>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{user.UserID}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{user.Name}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{user.Email}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{user.PhoneNumber}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>{user.Admin === 1 ? 'O' : 'X'}</td>
                            {/* 추가로 필요한 다른 데이터들도 여기에 넣을 수 있습니다. */}
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

export default UserInfoShow;