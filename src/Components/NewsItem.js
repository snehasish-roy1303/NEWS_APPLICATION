import React from 'react'

const NewsItem =(props)=>{
    let {title, description, imageUrl,newsurl,author, date, source, mode} = props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', left: '0'}}>
            <span className='badge rounded-pill bg-danger'>{source}</span>
          </div>
            <img src={imageUrl?imageUrl:"https://pbs.twimg.com/profile_images/1108430392267280389/ufmFwzIn_400x400.png"} className="card-img-top" alt="..."
            style={{width: '100%', height: '250px'}}/>
            <div className="card-body" 
            style={{color: mode==='dark'?'white':'#042723', backgroundColor: mode==='dark'?'#042723':'white'}}>
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className='card-text'>
                  <small>By {!author?"Unknown":author} on {new Date(date).toLocaleTimeString()}</small>
                </p>
                <a href={newsurl} target="_blank" className={`btn btn-primary btn-${mode==='dark'?'primary':'dark'}`}>Read more</a>
            </div>
        </div>
      </div>
    )
}

export default NewsItem