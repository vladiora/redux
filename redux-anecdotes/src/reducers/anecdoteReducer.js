import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0
	}
}

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {

		createAnecdote(state, action) {

			state.push(action.payload)
	  	},

		voteFor(state, action) {

			const changedAnecdote = action.payload

			return state.map(anecdote =>
				anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
			)
		},

		addAnecdote(state, action) {
			state.push(action.payload)
		},

		setAnecdotes(state, action) {
			return action.payload
		}
	},
})

export const { createAnecdote, voteFor, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initialStateAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createNew = (content) => {
	return async dispatch => {
		const anecdote = await anecdoteService.createNew(content)
		dispatch(createAnecdote(anecdote))
	}
}

export const addVote = (anecdote) => {
	return async dispatch => {
		const updatedAnecdote = await anecdoteService.update(anecdote.id, {...anecdote, votes: anecdote.votes + 1})
		dispatch(voteFor(updatedAnecdote))
	}
}

export default anecdoteSlice.reducer
