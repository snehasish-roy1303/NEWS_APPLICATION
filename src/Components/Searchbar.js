import PropTypes from 'prop-types'
import React, {useState, Component} from 'react'
import News from './News'
import './Searchbox_style.css'


export default function Searchbar(props){


    const handleOnChange=(event)=>{
        setText(event.target.value);
    }
    const text_setting=()=>{
      console.log(text);
      let newtext=text.toLowerCase();
      setText(newtext);
      setpasstext(text);
      
    }
    const [text, setText] = useState('');
    const [passtext, setpasstext] = useState('')
    return (
      <div style={{ margin: "40px 0px", marginTop: '90px' }}>

        <div className="container">

            <div className="row height  justify-content-center">

            <div className="col-md-8">
                <div className="search" style={{position: 'relative'}}>
                <i className="fa fa-search" style={{position: 'absolute'}}></i>
                <input type="text" value={text} onChange={handleOnChange} className="form-control" placeholder="Search news here" style={{textIndent: '25px'}}/>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={text_setting}>Search</button>
                
                </div>
            </div>
            </div>
            {passtext!="" && <News mode={props.mode} setProgress={props.setProgress} 
            apiKey={props.apiKey} key={passtext} pageSize={9} category={passtext}/>}
        </div>
        <br/>
      </div>
    )
}