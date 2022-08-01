import './App.css';

import React, {useState} from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Searchbar from './Components/Searchbar';
const App =()=> {
  const apiKey= process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)
  const [mode,setmode]=useState('light');

  const toggleMode=()=>{
    if(mode==='light')
    {
      setmode('dark');
      document.body.style.backgroundColor='#042743';
      //showalert("Dark Mode has been enabled","success");
    }
    else{
      setmode('light');
      document.body.style.backgroundColor='white';
      //showalert("Light Mode has been enabled","success");
    }
  }

    return (
      <div>
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode}/>
          <LoadingBar height={3} color='red' progress={progress}/>
          <Routes>
            <Route exact path="/" element={<News mode={mode} setProgress={setProgress} apiKey={apiKey} key="general" pageSize={9} category={'general'}/>}/>
            {<Route exact path="/searchbox" element={<Searchbar mode={mode} setProgress={setProgress} apiKey={apiKey} key="searching"/>}/>}
            <Route exact path="/business" element={<News mode={mode} setProgress={setProgress} apiKey={apiKey} key="business" pageSize={9} category={'business'}/>}/>
            <Route exact path="/india" element={<News mode={mode} setProgress={setProgress} apiKey={apiKey} key="india" pageSize={9} category={'india'}/>}/>
            <Route exact path="/entertainment" element={<News mode={mode} setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={9} category={'entertainment'}/>}/>
            <Route exact path="/general" element={<News mode={mode} setProgress={setProgress} apiKey={apiKey} key="general" pageSize={9} category={'general'}/>}/>
            <Route exact path="/health" element={<News mode={mode} setProgress={setProgress} apiKey={apiKey} key="health" pageSize={9} category={'health'}/>}/>
            <Route exact path="/science" element={<News mode={mode} setProgress={setProgress} apiKey={apiKey} key="science" pageSize={9} category={'science'}/>}/>
            <Route exact path="/sports" element={<News mode={mode} setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={9} category={'sports'}/>}/>
            <Route exact path="/technology" element={<News mode={mode} setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={9} category={'technology'}/>}/>
        </Routes>
        </Router>
      </div>
    )
}

export default App