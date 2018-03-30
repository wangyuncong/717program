import React,{Component,Fragment} from 'react'
import $http from '../../utils/http'
import RouteWrapper from '../../components/router'
import {NavLink,Redirect,Route} from 'react-router-dom'
import Toast from 'react-toast-mobile';
import 'react-toast-mobile/lib/react-toast-mobile.css'
import './index.less'
class Index extends Component{
    render(){
        let {routers} = this.props
        return (
            <div id="index">
                <Toast></Toast>
                <Fragment>
                    <RouteWrapper routers={routers}></RouteWrapper>
                </Fragment>
                <ul className="bottom-tabs">
                    <li>
                        <NavLink to="/index/home" activeClassName='active'>
                            <span className="iconfont icon-shouye"></span>
                            <span>首页</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/index/catagory">
                            <span className="iconfont icon-fenlei"></span>
                            <span>分类</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/index/cart">
                            <span className="iconfont icon-tubiaolunkuo-"></span>
                            <span>购物车</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/index/mine">
                            <span className="iconfont icon-weibiaoti2fuzhi12"></span>
                            <span>我的</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}
export default Index