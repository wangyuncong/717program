import React,{Component} from 'react'
import {connect} from 'react-redux'

import mapDispatchToProps from './dispatch'
class CartItem extends Component{
    constructor(){
        super()
    }
    render(){
        let {toggleSelect,updateCount,item} = this.props
        return(
            <li>
                <span onClick={()=>{toggleSelect((1-item.selected),item.goods_id)}} className={item.selected==0?"selected":"iconfont icon-finish selected"}></span>
                <span className="goods-img">
                    <img src={'http://www.lb717.com'+item.obj_data} alt=""/>
                </span>
                <div className="right-area">
                    <p>{item.goods_name}</p>
                    <div>
                        <div>
                            <p>x{item.count}</p>
                            <p>￥{item.discount_price}</p>
                        </div>
                        <div className="cart-num">
                            <span onClick={()=>{updateCount(--item.count,item.goods_id)}}>-</span>
                            <span className="cart-count">{item.count}</span>
                            <span onClick={()=>{updateCount(++item.count,item.goods_id)}}>+</span>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}
export default connect(function(state){
    return {}
},mapDispatchToProps,null,{pure:false})(CartItem)