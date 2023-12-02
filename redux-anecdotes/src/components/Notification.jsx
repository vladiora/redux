import { useSelector } from 'react-redux'

const Notification = () => {

  const notif = useSelector(({notification}) => {
    return notification
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notif) {
    return (
      <div style={style}>
        {notif}
      </div>
    )
  }

}

export default Notification