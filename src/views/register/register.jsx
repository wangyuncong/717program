import React,{Component} from 'react'
import './register.less'
import $http from '../../utils/http'
import {Link} from 'react-router-dom'
class Register extends Component{
    constructor(){
        super()
        this.toRegister=this.toRegister.bind(this)
    }
    toRegister(){
        let {username,password} = this.refs
        $http.post("/user/register",{
            username:username.value,
            password:password.value
        })
        .then(data=>{
            console.log(data)
            if(data.success==1){
                this.props.history.push("/login")
            }
        })
        .catch(err=>{console.log(err)})
    }
    render(){
        return <div id="register">
            <div className="register-head">
                <span className="iconfont icon-left"></span>
                <h1>注册717</h1>
                <Link to="login"><b>注册</b></Link>
            </div>
            <div className="regist-input">
                <p><span className="iconfont icon-weibiaoti2fuzhi12"></span><input type="text" placeholder="请输入您的手机号" className="username" ref="username"/></p>
                <p><span className="iconfont icon-yanzhengma"></span><input type="text" placeholder="请输入验证码" className="yzm" ref="yzm"/><b>获取验证码</b></p>
                <p><span className="iconfont icon-icon-"></span><input type="password" placeholder="请输入您的密码" className="password" ref="password"/></p>
            </div>
            <div className="regist-button">
                <button onClick={this.toRegister}>立即注册</button>
            </div>
        </div>
    }
}
export default Register