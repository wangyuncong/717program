import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import $http from '../../utils/http'
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import mapDispatchToProps from './dispatch'
import './login.less'
class Login extends Component{
    constructor(){
        super()
        this.toLogin = this.toLogin.bind(this)
    }
    toLogin(){
        let {username,password} = this.refs
        $http.post("/user/login",{
            username:username.value,
            password:password.value
        })
        .then(res=>{
            if(res.success==1){
                //把用户信息存储一份到store中
                this.props.saveUser(res)
                //把用户信息存储一份到localStorage中
                localStorage.setItem('user-info',JSON.stringify(res))
                document.cookie="token="+res.token;
                this.props.history.push("/index/home")
            }else{
                alert("登陆出错")
            }
        })
        .catch(err=>{console.log(err)})
    }
    render(){
        return <div id="login">
            <div className="login-head">
                <span className="iconfont icon-left"></span>
                <h1>登录717</h1>
                <Link to="register"><b>注册</b></Link>
            </div>
            <div className="login-input">
                <p><span className="iconfont icon-weibiaoti2fuzhi12"></span><input type="text" placeholder="请输入您的手机号" className="username" ref="username"/></p>
                <p><span className="iconfont icon-icon-"></span><input type="password" placeholder="请输入您的密码" className="password" ref="password"/></p>
            </div>
            <div className="login-button">
                <button onClick={this.toLogin}>立即登录</button>
                <a href="">忘记密码</a>
            </div>
        </div>
    }
}
export default connect(null,mapDispatchToProps)(Login)