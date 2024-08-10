import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Context } from './context/Context.jsx'
import run from './config/gemini.js'
import { useState } from 'react'

function Index() {
  
  const [input, setInput] = useState(""); // to save the input data
  const [recentPrompt, setRecentPrompt] = useState(""); // prompt to be displayed on screen
  const [prevPrompts, setPrevPrompts] = useState([]) // store input history
  const [showResult,setShowResult] = useState(false); // hide boilerplate of the gemini clone (text and cards)
  const [loading, setLoading] = useState(false); // for loading animation
  const [resultData, setResultData] = useState(""); // to display the result on the web page

  const newChat = () =>{
    setLoading(false)
    setShowResult(false)
  }
  const onSent = async(prompt) =>{

    setInput("")
    setResultData("")
    setLoading(true)
    setShowResult(true)
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt)
    }
    else {
      setPrevPrompts(prev=>[...prev,input])
      setRecentPrompt(input)
      response = await run(input)
    }
    
    setResultData(response);
    setLoading(false)
  }
  
const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
}
return (
  <Context.Provider value={contextValue}>
    <App />
  </Context.Provider>
)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Index />
  </StrictMode>
)
