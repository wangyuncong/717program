import {getCookie} from './cookie'
export function loginout(){
    let t=new Date()//获取当前时间
    t.setTime(t.getTime()-1)//设置当前时间的上一毫秒
    document.cookie="token="+getCookie("token")+";expires="+t.toUTCString()//cookie失效
}