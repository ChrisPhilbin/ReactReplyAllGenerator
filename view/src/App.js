import React, { useEffect, useState } from 'react'
import ReplySelector from './components/ReplySelector'

const App = () => {

  let [replies, setReplies] = useState([])

  useEffect(() => {
    fetch('https://sleepy-plateau-48238.herokuapp.com/https://us-central1-replyallgenerator.cloudfunctions.net/api/replies', {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setReplies(data))
      .catch(error => console.log(error, "Something went wrong when fetching all reply objects"))
  }, [])

  return(
    <div>
      <ReplySelector replies={replies}/>
    </div>
  )
}

export default App