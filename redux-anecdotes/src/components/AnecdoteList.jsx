import { useSelector, useDispatch } from "react-redux"
import { voteFor } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import Notification from "./Notification"

const AnecdoteList = () => {

	const anecdoteList = useSelector(({filter, anecdotes}) => {
		return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
	})

  	const dispatch = useDispatch()

	const handleClik = (id, content) => {

		dispatch(setNotification(`you voted '${content}'`))

		dispatch(voteFor(id))

		setTimeout(() => {
			dispatch(setNotification(''))
		}, 5000)
	}

	return (
		<div>
			<Notification />
			{anecdoteList.map(anecdote =>
				<div key={anecdote.id}>
				<div>
					{anecdote.content}
				</div>
				<div>
					has {anecdote.votes}
					<button onClick={() => handleClik(anecdote.id, anecdote.content)}>vote</button>
				</div>
				</div>
			)}
		</div>
	)
}

export default AnecdoteList
