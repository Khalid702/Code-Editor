import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/css/css.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/xml/xml.js";
import './Editor.css';
import ExpandIcon from "./Icons/ExpandIcon";
import CssIcon from "./Icons/CssIcon";
import HtmlIcon from "./Icons/HtmlIcon";
import JsIcon from "./Icons/JsIcon";
import {Controlled as CodeMirror} from 'react-codemirror2';
import React, { useState, useEffect } from 'react';


const Editor = (props) => {
 const [val, setVal] = useState();
 const [resize,setResize] = useState('expand');
 let editorTitle;
 let editorSymbol;
 


//sending that data to app componenet
useEffect(() => {
  const timeout = setTimeout(() => {
    if(props.refresh === true){
      setVal(null);
      props.transferCode(undefined, undefined);

    } 
    else{
      props.transferCode(val, props.options.mode)
     };
    }, 1000);
 
    return () => clearTimeout(timeout);
  },[val, props])  


 const resizeHandler = () => {
   if(resize === 'shrink'){
      props.resize(props.loc, {y: 'mid', x:2})
      setResize('expand');      
   }else if(resize === 'expand'){
       props.resize(props.loc,{y: 'small',x:1})
      setResize('shrink');  
  } 
   //props.edit(resize);
 }

 if(props.options.mode === 'xml'){
   editorTitle = 'HTML';
   editorSymbol = <HtmlIcon />;
 }
 else if(props.options.mode === 'javascript'){
  editorTitle = 'JS';
  editorSymbol = <JsIcon />;
 }
 else{
   editorTitle = 'CSS';
   editorSymbol = <CssIcon />;
 }  

 return (
   <div className={`${props.size.y} box`}>
    <div className={`header ${resize}Header`}> 
     <span className='icon'> {editorSymbol} </span>
      <p>{editorTitle}</p>
     <span onClick={resizeHandler} className='icon collapse'>
       <ExpandIcon /> 
      </span>
    </div>
    <div class="limit">  	
    <CodeMirror
       class='CodeMirror-scroll'
       value={val}
       options={props.options}
       onBeforeChange={(editor, data, value) => {
          setVal(value);
       }}
    onChange={(editor, data, value) => {
     }}
   />
   </div>
  </div>

 )
}

export default Editor;