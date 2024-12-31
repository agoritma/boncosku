import TrafficUp from "../../assets/icon/TrafficUp"
import TrafficDown from "../../assets/icon/TrafficDown"

const TransactionFilter = ({ categoryFilter, amountFilter, setCategoryFilter, setTimeFilter, timeFilter, setAmountFilter, setStartDateFilter, startDateFilter, setEndDateFilter }) => {
    return (
        <div className="filter-section flex">
            {categoryFilter !== null ?
                (categoryFilter === 'income' ?
                    <button className="button button-box flex selected" onClick={() => setCategoryFilter('outcome')}>
                        <TrafficUp />
                        Income
                    </button>
                    :
                    <button className="button button-box flex selected" onClick={() => setCategoryFilter(null)}>
                        <TrafficDown />
                        Expense
                    </button>
                )
            :
            <button className="button button-box flex" onClick={() => setCategoryFilter('income')}>
                <TrafficUp />
                Income
            </button>
            }
            <button className="button button-box selected" onClick={() => setTimeFilter(timeFilter === 'newest' ? 'oldest' : 'newest')}>{timeFilter === 'newest' ? 'Newest' : 'Oldest'}</button>
            {amountFilter !== null ? 
                (amountFilter === 'highest' ?
                    <button className="button button-box selected" onClick={() => setAmountFilter('lowest')}>Highest</button>
                    :
                    <button className="button button-box selected" onClick={() => setAmountFilter(null)}>Lowest</button>
                )
            : <button className="button button-box" onClick={() => setAmountFilter('highest')}>Highest</button>}
            <div className="date-filter">
                <input aria-label="startdate-filter" className="button-box" type="date" onChange={(e) => setStartDateFilter(e.target.value)} />
                <span> - </span>
                <input aria-label="enddate-filter" className="button-box" type="date" min={startDateFilter} onChange={(e) => setEndDateFilter(e.target.value)} />
            </div>
        </div>
    )
}

export default TransactionFilter