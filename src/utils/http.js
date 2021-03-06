/**
 * //同源策略：1.协议相同 2.域名相同 3.端口号相同
 * //基于fetch封装的请求方法 ，支持get和post
 * @argument get
 * @argument post
 * 
 */

//本地测试服务器的域名
let domin;
if(process.env=='development'){
    domin = 'http://localhost:9000'
}
if(process.env=='production'){
    domin = 'http://localhost:9000'
}
let $http = {
    get(url,data){
        if(data){
            if(Object.prototype.toString.call(data)!="[object Object]"){
                return {
                    then(callback){
                        callback('get请求入参格式不正确，需要传object');
                        return {
                            catch(err){
                                err(new Error('入参格式不正确'))
                            }
                        }
                    }   
                }
            }
            let queryString="?"
            for(let i in data){
                queryString+=(i+"="+data[i]+"&")
            }
            url = encodeURI(url+queryString.slice(0,-1));
        }
        return fetch(domin+url,{
            headers:{
                "content-type":"application/json;charset=utf-8"
            }
        }).then(res=>res.json())
    },
    post(url,data){
        if(Object.prototype.toString.call(data)!="[object Object]"){
            return {
                then(callback){
                    callback('get请求入参格式不正确，需要传object');
                    return {
                        catch(err){
                            err(new Error('入参格式不正确'))
                        }
                    }
                }   
            }
        }
        return fetch(domin+url,{
            body:JSON.stringify(data),  //字符串
            headers:{
                "content-type":"application/json;charset=utf-8",
                "Token":133115
            },
            method:'POST'
        }).then(res=>res.json())
    },
    jsonp(url,callbackName){
        return new Promise((resolve,reject)=>{
            window[callbackName] = function(data){
                resolve(data)
            }
            let script = document.createElement('script')
            let body = document.body;
            script.src=url
            body.appendChild(script)
        })
    }
}
export default $http