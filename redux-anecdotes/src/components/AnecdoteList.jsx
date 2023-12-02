import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import Notification from "./Notification"

const AnecdoteList = () => {

	const anecdoteList = useSelector(({filter, anecdotes}) => {
		return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
	})

  	const dispatch = useDispatch()

	const handleClick = (anecdote) => {

		dispatch(setNotification(`you voted '${anecdote.content}'`, 5))

		dispatch(addVote(anecdote))
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
					<button onClick={() => handleClick(anecdote)}>vote</button>
				</div>
				</div>
			)}
		</div>
	)
}

export default AnecdoteList
