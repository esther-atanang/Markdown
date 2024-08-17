import React from 'react'
import { preview } from '../utils'
import Markdown from 'react-markdown';
import { useState } from 'react';

const MarkdownInterface = ({onChange,currID, text,onOpen}) => {

  return (
    <div className='markdown'>
      <div className='markdown__title-bar'>
        <p className='markdown__title'>Markdown</p>
        <button className='btn' onClick={onOpen}><img className="markdown_title-icon icon icon--hover" src={preview}/></button>
      </div>
      <textarea className='markdown__text-area' onChange={(e)=>onChange(e,currID)} value={text}  maxLength={5000} name="" id="" disabled={currID == -1 ? true : false}></textarea>  
    </div>
  )
}

export default MarkdownInterface;

export const Preview = ({text,onOpen}) => {
  return(
    <div className='preview'>
      <div className='markdown__title-bar'>
        <p className='markdown__title'>Preview</p>
       <button className='btn'  onClick={()=>onOpen(value=>!value)}><img className="markdown_title-icon icon icon--hover"src={preview}/></button> 
      </div>
      <div className='_prev'><Markdown>{text}</Markdown></div>
    </div> 
  )
}
