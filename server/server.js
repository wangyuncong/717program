const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const jwt = require('jsonwebtoken');
const mysql = require('mysql')
const querystring = require('querystring')
const http = require('http')
const fs = require("fs")
const _ = require("lodash")
const connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"wangyuncong",
    database:"717-mall"
})
connection.connect(err=>{
    if(err){
        throw err;
    }
})
app.use(bodyParser.json())
//设置跨域 cors
app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://localhost:3000")
    res.header("Access-Control-Allow-Headers","Content-Type,Token")
    res.header("Content-Type","appliction/json;charset=utf-8")
    next()
})
//商品列表的接口
const options = {
    hostname:'www.lb717.com',
    port:80,
    path:'/mall/index/getGoodsChannel',
    method:'POST',
    headers:{
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
    }
};
app.post('/mall/index/getGoodsChannel',function(req,res){
    let data = '';
    let request = http.request(options,(response)=>{
        response.setEncoding('utf8')
        response.on('data',(chunk)=>{
            data+=chunk;
        })
        response.on('end',()=>{
            res.end(JSON.stringify(data))
        })
    })
    request.write(querystring.stringify(req.body))
    request.end()
})
//注册接口
app.post('/user/register',function(req,res){
    let username = req.body.username;
    let password = req.body.password;
    connection.query("insert into register(username,password) values("+username+","+password+")")
    res.end(JSON.stringify({
        success:1
    }))
})
//登陆接口
app.post('/user/login',function(req,res){
    let username = req.body.username;
    let password = req.body.password;
    //console.log(username)
    let resInfo = {
        success:0,
        info:"用户名或密码错误",
        token:"",
        name:"",
        nickName:""
    }
    connection.query("select * from register where username like "+"'"+username+"'"+"&& password like "+"'"+password+"'"+"" ,(err,result)=>{
        if(err){
            throw err;
        }
        if(result[0]!=undefined){
            resInfo.success=1
            resInfo.info="login success"
            resInfo.name=username
            resInfo.nickName="Jack"
            if(resInfo.success==1){
                resInfo.token=jwt.sign(req.body,"1511B",{
                    expiresIn:60*1000
                })
            } 
        }
        res.end(JSON.stringify(resInfo))
    })
})
//添加购物车
app.post('/user/Cart/addCart',function(req,res){
    jwt.verify(req.body.token,"1511B",(err,decoded)=>{
        if(err){
            res.end(JSON.stringify({
                info:"登陆过期，请重新登录",
                detail:err.TokenExpiredError
            }))
        }else{
            let cartInfo = JSON.parse(fs.readFileSync(__dirname+'/cart_info.json',{encoding:'utf-8'}))
            if(cartInfo[decoded.username]){
                let recordList = cartInfo[decoded.username];
                let flag = false;//新加商品
                recordList.forEach((item,index)=>{
                    if(item.goods_id==req.body.goods_info.goods_id){
                        ++item.count;
                        flag=true
                    }
                })
                if(!flag){
                    let record = req.body.goods_info;
                    record.count=1;
                    record.selected=0;
                    cartInfo[decoded.username].push(record)
                }
            }else{
                let record = req.body.goods_info;
                record.count=1;
                record.selected=0;
                cartInfo[decoded.username]=[record]
            }
            fs.writeFile(__dirname+'/cart_info.json',JSON.stringify(cartInfo),function(){
                res.end(JSON.stringify(1))
            })
        }
    })
})
//登陆过后购物车页面所需的商品记录列表
app.post('/user/Cart/goodList',function(req,res){
    jwt.verify(req.body.token,"1511B",(err,decoded)=>{
        if(err){
            res.end(JSON.stringify({
                info:"登陆过期，请重新登录",
                detail:err.TokenExpiredError,
                error:1
            }))
        }else{
            try{
                let goodsRecord = JSON.parse(fs.readFileSync('./cart_info.json',{encoding:'utf-8'}))
                let goodlist = goodsRecord[decoded.username] || []
                res.json(goodlist)
            }
            catch(error){
                res.json(error)
            } 
        }
    })
})
//删除购物车指定商品
app.post('/user/Cart/delGoods',function(req,res){
    let cartRecord = JSON.parse(fs.readFileSync(__dirname+'/cart_info.json',{encoding:'utf-8'}))
    jwt.verify(req.body.token,'1511B',function(err,decoded){
        if(err){
            throw err;
        }else{
            let cartList = cartRecord[decoded.username]
            let delGoods = _.remove(cartList,function(item){
                return req.body.selectedID.indexOf(item.goods_id)>-1
            })
            cartRecord[decoded.username] = cartList;
            fs.writeFile(__dirname+'/cart_info.json',JSON.stringify(cartRecord),function(){
                res.json({
                    success:1,
                    info:"删除成功",
                    delGoods:delGoods,
                    leftGoods:cartList
                })
            })
        }
    })
})
//新加邮寄地址
app.post('/user/Mail/addNew',function(req,res){
    jwt.verify(req.body.token,'1511B',function(err,decoded){
        if(err){
            res.json(err)
        }else{
            let user = decoded.username;
            let delivery = JSON.parse(fs.readFileSync('./delivery.json',{encoding:'utf-8'}))
            if(delivery[user]){
                delivery[user].push(req.body)
            }else{
                delivery[user]=[req.body]
            }
            fs.writeFile("./delivery.json",JSON.stringify(delivery),function(err){
                if(err){
                    res.json(err)
                }else{
                    res.json({
                        success:1,
                        info:"地址添加成功"
                    })
                }
            })
        }
    })
})
//获取邮寄地址列表
app.post('/user/Mail/list',function(req,res){
    jwt.verify(req.body.token,'1511B',function(err,decoded){
        if(err){
            res.json(err)
        }else{
            let list = JSON.parse(fs.readFileSync('./delivery.json',{encoding:'utf-8'}))
            res.json(list[decoded.username])
        }
    }) 
})
//删除邮寄地址
app.post('/user/Mail/editlist',function(req,res){
    jwt.verify(req.body.token,'1511B',function(err,decoded){
        if(err){
            res.json(err)
        }else{
            let list = JSON.parse(fs.readFileSync('./delivery.json',{encoding:'utf-8'}))[decoded.username]
            res.json(list[req.body.index])
        }
    })
})
//编辑邮寄地址
app.post('/user/Mail/deletelist',function(req,res){
    jwt.verify(req.body.token,'1511B',function(err,decoded){
        if(err){
            res.json(err)
        }else{
            let deliverylist = JSON.parse(fs.readFileSync('./delivery.json',{encoding:'utf-8'}))
            let list = deliverylist[decoded.username]
            list.splice(req.body.index,1)
            deliverylist[decoded.username]=list
            fs.writeFile(__dirname+"/delivery.json",JSON.stringify(deliverylist),function(){
                res.json({
                    success:1,
                    info:'删除成功',
                    leftList:list
                })
            })
        }
    })
})
//省市区数据
app.get('/user/Mail/pcr',function(req,res){
    let pcrData = fs.readFileSync('./pcr.json',{encoding:'utf-8'})
    res.end(pcrData)
})
app.listen(9000,function(){
    console.log("server listen 9000")
})
