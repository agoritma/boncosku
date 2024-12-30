import MagnifierIcon from "../../assets/icon/MagnifierIcon"

const TranscationSearch = ({ setSearch }) => {
    return (
        <div className="input-section">
            <input type="text" placeholder="Search Transaction" onChange={(e) => setSearch(e.target.value)}/>
            <span>
                <MagnifierIcon />
            </span>
        </div>
    )
}

export default TranscationSearch