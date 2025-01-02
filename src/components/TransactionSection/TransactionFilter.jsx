import TrafficUp from '../../assets/icon/TrafficUp'
import TrafficDown from '../../assets/icon/TrafficDown'

const TransactionFilter = ({ categoryFilter, amountFilter, setCategoryFilter, setTimeFilter, timeFilter, setAmountFilter, setStartDateFilter, startDateFilter, setEndDateFilter }) => {
    return (
        <div className="filter-section flex">
            <div className="filter flex">
                {categoryFilter !== null ?
                    (categoryFilter === 'income' ?
                        <button className="button button-box flex selected" onClick={() => setCategoryFilter('outcome')}>
                            <TrafficUp />
                            <span>Income</span>
                        </button>
                        :
                        <button className="button button-box flex selected" onClick={() => setCategoryFilter(null)}>
                            <TrafficUp />
                            <span>Expense</span>
                        </button>
                    )
                    :
                <button className="button button-box flex" onClick={() => setCategoryFilter('income')}>
                    <TrafficUp />
                    <span>Income</span>
                </button>
                }
                <button className="button button-box flex selected" onClick={() => setTimeFilter(timeFilter === 'newest' ? 'oldest' : 'newest')}><span>{timeFilter === 'newest' ? 'Newest' : 'Oldest'}</span></button>
                {amountFilter !== null ? 
                    (amountFilter === 'highest' ?
                        <button className="button button-box flex selected" onClick={() => setAmountFilter('lowest')}><span>Highest</span></button>
                        :
                        <button className="button button-box flex selected" onClick={() => setAmountFilter(null)}><span>Lowest</span></button>
                    )
                : <button className="button button-box flex" onClick={() => setAmountFilter('highest')}><span>Highest</span></button>}
            </div>
            <div className="date-filter flex">
                <input aria-label="startdate-filter" className="button-box" type="date" onChange={(e) => setStartDateFilter(e.target.value)} />
                <span> - </span>
                <input aria-label="enddate-filter" className="button-box" type="date" min={startDateFilter} onChange={(e) => setEndDateFilter(e.target.value)} />
            </div>
        </div>
    )
}

export default TransactionFilter