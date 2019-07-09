import React from 'react';

const FileContainer = (props) =>
{
   return     <li style={{cursor: 'pointer'}} className={props.class}  onClick={props.clicked}>Document#{props.id}<br></br> {props.file}</li>
}


export default FileContainer;