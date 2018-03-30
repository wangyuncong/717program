import React,{Component} from 'react'
import ReactDOM from 'react-dom'
class Detail extends Component{
    render(){
        return (
            <div>this is Detail </div>
        )
    }
    componentDidMount(){
        console.log(this.props)
    }
}
export default Detail