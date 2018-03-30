import React,{Component,Fragment} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter,Route,Redirect,Switch,Link,NavLink} from 'react-router-dom'
import {getCookie} from "../utils/cookie"
function isLogin(){//权限设置是否登录
    return !!getCookie("token")//判断登录是否有token字段
}
class RouteWrapper extends Component{
    render(){
        let {routers} = this.props
        return <Fragment>
                {
                    routers.map((item,index)=>{
                        return <Route key={item.name} exact={item.exact} path={item.path} render={(location)=>{
                            return item.authorization && !isLogin()
                                ?<Redirect to={{pathname:"/login",state:{from:item.path}}}></Redirect>
                                :<item.component {...location} routers={item.children}></item.component>
                        }}></Route>
                    })     
                }
            </Fragment>  
    }
}
export default RouteWrapper