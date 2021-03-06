import {combineReducers} from 'redux'

//添加购物车
export const ADD_CART = 'ADD_CART';
//删除商品
export const DELETE_CART = 'DELETE_CART';
//改变商品数量
export const UPDATA_GOODS_COUNT = 'UPDATA_GOODS_COUNT';
//改变商品选中与否
export const UPDATA_GOODS_SELECTED = 'UPDATA_GOODS_SELECTED';
//更新整个商品列表
export const UPDATA_GOODS_LIST = 'UPDATA_GOODS_LIST';
//全选
export const SELECTED_ALL = 'SELECTED_ALL'
//存储用户信息
export const USER_INFO = "USER_INFO"
//存储邮寄地址列表
export const DELIVERY_LIST = 'DELIVERY_LIST'
export const DELIVERY_LIST_ERR = 'DELIVERY_LIST_ERR'
let initState={
    cart_list:[],
    user_info:null,
    delivery_list:[],
    edit_delivery:null,
    pcr_data:[]
}

function cart_list(state=initState.cart_list,action){
    switch (action.type){
        case ADD_CART: 
            let flag=false;//新添加的商品购物里面还没有
            state.forEach((item,index)=>{
                if(item.goods_id===action.data.goods_id){
                    ++item.count
                    flag=true
                }
            })
            return flag?[...state]:[...state,action.data]
            break;
        case UPDATA_GOODS_COUNT:
        let arr=[...state];
            arr.forEach(item=>{
                if(item.goods_id==action.id){
                    item.count=action.data
                }
            });
            return arr
            break;
        case UPDATA_GOODS_SELECTED:
            let arr2=[...state];
            arr2.forEach(item=>{
                if(item.goods_id==action.id){
                    item.selected=action.data
                }
            });
            return arr2;
            break;
        case UPDATA_GOODS_LIST:
            return action.data;
        case SELECTED_ALL:
            let arr3=[...state];
            let str=action.data
            arr3.forEach(item=>{
                item.selected = str=='all'?1:0
            });
            return arr3;
        default:return state
    }
    return state
}
function user_info(state=initState.user_info,action){
    switch(action.type){
        case USER_INFO:
            return action.data;
            break;
        default:
            return {}
    }
}
function delivery_list(state=initState.delivery_list,action){
    switch(action.type){
        case DELIVERY_LIST:
            return action.data;
            break;
        case DELIVERY_LIST_ERR:
            return state;
            break;
        case "DELETE_DELIVERY_INFO":
            return action.data;
            break;
        default:return state;
    }
}
function edit_delivery(state=initState.edit_delivery,action){
    if(action.type=="EDIT_DELIVERY_INFO"){
        return action.data
    }
    return {}
}
function pcr_data(state=initState.pcr_data,action){
    if(action.type=="PCR_DATA"){
        return action.data
    }
    return state
}
export default combineReducers({
    cart_list,
    user_info,
    delivery_list,
    edit_delivery,
    pcr_data
})