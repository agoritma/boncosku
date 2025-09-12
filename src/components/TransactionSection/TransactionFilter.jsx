import TrafficUp from '../../assets/icon/TrafficUp'
import TrafficDown from '../../assets/icon/TrafficDown'
import transactionPurposeList from '../../utils/transactionPurposeList'

const PurposeList = transactionPurposeList()

const TransactionFilter = ({ categoryFilter, amountFilter, setCategoryFilter, purposeFilter, setPurposeFilter, setTimeFilter, timeFilter, setAmountFilter, setStartDateFilter, startDateFilter, setEndDateFilter, endDateFilter }) => {
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
                            <TrafficDown />
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
                <select name="purpose-filter" id="purpose-filter" defaultValue='*' onChange={(e) => setPurposeFilter(e.target.value)} className={`button button-box ${purposeFilter !== '*'}`}>
                    <option value='*'>All</option>
                    {PurposeList.map(p => (
                        <option value={p.key} key={p.key}>{p.label}</option>
                    ))}
                </select>
            </div>
            <div className="date-filter flex">
                <input name="startdate-filter" className="button-box" type="date" max={endDateFilter} onChange={(e) => setStartDateFilter(e.target.value)} />
                <span> - </span>
                <input name="enddate-filter" className="button-box" type="date" min={startDateFilter} onChange={(e) => setEndDateFilter(e.target.value)} />
            </div>
        </div>
    )
}

export default TransactionFilter