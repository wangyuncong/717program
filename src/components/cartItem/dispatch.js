import {UPDATA_GOODS_COUNT,UPDATA_GOODS_SELECTED} from '../../store/reducers'
export default function mapDispatchToProps(dispatch){
    return {
        updateCount(count,id){
            dispatch({
                type:UPDATA_GOODS_COUNT,
                data:count,
                id
            })
        },
        toggleSelect(selected,id){
            dispatch({
                type:UPDATA_GOODS_SELECTED,
                data:selected,
                id
            })
        }
    }
}