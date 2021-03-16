import React, { useEffect, useState } from 'react'
import ReplySelector from './components/ReplySelector'

const App = () => {

  let [replies, setReplies] = useState([])

  useEffect(() => {
    fetch('/replies')
      .then(response => response.json())
      .then(data => setReplies(data))
  }, [])

  return(
    <div>
      <ReplySelector replies={replies}/>
    </div>
  )
}

export default App