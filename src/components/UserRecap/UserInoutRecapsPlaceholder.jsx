import TrafficDown from "../../assets/icon/TrafficDown";
import TrafficUp from "../../assets/icon/TrafficUp";

const UserInoutRecapsPlaceholder = () => {
    return (
        <div className="inout-recaps round-15 flex flex-space-between pad-22">
            <div className="inout-section flex flex-col">
                <div className="in">
                    <span className='flex flex-align-center'>
                        Your Income
                        <TrafficUp />
                    </span>
                    <p className='flex'>
                        Loading...
                    </p>
                </div>
                <div className="out">
                    <span className='flex flex-align-center'>
                        Your Expense
                        <TrafficDown />
                    </span>
                    <p className='flex'>
                        Loading...
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserInoutRecapsPlaceholder;