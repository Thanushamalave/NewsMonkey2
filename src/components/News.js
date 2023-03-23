import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
export class News extends Component {
  static defaultProps={
    country: 'in',
    pageSize:8,
    category:'general'
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
  async updateNews(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7eed46247be24d0cb91cdc1aece01d8c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true}) ;
    let data= await fetch(url);
    let parsedata=await data.json();
    console.log(parsedata);
    this.setState({articles:parsedata.articles,
      totalResults:parsedata.totalResults,
    loading: false});
  }

  handlePrevClick=async ()=>{
  //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7eed46247be24d0cb91cdc1aece01d8c&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true}) ;
  //   let data= await fetch(url);
  //   let parsedata=await data.json();
  //   console.log(parsedata);
  // this.setState({
  //   page:this.state.page-1,
  //   articles: parsedata.articles,
  //   loading: false
  // });
  this.setState({page:this.state.page-1});
  this.updateNews();
  }
   handleNextClick=async()=>{
  //   if(!(Math.ceil(this.state.totalResults/this.props.pageSize)< this.state.page+1)){
  //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7eed46247be24d0cb91cdc1aece01d8c&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  //       this.setState({loading:true}) ;
  //       let data= await fetch(url);
  //       let parsedata=await data.json();
  //       console.log(parsedata);
  //     this.setState({
  //       page:this.state.page-1,
  //       articles: parsedata.articles,
  //       loading: false
  //     })
      
  // }
  this.setState({page:this.state.page+1});
  this.updateNews();
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
    constructor(props){
        super(props);
        this.state={
            articles : [],
            loading : false,
            page:1,
            totalResults:0
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    
    async componentDidMount(){
      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7eed46247be24d0cb91cdc1aece01d8c&page=1&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true}) ;
      // let data= await fetch(url);
      // let parsedata=await data.json();
      // console.log(parsedata);
      // this.setState({articles:parsedata.articles,
      //   totalResults:parsedata.totalResults,
      // loading: false});
      this.updateNews();
    }
    
  render() {
    return (
      <div className='container my-3'>
      <h1 className='text-center' style={{margin:'40px 0px'}}>NewsMoney Top {this.capitalizeFirstLetter(this.props.category)} HeadLines</h1>
      {this.state.loading && <Spinner />} 
     
     <div className='row'>
      
      {this.state.articles.map((element)=>{
        return <div className='col-md-4' key={element.url}>
        <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>
      })}
       </div> 
       
      <div className='container d-flex justify-content-between'>
       <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
       <button disabled={Math.ceil(this.state.totalResults/this.props.pageSize)< this.state.page+1} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
    </div>
    )
  }
}

export default News
