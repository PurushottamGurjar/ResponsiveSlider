import React, { useRef, useState } from 'react'
import "./slider.css"

const Slider = () => {
    const [leftWidth, setLeftWidth]=useState(50);
    const isSliding =useRef(false);
    const parentRef=useRef(null);

    const HandleMouseDown=()=>{
        isSliding.current=true;
        document.addEventListener('mousemove', HandleMouseMove);
        document.addEventListener('mouseup', HandleMouseUp);
    }
    const HandleMouseMove =(event)=>{
        if(!isSliding || !parentRef.current) return;
        const parentWidth=parentRef.current.offsetWidth;
        const newWidth=(event.clientX/parentWidth)*100;
        if(newWidth>5 && newWidth<95){
            setLeftWidth(newWidth);
        }
    }
    const HandleMouseUp=()=>{
        isSliding.current=false;
        document.removeEventListener('mousemove', HandleMouseMove);
        document.removeEventListener('mouseup', HandleMouseUp);
    }


    const child2Ref=useRef(null);
    const [height,setHeight]=useState(50);
    const isHtSliding=useRef();

    const vtmsDown=()=>{
        isHtSliding.current=true;
        document.addEventListener('mousemove', vtmsmove);
        document.addEventListener('mouseup',vtmsup);
    }
    const vtmsmove=(e)=>{
        if(!isHtSliding || !child2Ref.current) return;
        const ht=child2Ref.current.offsetHeight;
        const newheight=(e.clientY/ht)*100;
        setHeight(newheight);

    }
    const vtmsup=()=>{
        isSliding.current=false;
        document.removeEventListener('mousemove',vtmsmove);
        document.removeEventListener('mouseup',vtmsup);

    }

  return (
    <>
        <div  ref={parentRef} className= "parent">
            <div className="child1" style={{width:`${leftWidth}vw`}} > Child 1</div>
            <div className="slider" onMouseDown={HandleMouseDown}/>
            <div ref={child2Ref} className="child2" style ={{width:`${100-leftWidth-2}vw`}}>
                <div className="child2first" style={{height:`${height}vh`}}></div>
                <div  onMouseDown={vtmsDown}  className="vtslider"/>
                <div className="child2second" style={{height:`${100-height-2}vh`}}></div>
            </div>
        </div>
       
    </>
  )
}

export default Slider;
