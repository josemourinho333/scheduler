import { useState } from 'react'

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial])

  function transition(next, replace=false) {

    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), next])
    } else {
      setHistory(prev => [...prev, next])
    }
  }

  function back() {
    if (history.length < 2) {
      return;
    } 

    setHistory(prev => [...prev.slice(0, -1)])
  }
  
  const mode = history[history.length - 1]

  return { mode, transition, back }
}