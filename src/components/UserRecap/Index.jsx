import userImageDefault from '../../assets/images/defaultAvatar.jpg'
import UserInoutRecaps from './UserInoutRecaps';
import UserInoutRecapsPlaceholder from './UserInoutRecapsPlaceholder';
import supabaseFetchUserProfile from '../../api/supabaseFetchUserProfile';
import getDayGreeting from '../../utils/getDayGreeting';
import { useState, useEffect } from 'react';

const Recaps = ({userInfo, userRecaps}) => {
	const [userAvatar, setUserAvatar] = useState(null)

	useEffect(() => {
		if (userInfo) {
			const fetchUserProfile = async () => {
				const userProfile = await supabaseFetchUserProfile(userInfo.user_id)
				setUserAvatar(userProfile.publicUrl)
			}
			fetchUserProfile()
		}
	}, [userInfo])

    return (
		<div className="recaps flex flex-col container container-black round-15 pad-22">
			<div className="menu flex flex-align-center flex-space-between">
				<h1 className='app-name'>Boncos<span>Ku</span></h1>
				<div className="user">
				{userInfo ? <img className='button' src={userAvatar} alt="user" /> : <img className='button' src={userImageDefault} alt="user" /> }
				</div>
			</div>

			<div className="recaps-text">
				{userInfo ? <p>Good {getDayGreeting()}, <span>{userInfo.full_name.split(" ")[0]}</span><br></br>There is your monthly recaps.</p> : <p>Loading...</p> }
			</div>

			{userInfo && userRecaps ? 
				<UserInoutRecaps
					balanceHide={userInfo.balance_hide}
					balanceInfo={userRecaps.balanceStatus} />
				: <UserInoutRecapsPlaceholder />
			}
		</div>
    );
}

export default Recaps;