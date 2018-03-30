import React,{Component} from 'react'

class Input extends Component{
    constructor(){
        super()
        this.getVal = this.getVal.bind(this)
    }
    getVal(e){
        this.props.onChange(e.target.value)
    }
    render(){
        return <input type="text" ref={e=>{e&&(e.value=this.props.value||"")}} onChange={this.getVal} placeholder={this.props.placeholder}/>
    }
}
export default Input