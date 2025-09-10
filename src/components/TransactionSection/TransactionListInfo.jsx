import supabaseFetchTransaction from "../../api/supabaseFetchTransaction"

const TransactionListInfo = ({ text, fetchMoreTransaction=false, setTransaction, setIsAllTransaction }) => {
    const handleMoreTransaction = async () => {
        const { data: transactionsData, error: transactionsError } = await supabaseFetchTransaction()
        setTransaction(transactionsData)
        setIsAllTransaction(true)
    }

    return (
        <div className="list-info flex flex-col flex-align-center round-15" style={{gap: "10px", height: '100px', color: 'grey'}}>
            <span>{text}</span>

            {fetchMoreTransaction && 
                <div className="button-container">
                    <div className="button button-box flex selected" onClick={handleMoreTransaction} style={{color: "black"}}>
                        Load all transactions
                    </div>
                </div>
            }
        </div>
    )
}

export default TransactionListInfo