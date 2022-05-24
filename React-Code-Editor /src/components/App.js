import React, { useState, useEffect} from 'react';
import RefreshIcon from './Icons/RefreshIcon';
import CodeIcon from './Icons/CodeIcon';
import Editors from "./Editors";


import './App.css';

const App = () => {
 const startCode = {
   xml: '',
   javascript: null,
   css:null
 } 
 
 const [srcCode,setSrcCode] = useState(startCode);
  const [srcDoc,setSrcDoc] = useState("");
  const [refresh, setRefresh] = useState(false);


  
 const refreshHandler = () =>{
    setRefresh(true);

    const timeout = setTimeout(() => {
       setRefresh(false); 
       setSrcDoc("");
      
    }, 1500);
    return () => clearTimeout(timeout);

 }


 const transferCodeHandler = (val, mode) => {
   if(mode === 'xml'){
    setSrcCode(prev => {
      return {...prev, xml: val};
    })
   }
  else if(mode === 'javascript'){
    setSrcCode(prev => {
      return {...prev, javascript: val};
    })
   }
 else{
   setSrcCode(prev => {
      return {...prev, css: val};
    })
  }      
 }

 useEffect(() => {
    const timeout = setTimeout(() => {
     const srcDocString = ` 
      <html>
        <style>${srcCode.css}</style>
        <body>${srcCode.xml === null || srcCode.xml === undefined ? '': srcCode.xml}</body>
        <script>${srcCode.javascript}</script>
      </html>
     `;
     setSrcDoc('data:text/html,' + encodeURIComponent(srcDocString));

    }, 1000);
    return () => clearTimeout(timeout);
  },[srcCode.css, srcCode.xml, srcCode.javascript, setSrcDoc])

  

  return (
      <div>
       <div className='main-header'>
        <div className='center'>
            <span className='codeIcon'>
              <CodeIcon />
            </span>
            <h1>Code Editor</h1>
          </div> 
          <div className='refreshIcon' onClick={refreshHandler}>
            <RefreshIcon /> 
          </div> 
       </div>

        <Editors transferCode={transferCodeHandler} refresh={refresh}/>

       <div>
         <iframe
           className="frame"
           title="online Ide"
           src={srcDoc}
           height='360px'
           width="100%"
          ></iframe>
       </div>
     
    </div>
  );
};

export default App;
