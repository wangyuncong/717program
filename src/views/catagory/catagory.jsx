import React,{Component} from 'react'
import './catagory.less'
import $http from '../../utils/http'
class Catagory extends Component{
    constructor(){
        super()
        this.state={
            activeIndex:0,
            jsonpList:[]
        }
        this.toggleActive = this.toggleActive.bind(this)
    }
    toggleActive(index){
        let url ="https://acs.m.taobao.com/h5/mtop.relationrecommend.wirelessrecommend.recommend/2.0/?appKey=12574478&t=1521438667881&sign=37b57083dc8fd6f4ea3e20e3837e183c&api=mtop.relationrecommend.WirelessRecommend.recommend&v=2.0&type=jsonp&dataType=jsonp&callback=mtopjsonp1&data=%7B%22appId%22%3A%223113%22%2C%22vm%22%3A%22nw%22%2C%22params%22%3A%22%7B%5C%22tab%5C%22%3A%5C%22on%5C%22%2C%5C%22catmap_version%5C%22%3A%5C%222.0%5C%22%7D%22%2C%22nxtype%22%3A%22h5%22%7D";
        $http.jsonp(url,"mtopjsonp1").then(res=>{
            this.setState({
                //jsonpList:res.data.result[0].industryList
            })
            console.log(res)
        })

        this.setState({
            activeIndex:index
        })
    }   
    render(){
        let catList = ["家乡味道","进口食品","牛奶乳品","休闲零食","生鲜果蔬","米面粮油","调味调料","酒水饮料"]
        let {activeIndex,jsonpList} = this.state;
        return (
            <div id="catagory">
                <header>
                    <div>
                        <span className="iconfont icon-sousuo"></span>
                        <input type="text" placeholder="输入您要购买的商品"/>
                    </div>
                    <p className="iconfont icon-message"></p>
                </header>
                <div className="catagory-box">
                    <ul className="left-slide">
                        {
                            catList.map((item,index)=>{
                                return <li className={activeIndex==index?'catagory-active':''} key={index} onClick={()=>{this.toggleActive(index)}}>{item}</li>
                            })
                        }
                    </ul>
                    <div className="right-slide">
                        {
                            jsonpList.map((item,index)=>{
                                return <dl key={index}>
                                    <dt></dt>
                                    <dd>{item.name}</dd>
                                </dl>
                            })
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}
export default Catagory