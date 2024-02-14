import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios'
// import './StraydogDetail.css';



const LostdogUpdate = () => {

    const { id } = useParams()
    const [dog, setDog] = useState({
        "DogID": 37,
        "Sex": "Female",
        "Age": 15,
        "ChipNumber": "123987654321",
        "Image": "http://example.com/dog5.jpg",
        "Breed": "SiGorJabJong",
        "RemainedDay": "150",
        "DogSize": "Large",
        "Weight": 123,
        "Status": "lost",
        "EnteredDay": null,
        "DiscoveredPlace": null,
        "LostLocation": "AnYang",
        "LostDate": "2023-02-08",
        "ReturnedHome": "Yes"
    });
    useEffect(() => {
        const apiCall = async () => {
            const response = await axios.get(`/api/lostdog/${id}`);
            setDog(response.data)
            setDog(response.data)
            setSex(response.data.Sex)
            setAge(response.data.Age)
            setChipNumber(response.data.ChipNumber)
            setImage(response.data.Image)
            setBreed(response.data.Breed)
            setRemainedDay(response.data.RemainedDay)
            setDogSize(response.data.DogSize)
            setWeight(response.data.Weight)
            setLostLocation(response.data.LostLocation)
            setLostDate(response.data.LostDate)
            setReturnedHome(response.data.ReturnedHome)
            setComment(response.data.Comment)
        }
        apiCall()

    }, [])
    const [Sex, setSex] = useState(dog.Sex)
    const changeSex = event => {
        setSex(event.target.value);
    };
    const [Age, setAge] = useState(dog.Age)
    const changeAge = event => {
        setAge(event.target.value);
    };
    const [ChipNumber, setChipNumber] = useState(dog.ChipNumber)
    const changeChipNumber = event => {
        setChipNumber(event.target.value);
    };
    const [PreviewImage, setPreviewImage] = useState(null);
    const [Image, setImage] = useState(dog.Image)
    const changeImage = event => {
        setImage(event.target.files[0])
        const reader = new FileReader();
        reader.onload = (e) => {
        setPreviewImage(e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    const [Breed, setBreed] = useState(dog.Breed)
    const changeBreed = event => {
        setBreed(event.target.value);
    };
    const [RemainedDay, setRemainedDay] = useState(dog.RemainedDay)
    const changeRemainedDay = event => {
        setRemainedDay(event.target.value);
    };
    const [DogSize, setDogSize] = useState(dog.DogSize)
    const changeDogSize = event => {
        setDogSize(event.target.value);
    };
    const [Weight, setWeight] = useState(dog.Weight)
    const changeWeight = event => {
        setWeight(event.target.value);
    };
    const [LostLocation, setLostLocation] = useState(dog.LostLocation)
    const changeLostLocation = event => {
        setLostLocation(event.target.value);
    };
    const [LostDate, setLostDate] = useState(dog.LostDate)
    const changeLostDate = event => {
        setLostDate(event.target.value);
    };
    const [ReturnedHome, setReturnedHome] = useState(dog.ReturnedHome)
    const changeReturnedHome = event => {
        setReturnedHome(event.target.value);
    };
    const [Comment, setComment] = useState(dog.Comment)
    const changeComment = event => {
        setComment(event.target.value);
    }

    const navigate = useNavigate()
    const Update = () => {
        const formData = new FormData();
        formData.append('Image', Image);
        axios.put(`/api/lostdog/${id}`, JSON.stringify(
            {
                Sex: Sex,
                Age: parseInt(Age),
                ChipNumber: ChipNumber,
                Breed: Breed,
                DogSize: DogSize,
                Weight: parseInt(Weight),
                Status: 'lost',
                LostDate : LostDate,
                LostLocation : LostLocation,
                ReturnedHome : ReturnedHome,
                Comment : Comment,
            }), { headers: { "Content-Type": 'application/json' } })

        axios.put(`/api/lostdog/${id}`, formData)
            .then(function (response) {
                navigate(`/lostdog-detail/${id}`)
            })
        }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '200px' }}>
            <h1 style={{paddingBottom : '50px', fontFamily : 'GmarketSansMedium'}}>| 분실견 수정 |</h1>
            <div style={{width : '800px', border : 'gray 5px solid', paddingLeft : '100px', paddingRight : '100px', paddingTop: '50px', fontFamily: 'Noto Sans'}}>
                <div className='input_div'>
                    <div className='kk'>성 별 </div>
                    <div>
                        <input onChange={changeSex} className="btn-check" type="radio" name="sex" value="Male" id="male" checked={Sex === 'Male'} /><label htmlFor="male" className="btn btn-outline-secondary">수컷</label>
                        <input onChange={changeSex} className="btn-check" type="radio" name="sex" value="Female" id="female" checked={Sex === 'Female'}/><label htmlFor="female" className="btn btn-outline-secondary">암컷</label>
                    </div>
                </div>
                <hr/>
                <div className='input_div'>
                    <label htmlFor='age' className='kk'> 추정 나이 </label><input id='age' type="number" className='input_text' placeholder={dog.Age} onChange={changeAge} />
                </div>
                <hr/>
                <div className='input_div'>
                    <label htmlFor='chip_number' className='kk'> 칩번호 </label><input id='chip_number' type="text" placeholder={dog.ChipNumber}  className='input_text' onChange={changeChipNumber} />
                </div>
                <hr/>
                <div className='input_div'>
                    <label htmlFor='image' className='kk'> 사 진 </label>
                    {PreviewImage && <img src={PreviewImage} alt="미리보기" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                    <input id='image' type="file" className='input_text' onChange={changeImage} style={{width : '200px'}} />
                </div>
                <hr/>
                <div className='input_div'>
                    <label htmlFor='breed' className='kk'> 견 종 </label><input id='breed' type="text" placeholder={dog.Breed} className='input_text' onChange={changeBreed} />
                </div>
                <hr/>
                <div className='input_div'>
                    <label htmlFor='remained_day' className='kk'> 남은 날짜 </label><input id='remained_day' type="number" placeholder={dog.RemainedDay} className='input_text' onChange={changeRemainedDay} />
                </div>
                <hr/>
                <div className='input_div'>
                    <div className='kk'>크기</div>
                    <div>
                        <input onChange={changeDogSize} checked={DogSize === 'small'} className="btn-check" type="radio" name="size" value="small" id="small" /><label htmlFor="small" className="btn btn-outline-secondary">소형견</label>
                        <input onChange={changeDogSize} checked={DogSize === 'medium'} className="btn-check" type="radio" name="size" value="medium" id="medium" /><label htmlFor="medium" className="btn btn-outline-secondary">중형견</label>
                        <input onChange={changeDogSize} checked={DogSize === 'large'} className="btn-check" type="radio" name="size" value="large" id="large" /><label htmlFor="large" className="btn btn-outline-secondary">대형견</label>
                    </div>
                    
                </div>
                <hr/>
                <div className='input_div'>
                    <label htmlFor='weight' className='kk'> 무 게 </label><input id='weight' type="number" className='input_text' placeholder={dog.Weight} onChange={changeWeight} />
                </div>
                <hr/>
                <div className='input_div'>
                    <label htmlFor='status' className='kk'> 상 태 </label><input id='status' defaultValue="lost" type="text" className='input_text' placeholder={dog.Status}/>
                </div>
                <hr />

            {/* LOST */}
            {/* 이건 어차피 유기견 추가에는 필요 없음. */}
                <div className='input_div'>
                    <label htmlFor='lost_location' className='kk'> 잃어 버린 곳 </label><input id='lost_location' type="text" placeholder={dog.LostLocation}  className='input_text' onChange={changeLostLocation} />
                </div>
                <hr/>
                <div className='input_div'>
                    <label htmlFor='lost_date' className='kk'> 잃어버린 날짜 </label><input id='lost_date' type="date" className='input_text' placeholder={dog.LostDate} min="2000-01-01" max="2100-12-31" style={{width : '220px'}} onChange={changeLostDate} />
                </div>
                <hr/>
                <div className='input_div'>
                    <label htmlFor='discovered_place'> 추가 내용 </label><textarea id='discovered_place' className='input_text' type="text" placeholder={dog.DiscoveredPlace} onChange={changeComment}/>
                </div>
                <hr/>               
                <div className='input_div'>
                    <label htmlFor='lost_date' className='kk'> 귀가 여부 </label>
                    <div className='kk'>
                        <input onChange={changeReturnedHome} checked={ReturnedHome === 'Yes'} className="btn-check" type="radio" name="theme" value="Yes" id="Yes" /><label htmlFor="Yes" className="btn btn-outline-secondary">귀가 완료</label>
                        <input onChange={changeReturnedHome} checked={ReturnedHome === 'No'} className="btn-check" type="radio" name="theme" value="No" id="No" /><label htmlFor="No" className="btn btn-outline-secondary">분실 상태</label>
                    </div>
                </div>

                <hr/>

                <div style={{display : 'flex', justifyContent : 'center', marginTop : '10px', marginBottom : '10px'}}>
                    <button className="btn btn-secondary" onClick={Update} style={{ width: '200px', height: '50px' }}>수정 완료</button>
                </div>
            </div>
        </div>
    );
};


export default LostdogUpdate