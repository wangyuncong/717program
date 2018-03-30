import React,{Component} from 'react'
import './cart.less'

import CartItem from '../../components/cartItem/cartItem'

import {connect} from 'react-redux'
import mapStateToProps from './state'
import mapDispatchToProps from './dispatch'

class Cart extends Component{
    constructor(){
        super()
        this.state={
            str:"all",
            edit:"编辑",
            pay:"删除"
        }
        this.cartEdit = this.cartEdit.bind(this)
        this.toDelGoods = this.toDelGoods.bind(this)
    }
    toDelGoods(){
        if(this.state.pay=="结算") return;
        let selectedID=[];
        this.props.cartList.forEach((item)=>{
            if(item.selected==1){
                selectedID.push(item.goods_id)
            }
        })
        this.props.delCartGoods(selectedID)
    }
    cartEdit(){
        this.setState({
            edit:this.state.edit == '编辑' ? '完成' : '编辑',
            pay:this.state.edit == '编辑' ? '删除' :'结算' 
        })
    }
    render(){
        let {str,edit,pay} = this.state;
        let {cartList,totalCost,selectedAll,selectAll} = this.props;
        return (
            <div id="cart">
                <header>
                    <p>购物车</p>
                    <span onClick={this.cartEdit}>{edit}</span>
                </header>
                <div className="goods-list">
                    <ul>
                        {
                            cartList.map((item,index)=>{
                                return <CartItem key={index} item={item}></CartItem>
                            })
                        }
                    </ul>
                </div>
                <footer>
                    <div onClick={()=>{
                        this.setState({
                            str:str=="all"?'none':"all"
                        })
                        selectedAll(this.state.str)
                    }}>
                    <span className={selectAll?"selected iconfont icon-finish":'selected'}></span>
                    <span className="quan">全选</span>
                    </div>
                    <div className="cart-accounts">合计<span>{totalCost}</span></div>
                    <div className="cart-calculate" onClick={this.toDelGoods}>
                        {pay}
                    </div>
                </footer>
            </div>
        )
    }
    componentDidMount(){
        //console.log(this.props)
        this.props.fetchGoodsList(this.props.history)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)