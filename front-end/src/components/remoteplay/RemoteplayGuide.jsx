import '../straydog/StraydogGuide.css';

const StraydogGuide = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '200px' }}>
            <h1 style={{ paddingBottom: '20px', fontFamily: 'GmarketSansMedium' }}>| 이용가이드 |</h1>
            <div style={{ backgroundColor: 'none', borderRadius: '5px' }}>
                <div style={{ paddingBottom: '15px' }}>
                    <div className="guidecard">
                        <img className="guidecard-img" src="guide1.jpg" />
                        <div className="guidecard-txt">
                            <div>
                                <h4 className="text-title" style={{ fontFamily: 'GmarketSansMedium' }} >
                                    놀아주기 예약
                                </h4>
                                <p className="text" style={{ fontFamily: 'GmarketSansMedium' }}>
                                    홈페이지에서 <br />
                                    저희가 추천하는 아이들을 확인하시고 <br />
                                    놀아주기 예약을 해주세요.
                                </p>

                            </div>
                        </div>
                    </div>
                    <div className="guidecard">
                        <img className="guidecard-img" src="guide2.jpg" />
                        <div className="guidecard-txt">
                            <div>
                                <h4 className="text-title" style={{ fontFamily: 'GmarketSansMedium' }} >
                                    알림 확인
                                </h4>
                                <p className="text" style={{ fontFamily: 'GmarketSansMedium' }}>
                                    홈페이지에 로그인 상태이시면<br />
                                    놀아주기 30분 전부터 하단 오른쪽에 <br />
                                    생성되는 입장 배너를 통해 입장이 가능합니다.
                                </p>

                            </div>
                        </div>
                    </div>
                    <div className="guidecard">
                        <img className="guidecard-img" src="guide3.jpg" />
                        <div className="guidecard-txt">
                            <div>
                                <h4 className="text-title" style={{ fontFamily: 'GmarketSansMedium' }} >
                                    조작 방법
                                </h4>
                                <p className="text" style={{ fontFamily: 'GmarketSansMedium' }}>
                                    키보드의 상,하,좌,우 키로 장난감 <br />
                                    원격조정이 가능하며 <br />
                                    실시간으로 강아지의 상태를 확인하며<br />
                                    교감이 가능합니다.
                                </p>

                            </div>
                        </div>
                    </div>
                    <div className="guidecard">
                        <img className="guidecard-img" src="guide4.jpg" />
                        <div className="guidecard-txt">
                            <div>
                                <h4 className="text-title" style={{ fontFamily: 'GmarketSansMedium' }} >
                                    종료
                                </h4>
                                <p className="text" style={{ fontFamily: 'GmarketSansMedium' }}>
                                    1시간이 초과되면 자동으로 종료가 되고 <br />
                                    이전에 종료하려면 종료 버튼을 누르시면 됩니다.
                                </p>

                            </div>
                        </div>
                    </div>
                    <div style={{ fontFamily: 'GmarketSansMedium', margin: '20px', textAlign: 'center' }}>
                        백문이 불여일犬은 현재 통합 상담 콜센터를 운영중이며, 각 지점 보호소의 아이들이 <br />
                        실시간으로 고객님들과 원격으로 교감을 하고 있습니다. <br />
                        더 자세한 정보를 원하시면 유선 안내를 이용해주십시오.
                    </div>
                </div>
            </div>

        </div >
    );
};
export default StraydogGuide