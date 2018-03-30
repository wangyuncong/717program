import React,{Component} from 'react'
import './search.less'
class Search extends Component{
    constructor(){
        super()
        this.state={
            historylist:[]
        }
        this.toResult = this.toResult.bind(this)
        this.toSearch = this.toSearch.bind(this)
        this.clearHistory = this.clearHistory.bind(this)
    }
    toResult(keyWords){
        this.props.history.push('/index/result',{
            key_words:keyWords
        })
    }
    toSearch(){
        let keyWords=this.refs.keyWords.value
        if(!keyWords) return;
        let ls = localStorage;
        if(ls.getItem('SearchHistory')){
            let shArr = JSON.parse(ls.getItem('SearchHistory'));
            if(shArr.indexOf(keyWords)>-1) return;
            shArr.push(keyWords);
            ls.setItem('SearchHistory',JSON.stringify(shArr))
        }else{
            ls.setItem('SearchHistory',JSON.stringify([keyWords]))
        }
        this.props.history.push('/index/result',{
            key_words:keyWords
        })
    }
    clearHistory(){
        localStorage.removeItem('SearchHistory')
        this.setState({
            historylist:[]
        })
    }
    render(){
        return (
            <div id="search">
                <header>
                    <div>
                        <span className="iconfont icon-sousuo"></span>
                        <input type="text" ref="keyWords" placeholder="搜索你想要的商品"/>
                    </div>
                    <p onClick={this.toSearch}>搜索</p>
                </header>
                <section className="search-recently">
                    <div>
                        <p>最近搜索</p>
                        <span className="iconfont icon-shanchu" onClick={this.clearHistory}></span>
                    </div>
                    {this.state.historylist.length == 0 ? <p>无搜索历史</p>:
                        <ul>
                            {
                                this.state.historylist.map((item,index)=>{
                                    return <li key={index} onClick={()=>{this.toResult(item)}}>{item}</li>
                                })
                            }
                        </ul>
                    }
                </section>
                <section className="search-everyone">
                    <div>
                        <p>大家都在搜</p>
                    </div>
                    <ul>
                        <li>巧克力</li>
                    </ul>
                </section>
            </div>
        )
    }
    componentDidMount(){
        if(localStorage.getItem('SearchHistory')){
            this.setState({
                historylist:JSON.parse(localStorage.getItem('SearchHistory'))
            })
        }
    }
}
export default Search