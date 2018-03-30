import React,{Component} from 'react'
import $http from '../../utils/http'
import SwiperComponent from '../../components/swiper/swiperComp'
import GoodsItem from '../../components/goodsItem'
import './home.less'
class Home extends Component{
    constructor(){
        super()
        this.state={
            goodslist:[],
            channel_id:3,
            caniquery:true
        }
        this.toSearch=this.toSearch.bind(this)
        this.scrolling=this.scrolling.bind(this)
    }
    toSearch(){
        let {history} = this.props;
        history.push('/search')
    }
    scrolling(){
        //scrollTop+windowsHeight = documentHeight
        if(!this.state.caniquery) return;
        if(!this.state.channel_id>9) return;
        let {scroller,doc} = this.refs
        let st = scroller.scrollTop;
        let sw = scroller.offsetHeight;
        let dh = doc.offsetHeight;
        //console.log(dh-(st+sw))
        if(dh-(st+sw)<50){
            this.setState({
                caniquery:false
            })
            this.setState({
                channel_id:++this.state.channel_id
            })
            let {goodslist} = this.state;
            $http.post("/mall/index/getGoodsChannel",{channel_id:this.state.channel_id})
            .then(res=>{
                this.setState({
                    goodslist:[...goodslist,...JSON.parse(res).data.data],
                    caniquery:true
                })
            })
        }
    }
    render(){
        let bannerArr = [
            require("../../static/img/banner1.png"),
            require("../../static/img/banner2.png"),
            require("../../static/img/banner3.png"),
            require("../../static/img/banner4.png"),
            require("../../static/img/banner5.png")
        ]
        return (
            <div id="home" ref="scroller" onScroll={this.scrolling}>
                <header>
                        <span><img src="/src/static/img/717.gif" alt=""/></span>
                        <input type="text" onFocus={this.toSearch} placeholder="请输入您要购买的商品"/>
                        <dl className="msg">
                            <dt>
                                <img src="/src/static/img/store.png" alt=""/>
                            </dt>
                            <dd>我的店铺</dd>
                        </dl>
                        <dl>
                            <dt>
                                <img src="/src/static/img/msg.gif" alt=""/>  
                            </dt>
                            <dd>消息</dd>
                        </dl>
                </header>
                <div ref="doc">
                    <div className="carousel">
                        <SwiperComponent bannerArr={bannerArr}></SwiperComponent>
                    </div>
                    <section>
                        <dl>
                            <dt><img src="/src/static/img/icon1.gif" alt=""/></dt>
                            <dd>家乡味道</dd>
                        </dl>
                        <dl>
                            <dt><img src="/src/static/img/icon2.gif" alt=""/></dt>
                            <dd>进口食品</dd>
                        </dl>
                        <dl>
                            <dt><img src="/src/static/img/icon3.gif" alt=""/></dt>
                            <dd>牛奶乳品</dd>
                        </dl>
                        <dl>
                            <dt><img src="/src/static/img/icon4.gif" alt=""/></dt>
                            <dd>茶果冲饮</dd>
                        </dl>
                        <dl>
                            <dt><img src="/src/static/img/icon5.gif" alt=""/></dt>
                            <dd>休闲零食</dd>
                        </dl>
                        <dl>
                            <dt><img src="/src/static/img/icon6.gif" alt=""/></dt>
                            <dd>米面粮油</dd>
                        </dl>
                        <dl>
                            <dt><img src="/src/static/img/icon7.gif" alt=""/></dt>
                            <dd>调味调料</dd>
                        </dl>
                        <dl>
                            <dt><img src="/src/static/img/icon8.gif" alt=""/></dt>
                            <dd>酒水饮料</dd>
                        </dl>
                    </section>
                    <div className="dynamic">
                        <h3>商城动态</h3>
                        <p>绿色无公害 无污染 无添加 天然有机蔬菜源头吃的放心,健康第一,安全保证,确保蔬菜新鲜。</p>
                    </div>
                    <div className="goods">
                        {
                            this.state.goodslist.map((item,index)=>{
                                return <GoodsItem key={index} data={item} history={this.props.history} location={this.props.location}></GoodsItem>
                            })
                        }
                        <p className="flag">我是有底线的...</p>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        $http.post("/mall/index/getGoodsChannel",{channel_id:this.state.channel_id})
        .then(res=>{
            this.setState({
                goodslist:JSON.parse(res).data.data
            })
        })
        .catch(err=>{console.log(err)})
    }
}
export default Home