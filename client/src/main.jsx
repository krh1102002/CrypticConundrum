import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import axios from 'axios'

if(localStorage.crypticToken){
  const {token} = JSON.parse(localStorage.crypticToken)
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
