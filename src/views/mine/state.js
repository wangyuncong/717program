export default function(state){
    let userInfo=null;
    console.log(!state.user_info || !state.user_info.name)
    if(!state.user_info || !state.user_info.name){
        userInfo = JSON.parse(localStorage.getItem('user-info'))
    }else{
        userInfo = state.user_info
    }
    return {
        userInfo
    }
}