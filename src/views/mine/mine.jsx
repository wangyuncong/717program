//我的页面
import React,{Component} from "react"
import './mine.less'
import {connect} from 'react-redux'
import mapStateToProps from './state'

class Mine extends Component{
    constructor(){
        super()
        this.Setting=this.Setting.bind(this)
        this.toDeliveryList=this.toDeliveryList.bind(this)
    }
    render(){
        let {userInfo} = this.props;
        return (
            <div id="mine">
                <div className="header">
                    <div className="mine_header"><span className="iconfont icon-shezhi-tianchong" onClick={this.Setting}></span><h1>我的717商城</h1></div>
                    <dl>
                        <dt>
                            <img src={require("../../static/img/icon1.gif")} alt=""/>
                        </dt>
                        <dd>
                            <p>{userInfo.name}</p> 
                            <p>{userInfo.nickName}</p> 
                        </dd>
                    </dl>
                </div>
                <section>
                    <div>
                        <span className="iconfont icon-keyongyue"></span>
                        <p>账户管理</p>
                        <span className="iconfont icon-arrow-right"></span>
                    </div>
                    <div onClick={this.toDeliveryList}>
                        <span className="iconfont icon-dizhi"></span>
                        <p>地址管理</p>
                        <span className="iconfont icon-arrow-right"></span>
                    </div>
                    <div>
                        <span className="iconfont icon-unie737"></span>
                        <p>联系客服</p>
                        <span className="iconfont icon-arrow-right"></span>
                    </div>
                </section>
            </div>
        )
    }
    toDeliveryList(){
        this.props.history.push('/deliverylist')
    }
    Setting(){
        this.props.history.push("/setting")
    }
}
export default connect(mapStateToProps)(Mine)