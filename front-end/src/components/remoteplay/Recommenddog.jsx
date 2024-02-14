import { useEffect, useState } from 'react'
import axios from 'axios'
import Remoteplaycarousel from './RemoteplayCarousel'


const Remoteplay = () => {

    const [urgentdog, seturgentdog] = useState(null)
    let content = <h1>로딩중 ... </h1>
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/urgentdog');

            seturgentdog(response.data)

            // console.log(response.data)
        }
        fetchData();
    }, [])
    if (urgentdog !== null) {
        content = <Remoteplaycarousel urgentdog={urgentdog} />
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '200px' }}>
            <h1 style={{ fontFamily: 'GmarketSansMedium', paddingBottom: '20px' }}>
                ㅣ백문이불여일犬이 추천하는 아이들ㅣ
            </h1>
            <p style={{ fontFamily: 'GmarketSansMedium', textAlign: 'center', }} >저희 보호소에서 추천드리는 아이들입니다. <br />안락사 기간이 얼마 남지 않은 <br />아이들이니 많은 관심 부탁드립니다. <br />아이를 클릭하시면 놀아주기 예약 페이지로 이동합니다.</p>
            {content}
        </div>
    );
};
export default Remoteplay