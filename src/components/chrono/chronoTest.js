import React from "react"
import { Chrono } from "react-chrono";
import { chronoDatas } from "./chronoDatas";
import { customContent } from "./chronoCustomDatas";

const MyChrono = () => {
  //console.error(chronoDatas)

  
  return (
    <div >
      <Chrono 
        items={chronoDatas}  
        mode='HORIZONTAL' 
        parseDetailsAsHTML
        cardHeight={500} // sets the height of the timeline card to 200px
        mediaHeight={50} // sets the height of the media element to 100px
        contentDetailsHeight={200} // sets the height of the detailed text to 80px
        readMore={true} // enables the readMore function for larger chunks of text
      >{customContent}</Chrono>
    </div>
  )
}
export default MyChrono;