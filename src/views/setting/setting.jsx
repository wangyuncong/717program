import React,{Component} from "react"
import {loginout} from "../../utils/loginout"
import { T } from 'react-toast-mobile';
class Setting extends Component{
    constructor(){
        super()
        this.loginout=this.loginout.bind(this)
    }
    render(){
        return (
            <div id="setting">
                <header>设置</header>
                <button onClick={this.loginout}>退出登录</button>
            </div>     
        )
    }
    loginout(){
        T.confirm({
            title: '您确定要退出吗',
            option: [{
                text: '确定',
                fn: () => {
                    loginout()
                    this.props.history.push("/index/home")
                }
            }, {
                text: '返回',
                fn: () => console.log('返回')
            }]
        });
    }
    componentDidMount(){
        
    }
}
export default Setting