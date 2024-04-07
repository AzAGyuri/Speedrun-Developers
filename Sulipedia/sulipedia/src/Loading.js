import React from 'react';
import './Loading.css';


export function Loading() {
  return (
    <div className="loading">
      <div className="spinner"></div>
    </div>
  );
}
/**import React from 'react';
import './Loading.css';
import Box from "@mui/material/Box";
import shrek from "./resources/shrek.jpg";

export function Loading() {
  return (

    <div className="loading">
      <Box className="spinner">
        <img src={shrek} alt="Loading" />
      </Box>

      <p>Loading...</p>
    </div>

  );
} 
 */