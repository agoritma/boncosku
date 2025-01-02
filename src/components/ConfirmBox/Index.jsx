import './ConfirmBox.css'
import DangerIcon from '../../assets/icon/DangerIcon'
import { useEffect } from 'react';

const ConfirmBox = ({ type, message, isConfirmation, onConfirm, onCancel }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);
    
    return (
        <div className="overlay">
            <div className="confirm-box flex flex-col">
                <div className="message-section flex flex-col">
                    {type === "warning" && <DangerIcon />}
                    <p>{message}</p>
                </div>
                <div className="button-section flex">
                    {isConfirmation && <button className={"button button-box"} onClick={onCancel}>Cancel</button>}
                    <button className={`button button-box ${isConfirmation ? 'danger' : ''}`} onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmBox