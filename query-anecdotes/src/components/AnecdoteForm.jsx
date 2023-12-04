import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationrDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationrDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {

      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))

      // set notification
      dispatch({type: 'SET', message: `anecdote '${newAnecdote.content}' created`})
      setTimeout(() => {dispatch({type: 'CLEAR'})}, 5000)
    },
    onError: (err) => {

      // set error notification
      dispatch({type: 'SET', message: err.response.data.error})
      setTimeout(() => {dispatch({type: 'CLEAR'})}, 5000)
    }
  })

  const onCreate = (event) => {

    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
