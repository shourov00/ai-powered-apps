import { useEffect, useState } from 'react'
import { Button } from './components/ui/button'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  }, [])

  return (
    <div className={'space-y-4 p-8'}>
      <p className={'font-bold text-3xl'}>{message}</p>
      <Button>Click Me</Button>
    </div>
  )
}

export default App
