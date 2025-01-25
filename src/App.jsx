import { useReducer } from 'react'
import './App.css'
import ChessBoard from './components/ChessBoard/ChessBoard'
import AppContext from './contexts/context'
import { reducer } from './reducer/reducer'
import { initGameState } from './constant'

function App() {
  const [appState,dispatch] = useReducer(reducer,initGameState)
  const providerState = {
    appState,
    dispatch
  }
  return (
    <AppContext.Provider value={providerState}>
      <div className='App'>
        <ChessBoard></ChessBoard>
      </div>
    </AppContext.Provider>
  )
}

export default App
