import ArrowUp from "../../assets/icon/ArrowUp";
import ArrowDown from "../../assets/icon/ArrowDown";
import TrafficUp from "../../assets/icon/TrafficUp";
import TrafficDown from "../../assets/icon/TrafficDown";
import WalletIcon from "../../assets/icon/walletIcon";

const RecapsAmount = ({balance, percentage, networthHide, recap, isIncome}) => {
    return (
        <div className={recap}>
            <span className='flex flex-align-center'>
                {isIncome === "balance" && <><WalletIcon style={{width: "12px"}}/> Your Balance</>}
                {isIncome === true && <><TrafficUp /> Your Income </>}
                {isIncome === false && <><TrafficDown /> Your Expense</>}
            </span>
            <p className='flex'>
                Rp {balance}
                {networthHide || !percentage ? null :
                    <span className='percentage flex'>
                        {percentage.status === 'up' ? <ArrowUp /> : <ArrowDown />}
                        {percentage.amount}%
                    </span>
                }
            </p>
        </div>
    )
}

export default RecapsAmount;