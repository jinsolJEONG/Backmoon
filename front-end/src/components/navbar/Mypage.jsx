import DogInfoShow from '../admin/doginfoShow'
import ReservationShow from '../admin/reservationShow'
import UserInfoShow from '../admin/userinfoShow'
import Userpage from './Userpage'

const Mypage = () => {
    const admin = localStorage.getItem('admin');
    return (
        <div>
            {admin === '0'
            ?   <Userpage />
            :   <div>
                    <DogInfoShow />
                    <ReservationShow/>
                    <UserInfoShow/>
                </div>
        }
        </div>
    );
};
export default Mypage