import UserInoutRecaps from './UserInoutRecaps';
import UserInoutRecapsPlaceholder from './UserInoutRecapsPlaceholder';
import getDayGreeting from '../../utils/getDayGreeting';

const Recaps = ({userInfo, userRecaps}) => {
    return (
		<div className="recaps flex flex-col container container-black round-15 pad-22">
			<div className="menu flex flex-align-center flex-space-between">
				<h1 className='app-name'>Boncos<span>Ku</span></h1>
				<div className="user">
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