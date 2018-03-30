import React,{Component} from 'react'
import ReactDOM from 'react-dom'

import Toast from 'react-toast-mobile';

import {BrowserRouter,Route,Redirect,Switch,Link,NavLink} from 'react-router-dom'
import router from './router/router.config'
import RouteWrapper from './components/router'


class App extends Component{
    render(){
        return <div>
            <Toast></Toast>
            <BrowserRouter>
                <Switch>
                    <Redirect exact from="/" to="/index/home"></Redirect>
                    <RouteWrapper routers={router.routers}></RouteWrapper>
                </Switch>
            </BrowserRouter>
        </div>
    }
}
export default App