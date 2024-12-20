import React from 'react'
import imagenews from '../assets/10224809.jpg'

const NewsItem = ({title, description, src, url}) => {
  return (
    <div>
    <div className="card bg-dark text-light mb-3 d-flex my-3 mx-3 px-2 py-2" style={{maxWidth:"345px"}}>
    <img src={src?src:imagenews} style={{height:"200px", width:"325px"}} class="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title">{title.slice(0,50)}</h5>
      <p className="card-text">{description?description.slice(0,90):" This section should provide the facts and figures that ground the story, and include where and when the story took place"}</p>
      <a href={url} className="btn btn-primary">Read More</a>
    </div>
  </div>
    </div>
  )
}

export default NewsItem