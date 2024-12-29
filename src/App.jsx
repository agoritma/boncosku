import { useState, useEffect } from 'react'
import supabaseAuth from './api/supabaseAuth'
import supabaseFetchTransaction from './api/supabaseFetchTransaction'
import supabaseFetchUserInfo from './api/supabaseFetchUserInfo'
import UserRecaps from './components/UserRecap/Index'
import TransactionSection from './components/TransactionSection/Index'
import TransactionFormContainer from './components/TransactionForm/Index'
import calculateRecaps from './utils/calculateRecaps'
import './App.css'

function App() {
	const [userTransactions, setUserTransactions] = useState([])
	const [userInfo, setUserInfo] = useState(null)
	const [userRecaps, setUserRecaps] = useState(null)

	useEffect(() => {
		const initializeApp = async () => {
			try {
				await supabaseAuth()
				const { data: transactionsData, error: transactionsError } = await supabaseFetchTransaction()
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
		initializeApp()
	}, [])

	useEffect(() => {
		if (userTransactions.length > 0) {
			const recaps = calculateRecaps(userTransactions)
			setUserRecaps(recaps)
		}
	}, [userTransactions])

	return (
		<main>
			<aside className='user-section flex flex-col'>
				<UserRecaps userInfo={userInfo} userRecaps={userRecaps} />
				<TransactionFormContainer transactionsList={userTransactions} updateTransactionList={setUserTransactions} userInfo={userInfo} />
			</aside>
			<TransactionSection setTransactions={setUserTransactions} transactions={userTransactions}/>
		</main>
	)
}

export default App
