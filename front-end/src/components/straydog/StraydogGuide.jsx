import './StraydogGuide.css';

const StraydogGuide = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '200px' }}>
            <h1 style={{ paddingBottom: '20px', fontFamily: 'GmarketSansMedium' }}>| 입양가이드 |</h1>
            <div style={{ backgroundColor: 'none', borderRadius: '5px' }}>
                <div style={{ paddingBottom: '15px' }}>
                    <div className="guidecard">
                        <img className="guidecard-img" src="strayguide1.jpg" />
                        <div className="guidecard-txt">
                            <div>
                                <h4 className="text-title" style={{ fontFamily: 'GmarketSansMedium' }} >
                                    방문 예약
                                </h4>
                                <p className="text" style={{ fontFamily: 'GmarketSansMedium' }}>
                                    홈페이지에서 <br />
                                    보호중인 아이들의 공고를 확인하시고 <br />
                                    방문 예약을 해주세요.
                                </p>

                            </div>
                        </div>
                    </div>
                    <div className="guidecard">
                        <img className="guidecard-img" src="strayguide2.jpg" />
                        <div className="guidecard-txt">
                            <div>
                                <h4 className="text-title" style={{ fontFamily: 'GmarketSansMedium' }} >
                                    보호소 방문
                                </h4>
                                <p className="text" style={{ fontFamily: 'GmarketSansMedium' }}>
                                    보호소의 아이들은 실시간으로<br />
                                    입양이 이루어지고 있기 때문에 <br />
                                    직접 방문하여 아이들을 만나보세요.
                                </p>

                            </div>
                        </div>
                    </div>
                    <div className="guidecard">
                        <img className="guidecard-img" src="strayguide3.jpg" />
                        <div className="guidecard-txt">
                            <div>
                                <h4 className="text-title" style={{ fontFamily: 'GmarketSansMedium' }} >
                                    입양 전 상담
                                </h4>
                                <p className="text" style={{ fontFamily: 'GmarketSansMedium' }}>
                                    입양을 원하는 아이를 대상으로 <br />
                                    입양 상담이 진행되며 <br />
                                    아이에 대한 정보를 안내해 드려요.
                                </p>

                            </div>
                        </div>
                    </div>
                    <div className="guidecard">
                        <img className="guidecard-img" src="strayguide4.jpg" />
                        <div className="guidecard-txt">
                            <div>
                                <h4 className="text-title" style={{ fontFamily: 'GmarketSansMedium' }} >
                                    계약서 작성 및 입양
                                </h4>
                                <p className="text" style={{ fontFamily: 'GmarketSansMedium' }}>
                                    전문 관리사를 통한 자세한 상담 후 <br />
                                    계약서 작성을 도와드려요.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{ fontFamily: 'GmarketSansMedium', margin: '20px', textAlign: 'center' }}>
                        백문이 불여일犬은 현재 통합 상담 콜센터를 운영중이며, 각 지점 보호소의 아이들이 <br />
                        실시간으로 입양되고 있어 보호중인 아이들에 대해 정확한 유선 안내가 <br />
                        어려울 수 있으니 보호소 방문을 통해 정확한 확인을 부탁드립니다.
                    </div>
                </div>
            </div>

        </div >
    );
};
export default StraydogGuide