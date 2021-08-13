import React, { useState, useEffect, useRef } from "react";
import Pie from "../visxs/components/Pie";

const PieChart = ({ data, options }) => {
  console.log('pie',data,options)
  const { title } = options
  let originData = []
  if(data.length && title){
    originData = data[0].find(v=>v.value === title)?.data
  }
  console.log('originData',originData)
  return (
    <div>
      <Pie width={300} height={300} data={originData}></Pie>
    </div>
  );
};

export default PieChart