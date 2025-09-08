import { useState, useEffect } from 'react'
import supabaseAuth from './api/supabaseAuth'
import supabaseFetchTransaction from './api/supabaseFetchTransaction'
import supabaseFetchUserInfo from './api/supabaseFetchUserInfo'
import UserRecaps from './components/UserRecap/Index'
import TransactionSection from './components/TransactionSection/Index'
import TransactionFormContainer from './components/TransactionForm/Index'
import calculateRecaps from './utils/calculateRecaps'
import RecapChart from './components/RecapChart/index'
import './App.css'

function App() {
	const [userTransactions, setUserTransactions] = useState([])
	const [userInfo, setUserInfo] = useState(null)
	const [userRecaps, setUserRecaps] = useState(null)
	const [showTransactionForm, setShowTransactionForm] = useState(false)

	const initializeApp = async () => {
		try {
			await supabaseAuth()
			const date = new Date();
			const month = String(date.getMonth() + 1).padStart(2, '0')
			const lastDate = `${date.getFullYear()-1}-${month}-01T00:00`
			const { data: transactionsData, error: transactionsError } = await supabaseFetchTransaction(lastDate)
			if (transactionsError) throw transactionsError
			setUserTransactions(transactionsData)

			if (userTransactions.length > 0) {
				const recaps = calculateRecaps(transactionsData)
				setUserRecaps(recaps)
			}
			
			const { data: userInfoData, error: userInfoError } = await supabaseFetchUserInfo()
			if (userInfoError) throw userInfoError
			setUserInfo(userInfoData[0])
		} catch (error) {
			console.error('Error initializing app:', error)
		}
	}

	useEffect(() => {
		initializeApp()
	}, [])

	useEffect(() => {
		if (userTransactions.length > 0) {
			const recaps = calculateRecaps(userTransactions);
			setUserRecaps(recaps);
		} else {
			const dummyRecaps = {
				balanceStatus: {
					balance: 0,
					incomeBalance: 0,
					outcomeBalance: 0,
					incomePercentage: {
						status: 'up',
						amount: 0
					},
					outcomePercentage: {
						status: 'down',
						amount: 0
					}
				}
			}
			setUserRecaps(dummyRecaps)
		}
	}, [userTransactions])

	return (
		<>
		<main>
			<aside className='user-section flex flex-col'>
				<UserRecaps
				userInfo={userInfo}
				userRecaps={userRecaps} />
				<RecapChart transactionData={userTransactions}/>
			</aside>
			<TransactionSection
				setTransactions={setUserTransactions}
				setShowTransactionForm={setShowTransactionForm}
				transactions={userTransactions}
			/>
			<div className="white-bar"></div>
		</main>
		{ showTransactionForm && (
			<>
			<div className="overlay" onClick={() => setShowTransactionForm(false)} />
			{ showTransactionForm && (
				<TransactionFormContainer
				transactionsList={userTransactions}
				updateTransactionList={setUserTransactions}
				userInfo={userInfo}
				setShowTransactionForm={setShowTransactionForm}
				/>
			)}
			</>
		)}
		</>
	)
}

export default App
