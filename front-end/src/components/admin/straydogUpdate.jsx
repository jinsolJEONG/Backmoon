import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './admin.css';

const StraydogUpdate = () => {
    const { id } = useParams()
    const [dog, setDog] = useState({
        DogID: 37,
        Sex: "Female",
        Age: 15,
        ChipNumber: "123987654321",
        Image: "http://example.com/dog5.jpg",
        Breed: "SiGorJabJong",
        RemainedDay: "150",
        DogSize: "Large",
        Weight: 123,
        Status: "stray",
        EnteredDay: null,
        DiscoveredPlace: null,
        LostLocation: "",
        LostDate: "",
        ReturnedHome: ""
    });
    useEffect(() => {
        const apiCall = async () => {
            const response = await axios.get(`/api/straydog/${id}`);
            setDog(response.data)
            setSex(response.data.Sex)
            setAge(response.data.Age)
            setChipNumber(response.data.ChipNumber)
            setImage(response.data.Image)
            setBreed(response.data.Breed)
            setRemainedDay(response.data.RemainedDay)
            setDogSize(response.data.DogSize)
            setWeight(response.data.Weight)
            setEnteredDay(response.data.EnteredDay)
            setDiscoveredPlace(response.data.DiscoveredPlace)
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
    const [Status, setStatus] = useState(dog.Status)
    const changeStatus = event => {
        setStatus(event.target.value);
    };
    const [EnteredDay, setEnteredDay] = useState(dog.EnteredDay)
    const changeEnteredDay = event => {
        setEnteredDay(event.target.value);
    };
    const [DiscoveredPlace, setDiscoveredPlace] = useState(dog.DiscoveredPlace)
    const changeDiscoveredPlace = event => {
        setDiscoveredPlace(event.target.value);
    }
    const [Comment, setComment] = useState(dog.Comment)
    const changeComment = event => {
        setComment(event.target.value);
    }

    const navigate = useNavigate()
    const Update = () => {

        const formData = new FormData();
        formData.append('Image', Image);
        axios.put(`/api/straydog/${id}`, JSON.stringify(
            {
                Sex: Sex,
                Age: parseInt(Age),
                ChipNumber: ChipNumber,
                Breed: Breed,
                RemainedDay: parseInt(RemainedDay),
                DogSize: DogSize,
                Weight: parseInt(Weight),
                Status: Status,
                EnteredDay: EnteredDay,
                DiscoveredPlace: DiscoveredPlace,
                Comment: Comment,
            }), { headers: { "Content-Type": 'application/json' } })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
        axios.put(`/api/straydog/${id}`, formData)
            .then(function (response) {
                navigate(`/straydog-detail/${id}`)
            })
            .catch(function (error) {
                alert('관리자만 가능합니다.')
                navigate('/straydog')
            })
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '200px' }}>
            <h1 style={{ paddingBottom: '50px', fontFamily: 'GmarketSansMedium' }}>| 유기견 수정 |</h1>
            <div style={{ width: '800px', border: 'gray 5px solid', paddingLeft: '100px', paddingRight: '100px', paddingTop: '50px', fontFamily: 'Noto Sans' }}>
                <div className='input_div'>
                    <div className='kk'>성 별 </div>
                    <div>
                        <input onChange={changeSex} className="btn-check" type="radio" name="sex" value="Male" id="male" checked={Sex === 'Male'} /><label htmlFor="male" className="btn btn-outline-secondary">수컷</label>
                        <input onChange={changeSex} className="btn-check" type="radio" name="sex" value="Female" id="female" checked={Sex === 'Female'} /><label htmlFor="female" className="btn btn-outline-secondary">암컷</label>
                    </div>
                </div>
                <hr />
                <div className='input_div'>
                    <label htmlFor='age' className='kk'> 추정 나이 </label><input id='age' type="number" className='input_text' placeholder={dog.Age} onChange={changeAge} />
                </div>
                <hr />
                <div className='input_div'>
                    <label htmlFor='chip_number' className='kk'> 칩번호 </label><input id='chip_number' type="text" placeholder={dog.ChipNumber} className='input_text' onChange={changeChipNumber} />
                </div>
                <hr />
                <div className='input_div'>
                    <label htmlFor='image' className='kk'> 사 진 </label>
                    {PreviewImage && <img src={PreviewImage} alt="미리보기" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                    <input id='image' type="file" accept="image/*" className='input_text' onChange={changeImage} style={{ width: '200px' }} />

                </div>
                <hr />
                <div className='input_div'>
                    <label htmlFor='breed' className='kk'> 견 종 </label><input id='breed' type="text" placeholder={dog.Breed} className='input_text' onChange={changeBreed} />
                </div>
                <hr />
                <div className='input_div'>
                    <label htmlFor='remained_day' className='kk'> 남은 날짜 </label><input id='remained_day' type="number" placeholder={dog.RemainedDay} className='input_text' onChange={changeRemainedDay} />
                </div>
                <hr />
                <div className='input_div'>
                    <div className='kk'>크기</div>
                    <div>
                        <input onChange={changeDogSize} checked={DogSize === 'small'} className="btn-check" type="radio" name="size" value="small" id="small" /><label htmlFor="small" className="btn btn-outline-secondary">소형견</label>
                        <input onChange={changeDogSize} checked={DogSize === 'medium'} className="btn-check" type="radio" name="size" value="medium" id="medium" /><label htmlFor="medium" className="btn btn-outline-secondary">중형견</label>
                        <input onChange={changeDogSize} checked={DogSize === 'large'} className="btn-check" type="radio" name="size" value="large" id="large" /><label htmlFor="large" className="btn btn-outline-secondary">대형견</label>
                    </div>
                </div>
                <hr />
                <div className='input_div'>
                    <label htmlFor='weight' className='kk'> 무 게 </label><input id='weight' type="number" className='input_text' placeholder={dog.Weight} onChange={changeWeight} />
                </div>
                <hr />
                <div className='input_div'>
                    <label htmlFor='status' className='kk'>상태</label>
                    <select id='status' className='input_text' style={{ width: '220px' }} onChange={changeStatus}>
                        <option value='stray'>stray</option>
                        <option value='adopted'>adopted</option>
                        <option value='Dead'>Dead</option>
                    </select>
                </div>
                <hr />
                <div className='input_div'>
                    <label htmlFor='entered_day' className='kk'> 입소 날짜 </label><input id='entered_day' className='input_text' type="date" min="2000-01-01" max="2100-12-31" style={{ width: '220px' }} placeholder={dog.EnteredDay} onChange={changeEnteredDay} />
                </div>
                <hr />
                <div className='input_div'>
                    <label htmlFor='discovered_place'> 발견 장소 </label><input id='discovered_place' className='input_text' type="text" placeholder={dog.DiscoveredPlace} onChange={changeDiscoveredPlace} />
                </div>
                <hr />
                <div className='input_div'>
                    <label htmlFor='discovered_place'> 추가 내용 </label><textarea id='discovered_place' className='input_text' type="text" placeholder={dog.Comment} onChange={changeComment} />
                </div>
                <hr />

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '10px' }}>
                    <button className="btn btn-secondary" onClick={Update} style={{ width: '200px', height: '50px' }}>수정 완료</button>
                </div>
            </div>
        </div>
    );
};


export default StraydogUpdate