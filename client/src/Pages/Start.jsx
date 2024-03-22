import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';


function Start() {
  const fetchGameData = async () => {
    const url = process.env.REACT_APP_SERVER_START;
    const options = {
      method: "GET",
      credentials: "include",
    };

    try {
      const responce = await fetch(url, options);
      console.log(responce);
    } catch (error) {
      
    } finally{

    }
  }

  useEffect(() => {
    fetchGameData();
  }, [])

  return (
    <div className='border-2 border-red-600 w-screen h-screen'>
      <h1>Loading...</h1>
    </div>
  )
}

export default Start