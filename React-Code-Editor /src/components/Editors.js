import Editor from "./Editor";
import React, { useState } from 'react';


const Editors = ({transferCode,refresh}) => {
  const equalSize = [{y:'equal', x:2},{y:'equal', x:2},{y:'equal', x: 2}];
  const [size, setSize] = useState(equalSize);

  const sizeHandler = (pos,val) => {
   let array = [];
   array = array.concat(size);
   array[pos] = val;
   let Collapsed = 0;
   array.forEach(val => {
     if(val.x == 1){
       Collapsed+=1;
     }
   });


 if(Collapsed == 0){
    return setSize(equalSize);
   }

 //One collapsed
    else if(Collapsed == 1){
     for (let i = 0; i < array.length; i++) {
       if(array[i].x != 1){
       array[i] = {y: 'mid', x: 2};
       }
     } 
     array[pos] = val;
   }

   //Two collapsed
  else if(Collapsed == 2){
   for (let i = 0; i < array.length; i++) {
     if(array[i].x !== 1) {
        array[i] = {y: 'big', x:3};
      }else {
         array[i] = {y: 'small', x:1};
      }
    }
   }
   else if(Collapsed == 3){
     return setSize([{y:'equal', x:1},{y:'equal', x:1},{y:'equal', x: 1}]);
   }
  
  return setSize(array); 
  }


let style = `top-pane ${size[0].x == 1 &&  + size[1].x  == 1 && size[2].x == 1 ? 'smallpan': ''}`;

 return (
      <div className={style}>
          <Editor options={{
             mode: 'xml',
             theme: 'material',
             lineNumbers: true
          }}
           refresh={refresh}
           size={size[0]}
           transferCode={transferCode}
           resize={sizeHandler}
           loc={0}
          />  
          <Editor options={{
             mode: 'css',
             theme: 'material',
             lineNumbers: true
          }}
            refresh={refresh}
            size={size[1]}
            transferCode={transferCode}
            resize={sizeHandler}
            loc={1}
          
          />  
          <Editor options={{
             mode: 'javascript',
             theme: 'material',
             lineNumbers: true
          }}
            refresh={refresh}
            size={size[2]}
            transferCode={transferCode}
            resize={sizeHandler}
            loc={2}

          />       
       </div>
      )
    };


    export default Editors;   