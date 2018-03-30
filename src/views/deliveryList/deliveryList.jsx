import React,{Component} from 'react'
import './deliverylist.less'
import Header from '../../components/header'
import $http from '../../utils/http'
import {getCookie} from '../../utils/cookie'
import {connect} from 'react-redux'
import mapStateToProps from './state'
import mapDispatchToProps from './dispatch'
class DeliveryList extends Component{
    constructor(){
        super()
        this.toConsignee = this.toConsignee.bind(this)
        this.toEdit = this.toEdit.bind(this)
        this.toDelete = this.toDelete.bind(this)
    }
    render(){
        let {deliveryList} = this.props
        console.log(deliveryList)
        return (
            <div id="delivery">
                <Header history={this.props.history}><h1>收货地址</h1></Header>
                <div className="deliveryList">
                    {
                        deliveryList.map((item,index)=>{
                            return (
                                <li key={index}>
                                    <p>{item.name+"  "+item.phone}</p>
                                    <p>{item.province+item.city+item.region}</p>
                                    <div>
                                        <span onClick={()=>{this.toEdit(index)}}>编辑</span>
                                        <span onClick={()=>{this.toDelete(index)}}>删除</span>
                                    </div>
                                </li>
                            )
                        })
                    } 
                </div>
                <button onClick={this.toConsignee} className="addbutton">
                    + 新增地址
                </button>
            </div>
        )
    }
    toEdit(index){
        this.props.toEditDelivery(index)
        this.props.history.push('/consignee')
    }
    toDelete(index){
        this.props.toDeleteDelivery(index)
    }
    toConsignee(){
        this.props.history.push('/consignee')
    }
    componentWillMount(){
        this.props.getDelivery()
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DeliveryList)