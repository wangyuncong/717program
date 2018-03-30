import React,{Component} from 'react'
import Swiper from 'swiper'
import './swiperComp.less'
import 'swiper/dist/css/swiper.css'
// let img1 = require("../../static/img/banner1.png")
// console.log(img1)

class SwiperComponent extends Component{
    render(){
        let {bannerArr} = this.props
        return <div className="swiper-container" id="carousel" ref="scDom">
            <div className="swiper-wrapper">
                {
                    bannerArr.map((item,index)=>{
                        return <div className="swiper-slide" key={index}>
                            <img src={item} alt=""/>
                        </div>
                    })
                }
            </div>
        </div>
    }
    componentDidMount(){
        new Swiper(this.refs.scDom,{
            autoplay:true,
            loop:true
        })
    }
}
export default SwiperComponent