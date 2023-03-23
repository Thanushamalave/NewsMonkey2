import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description,imgUrl,newsUrl,author,date,source} = this.props
    return (
      <div className='container my-3'>
        <div className="card" >
            <img src={!imgUrl?"https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bG9hZGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80":imgUrl} className="card-img-top" alt="..." style={{height: "12rem"}} />
            <div className="card-body">
              <h5 className="card-title">{title}...<span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'80%',zIndex:'1'}}>
              {source}</span></h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small class="text-muted">By {author? author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More..</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
