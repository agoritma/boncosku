import supabaseFetchTransaction from "../../api/supabaseFetchTransaction"

const TransactionListInfo = ({ text, fetchMoreTransaction=false, setTransaction, setIsAllTransaction, setIsloading }) => {
    const handleMoreTransaction = async () => {
        setIsloading(true)
        const { data: transactionsData, error: transactionsError } = await supabaseFetchTransaction()
        setTransaction(transactionsData)
        setIsAllTransaction(true)
        setIsloading(false)
    }

    return (
        <div className="list-info flex flex-col flex-align-center round-15" style={{gap: "10px", color: 'grey'}}>
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