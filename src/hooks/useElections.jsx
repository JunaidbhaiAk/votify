import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { getAllElections } from '../utils/web3';

const useElections = () => {
  const [elections,setElections] = useState([]);
  const [isLoading,setisLoading] = useState(true);
  useEffect(() => {
    getAllElections().then((data) => {
        const combinedData = data[0].map((ele,idx) => ({
          name:ele,
          role: data[1][idx],
          timestamp:data[2][idx],
          isActive:data[3][idx],
        }))
        setElections(combinedData);
        setisLoading(false);
    })

    return(() => {
        setElections([]);
        setisLoading(true);
    })
  },[])
  return [elections,isLoading];
}

export default useElections;