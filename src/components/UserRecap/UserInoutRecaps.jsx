import { useState, useEffect } from 'react';
import moneyFormat from '../../utils/moneyFormat';
import RecapsAmount from './RecapsAmount';
import EyeIcon from '../../assets/icon/EyeIcon';
import EyeIconSlash from '../../assets/icon/EyeIconSlash';

const UserInoutRecaps = ({balanceInfo, balanceHide}) => {
    const [networthHide, setNetworthHide] = useState(balanceHide);
    const [tempIncomeBalance, setTempIncomeBalance] = networthHide ? useState('*******') : useState(moneyFormat(balanceInfo.incomeBalance));
    const [tempOutcomeBalance, setTempOutcomeBalance] = networthHide ? useState('*******') : useState(moneyFormat(balanceInfo.outcomeBalance));

    useEffect(() => {
        if (networthHide) {
            setTempIncomeBalance('*******');
            setTempOutcomeBalance('*******');
        } else {
            setTempIncomeBalance(moneyFormat(balanceInfo.incomeBalance));
            setTempOutcomeBalance(moneyFormat(balanceInfo.outcomeBalance));
        }
    }, [balanceInfo, networthHide]);

    return (
        <div className="inout-recaps round-15 flex flex-space-between pad-22">
            <div className="inout-section flex flex-col">
                <RecapsAmount balance={tempIncomeBalance} percentage={balanceInfo.incomePercentage} networthHide={networthHide} recap={"in"} />
                <RecapsAmount balance={tempOutcomeBalance} percentage={balanceInfo.outcomePercentage} networthHide={networthHide} recap={"out"} />
            </div>
            <div className="button-section">
                {networthHide ? <EyeIconSlash className={"button"} onClick={() => setNetworthHide(!networthHide)} /> : <EyeIcon className={"button"} onClick={() => setNetworthHide(!networthHide)} /> }
            </div>
        </div>
    )
}

export default UserInoutRecaps;