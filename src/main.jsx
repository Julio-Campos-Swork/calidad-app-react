import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
window.axios = axios

window.axios.defaults.baseURL =
  'http://192.168.0.110/calidad-restapi/public/api/'
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.withCredentials = true
// window.axios.defaults.headers.common["Accept"] = "application/json";
// window.axios.defaults.headers.common["Content-Type"] = "application/json";
window.axios.defaults.headers.common['APP-VERSION'] = '0.5.8'
window.appVersion = window.axios.defaults.headers.common['APP-VERSION']
window.filePath = 'http://192.168.0.110/calidad-restapi/files/'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
