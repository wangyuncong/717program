import $http from '../../utils/http'
import {getCookie} from '../../utils/cookie'
import {UPDATA_GOODS_LIST,SELECTED_ALL} from '../../store/reducers'
export default function mapDispatchToProps(dispatch){
    return {
        fetchGoodsList(history){
            $http.post('/user/Cart/goodList',{
                token:getCookie('token')
            })
            .then(res=>{
                if(res.error==1){
                    history.push('/login',{
                        from:'/index/cart'
                    })
                }else{
                    dispatch({
                        type:UPDATA_GOODS_LIST,
                        data:res
                    })
                }
            })
        },
        selectedAll(str){
            dispatch({
                type:SELECTED_ALL,
                data:str
            })
        },
        delCartGoods(selectedID){
            $http.post('/user/Cart/delGoods',{
                selectedID,
                token:getCookie('token')
            })
            .then(res=>{
                if(res.success==1){
                    dispatch({
                        type:UPDATA_GOODS_LIST,
                        data:res.leftGoods
                    })
                }
            })
        }
    }
}