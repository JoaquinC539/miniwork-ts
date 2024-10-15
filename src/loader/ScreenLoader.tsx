import { Backdrop, CircularProgress } from "@mui/material"
import React from "react"

type ScreenLoaderProps = {
    loading: boolean;
  }

  const ScreenLoader:React.FC<ScreenLoaderProps>=({loading})=>{
    return (
        <Backdrop
          open={loading}
          style={{ 
            zIndex: 1300,
            color: '#fff',
            display: 'flex',             
            flexDirection: 'column',     
            alignItems: 'center',        
            justifyContent: 'center'    
           }}
        >            
          <CircularProgress color="inherit" />
          <p style={{ marginTop: '16px' }}>Loading</p>
        </Backdrop>
      );
  }

  export default ScreenLoader;