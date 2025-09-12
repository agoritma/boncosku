import moneyFormat from "../../utils/moneyFormat"
import supabaseDelTransaction from "../../api/supabaseDelTransaction"
import TrashIcon from "../../assets/icon/TrashIcon";
import TrafficUp from "../../assets/icon/TrafficUp";
import TrafficDown from "../../assets/icon/TrafficDown";
import ConfirmBox from "../ConfirmBox/Index"
import React, { useCallback, useEffect, useRef, useState } from "react";
import TransactionListInfo from "./TransactionListInfo";
import TransactionItemPlaceholder from "./TransactionItemPlaceholder";

const TransactionItem = React.memo(function TransactionItem({ transaction, onDelete, moneyFormat }) {
    return (
        <>
        <div key={transaction.id} className="transaction-item flex">
            <div className="transaction-icon button" onClick={() => onDelete(transaction)}>
                {transaction.transaction_category === 'income' ?
                    (<div className="transaction-icon-container income">
                        <TrashIcon className={'delete-icon'} />
                        <TrafficUp />
                    </div>) :
                    (<div className="transaction-icon-container outcome">
                        <TrashIcon className={'delete-icon'} />
                        <TrafficDown />
                    </div>)
                }
            </div>
            <div className="transaction-info flex flex-col">
                <span className="transaction-note">{transaction.transaction_note}</span>
                <span className="transaction-date">
                    {new Date(transaction.transaction_date)
                    .toLocaleString("id-ID", {
                    timeStyle: "short",
                    dateStyle: "short",
                    timeZone: "UTC"
                    })}
                </span>
            </div>
            <div className="transaction-amount flex flex-col">
                <span>
                    {transaction.transaction_category === 'income' ?
                        (<span className="amount-income">+ </span>) :
                        (<span className="amount-outcome">- </span>)}
                    {moneyFormat(transaction.transaction_amount)}
                </span>
                <span className="transaction-category">
                    {transaction.transaction_purpose !== '-' && transaction.transaction_purpose}
                </span>
            </div>
        </div>
        <hr className="separator"/>
        </>
    )
})

const TransactionList = ({ transactions=[], tempTransactions=[], setTransaction, setTempTransactions, userInfo }) => {
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState(null);

    const BATCH = 50;
    const [visibleCount, setVisibleCount] = useState(Math.min(BATCH, tempTransactions.length))
    const [isLoading, setIsLoading] = useState(false)
    const sentinelRef = useRef(null)

    const [isAllTransaction, setIsAllTransaction] = useState(false)

    useEffect(() => {
        setVisibleCount(Math.min(BATCH, tempTransactions.length))
    }, [tempTransactions.length])

    useEffect(() => {
        const sentinel = sentinelRef.current
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isLoading && visibleCount < tempTransactions.length) {
                        setIsLoading(true)
                        setVisibleCount((prev) => Math.min(prev + BATCH, tempTransactions.length))
                        setIsLoading(false)
                    }
                })
            },
            {
                root: null,
                rootMargin: "300px",
                threshold: 0.1
            }
        )

        observer.observe(sentinel)
        return () => observer.disconnect();
    }, [isLoading, visibleCount, tempTransactions.length])
    
    const handleDeleteClick = (transaction) => {
        setTransactionToDelete(transaction);
        setShowConfirmBox(true);
    }

    const stableDelete = useCallback((t) => handleDeleteClick(t), [handleDeleteClick])

    const confirmDeleteTransaction = async () => {
        const updatedTransactions = transactions.filter(transaction => transaction.id !== transactionToDelete.id);
        setTransaction(updatedTransactions)
        setTempTransactions(updatedTransactions)
        setShowConfirmBox(false);
        setTransactionToDelete(null);
        const { error } = await supabaseDelTransaction(transactionToDelete.id);
        if (error) {
            console.error('Error deleting transaction:', error);
            return;
        }
    }

    const cancelDeleteTransaction = () => {
        setShowConfirmBox(false);
        setTransactionToDelete(null);
    }

    return (
        <div className="transaction-list flex flex-col">
            {tempTransactions.slice(0, visibleCount).map((t) => (
                <TransactionItem key={t.id} transaction={t} onDelete={stableDelete} moneyFormat={moneyFormat} />
            ))}
            {!userInfo && <TransactionItemPlaceholder len={15}/>}
            {transactions.length === 0 ?
                (
                    <>
                        {!isAllTransaction ?
                            <TransactionListInfo
                            text={"There nothing here! try add some transaction or feel like you can't find your transaction?"}
                            fetchMoreTransaction={true} setTransaction={setTransaction} setIsAllTransaction={setIsAllTransaction} setIsloading={setIsLoading} />
                            :
                            <TransactionListInfo
                            text={"There nothing here! try add some transaction"} />
                        }
                    </>
                ): null }
            {!isAllTransaction ? (
                <>
                    {visibleCount >= transactions.length && transactions.length !== 0 ? (
                        <>
                            {isLoading ?
                                <TransactionItemPlaceholder len={5} />
                                :
                                <TransactionListInfo
                                    text={"We only show transactions from the last 1 year, feel like you can't find your transaction?"}
                                    fetchMoreTransaction={true}
                                    setTransaction={setTransaction}
                                    setIsAllTransaction={setIsAllTransaction}
                                    setIsloading={setIsLoading}
                                />
                            }
                        </>
                    ) : null}
                    {transactions.length !== 0 && tempTransactions.length === 0 ? (
                        <>
                            {isLoading ?
                                <TransactionItemPlaceholder len={5} />
                                :   
                                <TransactionListInfo
                                    text={"We only show transactions from the last 1 year, feel like you can't find your transaction?"}
                                    fetchMoreTransaction={true}
                                    setTransaction={setTransaction}
                                    setIsAllTransaction={setIsAllTransaction}
                                    setIsloading={setIsLoading}
                                />
                            }
                        </>
                    ) : null}
                </>
            ) : (
                <>
                    {transactions.length !== 0 && tempTransactions.length === 0 ? <TransactionListInfo text={"There nothing here! try add some transaction"} /> : null}
                    {visibleCount >= transactions.length && transactions.length !== 0 ? <TransactionListInfo text={"There nothing left!"} /> : null}
                </>
            )}
            <span ref={sentinelRef} style={{height: '1px'}} />
            {showConfirmBox && (
                <ConfirmBox 
                    type={'warning'}
                    message={`Are you sure want to delete transaction "${transactionToDelete.transaction_note}"?`}
                    isConfirmation={true}
                    onConfirm={confirmDeleteTransaction}
                    onCancel={cancelDeleteTransaction}
                />
            )}
        </div>
    )
}

export default TransactionList