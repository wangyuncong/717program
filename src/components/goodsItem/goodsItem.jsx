import React,{Component} from 'react'
import $http from '../../utils/http'
import {getCookie} from '../../utils/cookie'
import LazyLoad from 'react-lazyload'
import { T } from 'react-toast-mobile';
import {connect} from 'react-redux'
import {ADD_CART} from '../../store/reducers'
class Placeholder extends Component{
    render(){
        return <img src={require('../../static/img/717.gif')}></img>
    }
}
class GoodsItem extends Component{
    constructor(){
        super()
        this.addCart=this.addCart.bind(this)
        this.toDetail=this.toDetail.bind(this)
    }
    addCart(e){
        e.stopPropagation()
        let {data} = this.props;
        if(getCookie('token')){
            $http.post('/user/Cart/addCart',{
                goods_id:data.goods_id,
                goods_info:data,
                token:getCookie('token')
            })
            .then((res)=>{
                if(res==1){
                    T.notify('添加成功')
                    this.props.dispatch({
                        type:ADD_CART,
                        data:{
                            ...data,
                            count:1,
                            selected:false
                        }
                    })
                }else{
                    T.notify('添加失败')
                    let {history,location} = this.props
                    history.push('/login',{
                        from:location.pathname
                    })
                }
            })
        } else {
            let {history,location} = this.props
            history.push('/login',{
                from:location.pathname
            })
        }
    }
    toDetail(goods_id){
        this.props.history.push('/detail?good_id='+goods_id,{
            goods_id:goods_id
        })
    }
    render(){
        let {data} = this.props;
        return <dl className="goods-item ck-clear" onClick={()=>{this.toDetail(data.goods_id)}}>
            <dt><LazyLoad overflow height={'100%'} placeholder={<Placeholder/>} debounce={500}><img src={"http://www.lb717.com/"+data.obj_data} alt=""/></LazyLoad></dt>
            <dd>
                <p className="goods-detail">{data.goods_name}</p>
                <p>
                    <span className="goods-price">{data.discount_price}</span>
                    <span onClick={this.addCart} className="iconfont icon-tubiaolunkuo-"></span>
                </p>
            </dd>
        </dl>
    }
}
export default connect(null)(GoodsItem)