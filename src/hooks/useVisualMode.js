import React, { useState } from 'react'

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  function transition(next, replace=false) {
    if (replace) {
      history.splice(history.length - 1, 1, next)
      setMode(next)
    } else {
      history.push(next)
      setMode(next)
    }
  }

  function back() {
    if (history.length > 1) {
      history.pop()
      setHistory(history)
      setMode(history[history.length - 1])
    } else {
      setMode(initial)
    }
  }

  return { mode, transition, back }
}