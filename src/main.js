import 'babel-polyfill'

import React,{Fragment} from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import './utils/fontset.js'
import './static/css/reset.css'
import './static/fonts/iconfont.css'
import './static/css/goodsItem.less'
import {Provider} from 'react-redux'
import store from './store/store'
console.log(process.env)
ReactDOM.render(<Provider store={store}><App/></Provider>,document.querySelector("#root"))