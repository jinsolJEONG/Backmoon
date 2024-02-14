import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";



const optionContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '10px',
    padding: '8px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    justifyContent: 'center', // added this line
    alignItems : 'center'      // added this line
};

const selectedOptionStyle = {
    backgroundColor: '#8F5E34', // a shade of brown
    color: 'white',
};

const optionLabelStyle = {
    fontSize: '18px',
};

const parseTimeData = (data) => {
    const parsed = {};
    data.forEach(item => {
        const [hour, available] = item.split(' : ');
        parsed[hour] = available === 'true';
    });
    return parsed;
}

const completeReservationButtonStyle = {
    padding: '12px 15px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    backgroundColor: '#DB7B0A',  // green color
    color: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',  // some space from the above content
    ':hover': {
        backgroundColor: '#45a049'  // slightly darker green on hover
    }
};

const Reservation = () => {
    const [receivedData, setReceivedData] = useState([]);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [availabilityData, setAvailabilityData] = useState({});
    const location = useLocation();
    const { dogID, } = location.state || { dogID: "", };
    const token = localStorage.getItem('rasyueToken');
    const [selectedType, setSelectedType] = useState('visit');
    const [selectedTime, setSelectedTime] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [selectedDateTime, setSelectedDateTime] = useState('');

    const navigation = useNavigate();


    useEffect(() => {
        handleDateChange(startDate);
    }, [selectedType, startDate]);

    const handleAgreementChange = (e) => {
        setAgreedToTerms(e.target.checked);
        if (e.target.checked) {
            handleDateChange(startDate);
        }
    }

    const handleOptionChange = (e) => {
        setSelectedType(e.target.value);
        handleDateChange(startDate);
    }

    const handleTimeChange = (time) => {
        setSelectedTime(time);
        let newDate = new Date(startDate);
        newDate.setHours(12);
        let hourString = time < 10 ? `0${time}` : `${time}`;
        let dateString = newDate.toISOString().substring(0, 10);
        setSelectedDateTime(`${dateString}T${hourString}:00`);
    }

    const handleDateChange = async (date) => {
        if (date instanceof Event) {
            date = date.target.value;
        }

        setStartDate(date);
        let newDate = new Date(date);
        newDate.setHours(12);
        let dateString = newDate.toISOString().slice(0, -14);
        setSelectedDateTime(`${dateString}T00:00`);


        try {
            const response = await axios.get(`/api/reservation/state?date=${dateString}`);
            setReceivedData(response.data);
            const timeDataForSelectedType = response.data[`type: ${selectedType}`] || [];
            const parsedData = parseTimeData(timeDataForSelectedType);
            setAvailabilityData(parsedData);
        } catch (error) {
            console.log(error);
        }
    }

    const sendReservationData = async () => {
        try {
            const payload = {
                "DogID": dogID,
                "ReservationDatetime": selectedDateTime,
                "Type": selectedType,
                "seq": 0,
                "Confirm": ""
            };

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}` // 토큰을 Bearer 토큰 형식으로 포함
                }
            };
            const response = await axios.post('/api/reservation', payload, config);

            alert("예약이 완료되었습니다!");
            navigation("/mypage");
        } catch (error) {
            console.log(error);
        }
    }

    const morningTimeOptions = [];
    const afternoonTimeOptions = [];

    for (let i = 9; i <= 17; i++) {
        const isAvailable = availabilityData[i.toString()];

        let buttonStyle = {
            padding: '8px 10px',
            margin: '5px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
        };

        if (selectedTime === i) {
            buttonStyle.backgroundColor = '#8F5E34';
            buttonStyle.color = 'white';
        } else if (isAvailable) {
            buttonStyle.backgroundColor = '#e0e0e0';
            buttonStyle.color = '#a0a0a0';
            buttonStyle.cursor = 'not-allowed';
        } else {
            buttonStyle.backgroundColor = '#f5f5f5';
        }

        const button = (
            <button
                key={i}
                style={buttonStyle}
                onClick={() => handleTimeChange(i)}
                disabled={isAvailable}
            >
                {isAvailable ? "예약중" : `${i}:00`}
            </button>
        );

        if (i <= 12) {
            morningTimeOptions.push(button);
        } else {
            afternoonTimeOptions.push(button);
        }
    }

    const formatDateAndTime = (isoString) => {
        if (!isoString) return '';

        const dateObj = new Date(isoString);
        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const date = dateObj.getDate().toString().padStart(2, '0');
        const hours = dateObj.getHours().toString().padStart(2, '0');
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');

        return `예약날짜 : ${year}-${month}-${date} ${hours}:${minutes}`;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '200px' }}>
            <h1 style={{ fontFamily: 'GmarketSansMedium', paddingBottom: '20px' }}>ㅣ방문 및 놀아주기 예약ㅣ</h1>

            <p style={{ textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>방문 및 강아지 놀아주기 예약페이지 입니다. <br />한시간 단위로 예약이 가능하고 예약중에 있는 시간은 예약이 불가능합니다.
                <br />동의서약서를 읽어보시고 동의하시면 예약 폼이 나타납니다. <br />놀아주기 및 방문 그리고 예약 날짜를 꼭 확인해주세요.<br />예약을 완료하시면 마이페이지로 이동하고 마이페이지에서 예약현황을 보실 수 있습니다.</p>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '530px', width: '570px', border: 'solid', borderWidth: '2px', marginRight: '20px' }}>
                    <p style={{ fontSize: '12px', fontFamily: 'GmarketSansMedium', padding: '20px' }}>입양 및 강아지 놀아주기 동의서<br /><br />

                        본 동의서는 강아지의 입양 및 놀아주기를 위해 작성되었습니다. 아래의 내용을 주의 깊게 읽고 동의하실 경우 동의를 눌러주세요.<br />
                        <br />
                        입양 동의 내용:<br />

                        입양자는 강아지에게 안전하고 건강한 환경을 제공할 의무가 있습니다.<br />
                        입양자는 강아지의 의료적인 필요를 충족시켜야 합니다. (예: 예방접종, 정기적인 건강 검진 등)<br />
                        입양 후 발생하는 모든 비용은 입양자의 책임입니다.<br /><br />
                        강아지 놀아주기 동의 내용:<br />

                        강아지를 존중하고 사랑으로 다룰 것을 동의합니다.<br />
                        강아지와 놀아줄 시 안전에 최우선으로 주의하겠습니다.<br />
                        강아지가 위험에 노출되거나 스트레스를 받는 상황을 피하겠습니다.<br /><br />
                        면책 조항:<br />

                        본 동의서 서명 후 발생하는 문제나 상황에 대하여 단체/기관은 책임지지 않습니다.<br />
                        입양자 및 놀아주는 자는 강아지와의 상호작용 중 발생하는 모든 위험을 이해하고 이에 동의합니다.<br /><br />
                        동의서 해지 조건:<br />

                        위의 조건을 위반할 경우, 단체/기관은 동의서를 해지하고 강아지를 회수할 수 있습니다.<br />
                        본 동의서의 모든 내용에 동의하며, 강아지의 입양 및 놀아주기 활동에 적극적으로 참여할 것을 약속합니다.</p>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={agreedToTerms}
                                onChange={handleAgreementChange}
                            />
                            I agree to the terms and conditions.
                        </label>
                    </div>
                </div>
                {agreedToTerms && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <DatePicker
                            inline
                            selected={startDate}
                            onChange={handleDateChange}
                            dateFormat="MMMM d, yyyy"
                        />
                        <form>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <div
                                    style={{
                                        ...optionContainerStyle,
                                        ...(selectedType === 'visit' ? selectedOptionStyle : {}),
                                        marginRight: '15px' // To give some space between the two options
                                    }}
                                    onMouseEnter={() => {
                                        document.body.style.cursor = 'pointer';
                                    }}
                                    onMouseLeave={() => {
                                        document.body.style.cursor = 'default';
                                    }}
                                    onClick={() => setSelectedType('visit')}
                                >
                                    <input
                                        type="radio"
                                        value="visit"
                                        checked={selectedType === 'visit'}
                                        onChange={handleOptionChange}
                                        style={{ display: 'none' }}
                                    />
                                    <label style={optionLabelStyle}>Visit</label>
                                </div>
                                <div
                                    style={{
                                        ...optionContainerStyle,
                                        ...(selectedType === 'play' ? selectedOptionStyle : {})
                                    }}
                                    onMouseEnter={() => {
                                        document.body.style.cursor = 'pointer';
                                    }}
                                    onMouseLeave={() => {
                                        document.body.style.cursor = 'default';
                                    }}
                                    onClick={() => setSelectedType('play')}
                                >
                                    <input
                                        type="radio"
                                        value="play"
                                        checked={selectedType === 'play'}
                                        onChange={handleOptionChange}
                                        style={{ display: 'none' }}
                                    />
                                    <label style={optionLabelStyle}>Play</label>
                                </div>
                            </div>
                        </form>
                        <div style={{ marginBottom: '10px' }}>{morningTimeOptions}</div>
                        <div>{afternoonTimeOptions}</div>
                        <p>{formatDateAndTime(selectedDateTime)}</p>
                        <button style={completeReservationButtonStyle} onClick={sendReservationData}>Complete Reservation</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reservation;