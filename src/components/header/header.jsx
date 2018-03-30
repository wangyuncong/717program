import React,{Component} from 'react'
import './header.less'
class Header extends Component{
    constructor(){
        super()
        this.goBack = this.goBack.bind(this)
    }
    render(){
        return (
            <header id="header">
                <span onClick={this.goBack} className="iconfont icon-zuojiantou">
                    
                </span>
                <div>{this.props.children}</div>
            </header>
        )
    }
    goBack(){
        this.props.history.go(-1)
    }
}
export default Header