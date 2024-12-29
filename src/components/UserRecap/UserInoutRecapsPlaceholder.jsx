const UserInoutRecapsPlaceholder = () => {
    return (
        <div className="inout-recaps round-15 flex flex-space-between pad-22">
            <div className="inout-section flex flex-col">
                <div className="in">
                    <span className='flex flex-align-center'>
                        Your Income
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-82.7L342.6 374.6c-12.5 12.5-32.8 12.5-45.3 0L192 269.3 54.6 406.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160c12.5-12.5 32.8-12.5 45.3 0L320 306.7 466.7 160 384 160z"/></svg>
                    </span>
                    <p className='flex'>
                        Loading...
                    </p>
                </div>
                <div className="out">
                    <span className='flex flex-align-center'>
                        Your Outcome
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M384 352c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0c17.7 0 32-14.3 32-32l0-160c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 82.7L342.6 137.4c-12.5-12.5-32.8-12.5-45.3 0L192 242.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0L320 205.3 466.7 352 384 352z"/></svg>
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