export default function mapStateToProps(state){
    let totalCost=0;
    let selectAll=true;
    state.cart_list.forEach((item,index)=>{
        if(item.selected==1){
            totalCost+=(item.discount_price*item.count)
        }
        if(item.selected==0){
            selectAll=false
        }
    })
    return {
        cartList:state.cart_list,
        totalCost,
        selectAll
    }
}