import {DELIVERY_LIST} from '../../store/reducers'
import $http from '../../utils/http'
import {getCookie} from '../../utils/cookie'
export default function mapDispatchToProps(dispatch){
    return{
        getDelivery(){
            dispatch({
                type:"GET_DELIVERY_LIST"
            })
        },
        toEditDelivery(index){
            dispatch({
                type:"EDIT_DELIVERY",
                data:index
            })
        },
        toDeleteDelivery(index){
            dispatch({
                type:"DELETE_DELIVERY",
                data:index
            })
        }
    }
}