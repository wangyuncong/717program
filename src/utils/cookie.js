export function getCookie(name){
    let cookieStr = document.cookie;
    let arr;
    let res;
    if(cookieStr.indexOf(';')>-1){
        arr = cookieStr.split('; ');
        arr.forEach((cookie,index)=>{
            let tmp_arr = cookie.split('=')
            if(tmp_arr[0]==name){
                res=tmp_arr[1]
            }
        })
    }else{
        let tmp_arr = cookieStr.split('=')
        if(tmp_arr[0]==name){
            res=tmp_arr[1]
        }
    }
    return res
}