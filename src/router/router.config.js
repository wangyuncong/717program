//一级路由
import Detail from '../views/detail'
import Login from '../views/login'
import Index from '../views/index'
import Register from '../views/register'
import Search from '../views/search'
import Setting from '../views/Setting'
import Deliverylist from '../views/deliverylist'
import Consignee from '../views/consignee'

//import Nomatch from '../views/route404' 
//二级路由
import Home from '../views/home'
import Cart from '../views/cart'
import Catagory from '../views/catagory'
import Mine from '../views/mine'
import SearchResult from '../views/result'
let router = {
    routers: [
        {
            name: "",
            path: "/index",
            component: Index,
            children: [
                {
                    name: "home",
                    path: "/index/home",
                    component: Home
                }, {
                    name: "catagory",
                    path: "/index/catagory",
                    component: Catagory
                }, {
                    name: "cart",
                    path: "/index/cart",
                    component: Cart,
                    authorization:true//设置权限
                }, {
                    name: "mine",
                    path: "/index/mine",
                    component: Mine,
                    authorization:true
                },{
                    name: "result",
                    path: "/index/result",
                    component: SearchResult
                }
            ]
        }, {
            name: "detail",
            path: "/detail",
            component: Detail,
            exact: true
        }, {
            name: "login",
            path: "/login",
            component: Login,
            exact: true
        }, {
            name: "register",
            path: "/register",
            component: Register
        }, {
            name: "search",
            path: "/search",
            component: Search
        }, {
            name: "setting",
            path: "/setting",
            component: Setting
        }, {
            name: "consignee",
            path: "/consignee",
            component: Consignee
        }, {
            name: "deliverylist",
            path: "/deliverylist",
            component: Deliverylist
        }
    ]
}
export default router