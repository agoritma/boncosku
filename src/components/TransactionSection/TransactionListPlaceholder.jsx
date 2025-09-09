import './style/TransactionListPlaceholder.css'

const TransactionListPlaceholder = () => {
    const transactionItemComponent = (key) => {
        return (
            <div key={key} className="transaction-item flex">
                <div className="transaction-icon">
                    <div className="transaction-icon-container"></div>
                </div>
                <div className="transaction-info flex flex-col"></div>
                <div className="transaction-amount flex flex-col"></div>
            </div>
        )
    }

    return (
        <div className="transaction-list placeholder flex flex-col">
            {Array.from({ length: 15}).map((_, index) => transactionItemComponent(index))}
        </div>
    )
}

export default TransactionListPlaceholder