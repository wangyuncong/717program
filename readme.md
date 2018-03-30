## 电商网站项目
    1. 页面
        首页
        分类列表页
        搜索页
            详情页
        分类页
        购物车
        我的
            登陆
            注册
            邮寄地址管理
                邮寄地址列表
                    添加
        订单管理页
    
    2. common组件封装
 
        路由组件

        头部组件

        input组件

        轮播图模块

        商品模块

        购物车商品模块

    3. 工具类组件封装
        封装fetch
            
        封装cookie（主要用于存储token）
        封装fontset（用于自适应排版）
        封装退出登录

    5. 路由：(1) 写一个装载所有路由的js文件，仿vue，请与统一管理路由，
             (2) 封装路由组件，用于渲染路由，把路由拿出来进行渲染，在里边判断有没有children，如果      有就把children往下传。（用render函数把location往下传）
                 权限判断：先判断是否有authorization字段然后再判断是否登录（有没有token）
    6. 技术选型
        React,
        redux,react-router-dom,
        react-redux,
        redux-sage

        mobile端，自适应

        fetch，封装

        node搭建一个简单的静态服务器，准备一定的模拟接口

        脚手架：webpack，自行搭建可以切换不同环境的脚手架
    
    5. react-redux和react-saga（用于统一管理数据，react-saga一般用于大项目）
    7. home页面
        重点：下拉刷新
                知识点：scrollTop+windowsHeight = documentHeight
                做法：当满足要求时向后台发送http请求，请求数据，进行页面渲染
              添加购物车
                点击购物车按钮时发送http请求，把token和商品的channel_id传给后台，
                后台进行购物车添加
        用到的第三方插件：LazyLoad：用于在没有请求到数据时，当做默认图片
    8. 分类页面：
        点击每个分类向后台发送不同的数据请求，拿到数据进行渲染即可
    9. 搜索页面
        搜索：点击搜索按钮的时候，获取到input的value值，然后存储到localStorage中的SearchHistory中，如果有就push进去（通过indexof判断searchhistory中原先是否就有此字段），如果没有就创建SearchHistory然后在存储进去。然后在把字段传给结果页面
        清空：把localstorage中的SearchHistory删除
        大家都在搜：把字段传给结果页面
    10. 购物车页面：
        重点: 点击加减
                通过redux进行统一管理，
                把加减后的数据和此商品的id在redux里保存一份
              删除
                发送http请求把此商品的id和token传给后台，后台进行判断返回删除之后剩余的商品进行页面渲染
              结算
                跳转到结算页面
    11. 我的页面：
        头像跟用户名：先在redux里获取，如果没有在localstroage里获取到用户名等
        地址管理：
            地址列表：在componentDidMount里向后台发送http请求那地址的信息
            添加地址：获取input的值和select的值
                        通过函数传参大的方法，把该input的名和该input的值传给InputChange,该函数进行this[a]=b的操作
                     进行正则判断（格式上的判断）
                     判断完成后发送http请求，把收集到的信息和token传给后台，后台进行解密判断后返回信息（主要是success），如果success==1时进行页面跳转，跳转到地址列表页
    12. 注册：
            获取input的值传给后台，后台连接数据库，存储到数据库，
    13. 登陆：
            获取input的值传给后台，后台数据库进行查询，
            如果存在，后台根据用户名和密码生成token，传给前端
    







