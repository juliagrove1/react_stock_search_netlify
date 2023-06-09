import React, { useState } from 'react'
import axios from 'axios'
import './App.css';


function App() {
  
  const [data,setData] = useState({})
  const [sym, setSymbol] = useState('')
  const [printSym, setPrint] = useState('')
  const [symNews, setSymNews] = useState([])
  const [symNewsImg, setSymNewsImg] = useState([])
  const [symNewsUrl, setSymNewsUrl] = useState([])
  const [symNews2, setSymNews2] = useState([])
  const [symNewsImg2, setSymNewsImg2] = useState([])
  const [symNewsUrl2, setSymNewsUrl2] = useState([])

  const URL = `https://finnhub.io/api/v1/quote?symbol=${sym}&token=cg781v1r01qus5fl0orgcg781v1r01qus5fl0os0`
  const SYM_NEWS = `https://finnhub.io/api/v1/company-news?symbol=${sym}&from=2023-06-01&to=2023-07-30&token=cg781v1r01qus5fl0orgcg781v1r01qus5fl0os0`

  
  const fetchCompanyNews = async () => {
    return axios.get(SYM_NEWS)
      .then(response => {
        setSymNews(response.data[0].headline)
        setSymNewsImg(response.data[0].image)
        setSymNewsUrl(response.data[0].url)

        setSymNews2(response.data[1].headline)
        setSymNewsImg2(response.data[1].image)
        setSymNewsUrl2(response.data[1].url)

        console.log(response.data[0].headline)
        return response.data[0].headline;
      })
      .catch((err) => {
        console.error(err);
      })
  }
  // use effect loads on page load 

  const handleSubmit=(e)=> {
    e.preventDefault();
    axios.get(URL).then((response) => {
      setData(response.data)
      console.log(response.data)
      })
      .catch((err) => console.log(err));
      setPrint(sym);
      fetchCompanyNews();
     
    }
  return (
    
    <div className="app">
    
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans&family=Josefin+Sans:wght@500;600&family=Poppins:wght@200&display=swap');
      </style>

      <form onSubmit={handleSubmit}>
          <div className = "search">
            <input
              type="text"
              name="sym"
              placeholder="enter symbol"
              onChange={(e)=> {
                setSymbol(e.target.value);}}/>
              <button>Enter</button>
          </div>
      </form>
    <div className="seperate">

      {data.c === undefined && 
      <div className="container">
        <div className="welcome">
            <p>Enter a stock symbol to retrieve data</p>
        </div>
      </div>
      }

      {data.c !== undefined &&
        <div className="container"> 
        <div className="topLeft">
          <div className="symbol">
           <p>{printSym.toUpperCase()}</p>
          </div>
          <div className="qAndDaily">
              <div className="quote">
                  <h1>{data.c}</h1>
             </div>
            <div className="priceChange">
              <div className ="negChange">
                {data.d < 0 &&
                  <h1>{data.d} ({data.dp}%)</h1>
                }
              </div>
              <div className="posChange">
                {data.d > 0 &&
                  <h1>+{data.d} ({data.dp}%)</h1>
                }
              </div>
            </div>
          </div>  
        </div>
          <div className="topRight">
            <div className="openClose">
              <h4>prev close: {data.pc}</h4>
              <h4>open: {data.o}</h4>
            </div>

            <div className="highLow">
              <h4>todays high: {data.h}</h4>
              <h4>todays low: {data.l}</h4>
              </div>
          </div>
          <div className="newsheadline">
          <p>Headlines:</p>
             <div className="symbolnews1">
                <img src={symNewsImg} alt=" "></img>
                  <a href={symNewsUrl}>{symNews}</a>
             </div>

             <div className="symbolnews1">
                <img src={symNewsImg2} alt=" "></img>
                  <a href={symNewsUrl2}>{symNews2}</a>
             </div>

             </div>
        </div>


        
              }
        </div>
        
    </div>
  );
}

export default App;
