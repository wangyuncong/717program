import React,{Component} from 'react'
import './consignee.less'
import Header from '../../components/header'
import Input from '../../components/input'
import propTypes from 'prop-types'
import $http from '../../utils/http'
import {getCookie} from '../../utils/cookie'
import {connect} from 'react-redux'

Input.propTypes={
    onChange:propTypes.func.isRequired
}
class Select extends Component{
    constructor(){
        super()
        this.getVal = this.getVal.bind(this)
    }
    getVal(e){
        this.props.onChange(e.target.value)
    }
    render(){
        let {data} = this.props;
        return <select onChange={this.getVal}>
            <option value="0">请选择</option>
            {
                data.map((item,index)=>{
                    return <option value={item.name||item} key={index}>{item.name||item}</option>
                })
            }
        </select>
    }
}
Select.propTypes={
    onChange:propTypes.func.isRequired
}
class Consignee extends Component{
    constructor(){
        super()
        this.toSave = this.toSave.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.name=""
        this.phone=""
        this.address=""
        this.state={
            cities:[],
            regions:[]
        }
    }
    reRenderCity(province){
        this.props.pcrData.forEach((item)=>{
            if(item.name==province){
                this.setState({
                    cities:item.city
                })
            }
        })
    }
    reRenderRegion(city){
        let {cities} = this.state;
        cities.forEach(item=>{
            if(item.name==city){
                this.setState({
                    regions:item.area
                })
            }
        })
    }
    render(){
        let {editInfo,pcrData}=this.props;
        let {cities,regions} = this.state;
        return <div id="consignee">
            <Header history={this.props.history}><h1>收货人</h1></Header>
            <section>
                <Input placeholder="收货人姓名" onChange={(val)=>{this.inputChange('name',val)}} value={editInfo.name}/>
                <Input placeholder="手机号" onChange={(val)=>{this.inputChange('phone',val)}} value={editInfo.phone}/>
                <Select onChange={(val)=>{this.inputChange('province',val);this.reRenderCity(val)}} data={pcrData}></Select>
                <Select onChange={(val)=>{this.inputChange('city',val);this.reRenderRegion(val)}} data={cities}></Select>
                <Select onChange={(val)=>{this.inputChange('region',val)}} data={regions}></Select>
                <Input placeholder="详细地址" onChange={(val)=>{this.inputChange('address',val)}} value={editInfo.address}/>
            </section>
            <button onClick={this.toSave} className="save">保存</button>
        </div>
    }
    inputChange(a,b){
        this[a]=b;
    }
    toSave(){
        let reg_exp_name=/([A-Za-z\d\u4e00-\u9fa5]+)$/g;
        let reg_exp_phone=/^1[34578]\d{9}$/;
        if(!reg_exp_name.test(this.name)){
            alert('请输入正确格式的用户名')
            return;
        }
        if(!reg_exp_phone.test(this.phone)){
            alert('请输入正确的手机号')
            return;
        }
        if(!this.province||!this.city||!this.region){
            alert("请选择省市区")
            return;
        }
        if(!this.address){
            alert('请填写街道')
            return;
        }
        $http.post('/user/Mail/addNew',{
            name:this.name,
            phone:this.phone,
            province:this.province,
            city:this.city,
            region:this.region,
            address:this.address,
            token:getCookie('token')
        })
        .then((res)=>{
            if(res.success==1){
                this.props.history.replace('/deliverylist')
            }
        })
    }
    componentDidMount(){
        this.props.fetchPCR()
    }
}
export default connect(function(state){
    return {
        editInfo:state.edit_delivery,
        pcrData:state.pcr_data
    }
},function(dispatch){
    return {
        fetchPCR(){
            dispatch({
                type:"GET_PCR_DATA"
            })
        }
    }
})(Consignee)