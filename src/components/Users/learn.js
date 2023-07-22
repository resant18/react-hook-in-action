import React, { useState, useEffect } from "react";

export const ResizeWindow = () => {
   const getSize = () => {
      return {
         width: window.innerWidth,
         height: window.innerHeight,
      };
   };

   const [size, setSize] = useState();
   // console.log("before resize");

   // run once at component  mounted
   useEffect(() => {
      document.title = "INIT";
      const handleResize = () => {
         setSize(getSize());
         // console.log("after resize", size);
      };
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
   }, []);

   useEffect(() => {      
      if (size) {
         if (size.width <= 500) document.title = "SMALL";
         else if (size.width > 500 && size.width < 800) document.title = "MEDIUM";
         else document.title = "LARGE";
      }
   }, [size]);

   return <p>Width: {size ? size.width : ""}, Height: {size ? size.height : ""}</p>
   //return (<p>Test</p>)
};
