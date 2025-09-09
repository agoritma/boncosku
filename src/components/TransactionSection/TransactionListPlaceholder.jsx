import './style/TransactionListPlaceholder.css'

export const TransactionListPlaceholder = ({ len }) => {
    const TransactionItemComponent = (key) => {
        return (
            <div key={key} className="transaction-item placeholder flex">
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
            {Array.from({ length: len }).map((_, index) => TransactionItemComponent(index))}
        </div>
    )
}

export default TransactionListPlaceholder