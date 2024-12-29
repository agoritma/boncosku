import ArrowUp from "../../assets/icon/ArrowUp";
import ArrowDown from "../../assets/icon/ArrowDown";
import TrafficUp from "../../assets/icon/TrafficUp";
import TrafficDown from "../../assets/icon/TrafficDown";

const RecapsAmount = ({balance, percentage, networthHide, recap}) => {
    return (
        <div className={recap}>
            <span className='flex flex-align-center'>
                {recap === "in" ? <>Your Income <TrafficUp /></> : <>Your Expenses <TrafficDown /></>}
            </span>
            <p className='flex'>
                Rp {balance}
                {networthHide ? null :
                    <span className='percentage flex'>
                        {percentage.status == 'up' ? <ArrowUp /> : <ArrowDown />}
                        {percentage.amount}%
                    </span>
                }
            </p>
        </div>
    )
}

export default RecapsAmount;