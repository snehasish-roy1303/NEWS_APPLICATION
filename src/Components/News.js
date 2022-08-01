import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Searchbar from "./Searchbar";

const News =(props)=> {

 

  const [articles, Setarticles]=useState([])
  const [loading, Setloading]=useState(true)
  const [page, Setpage]=useState(1)
  const [totalResults, SettotalResults]=useState(0)

  const capitalizefirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const yesterday_date=()=>{
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    console.log(yesterday);

    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
      return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-');
    }

    console.log(formatDate(yesterday));

  }

  const updateNews = async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/everything?q=${props.category}&from=${yesterday_date}&sortBy=publishedAt&searchIn=title,content&language=en&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    Setloading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    Setarticles(parsedData.articles)
    SettotalResults(parsedData.totalResults)
    Setloading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `News-4-U | ${capitalizefirstletter(props.category)}`;
      updateNews();
  }, [])
  

const fetchMoreData = async () => {  
    const url = `https://newsapi.org/v2/everything?q=${props.category}&from=2022-07-02&sortBy=publishedAt&searchIn=title,content&language=en&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    Setpage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json()
    Setarticles(articles.concat(parsedData.articles))
    SettotalResults(parsedData.totalResults)
  };

  

    return (
      <div className="container "style={{color: props.mode==='dark'?'white':'#042723'}}>
        
        <h1 className="text-center" style={{ margin: "40px 0px", marginTop: '90px' }}>
          {" "}News-4-U: Top{` ${capitalizefirstletter(props.category)}`} Headlines
        </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
        >
            <div className="container">
            <div className="row">
                {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                    <NewsItem
                        title={element.title ? element.title.slice(0, 40) : ""}
                        description={element.description? element.description.slice(0, 90): ""}
                        imageUrl={element.urlToImage}
                        newsurl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name} mode={props.mode}/>
                    </div>
                })}
            </div>
          </div>
        </InfiniteScroll>
        {articles.length===0?<h1 className="text-center">No news to show in this topic</h1>:''}
      </div>
    )
  }



News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
