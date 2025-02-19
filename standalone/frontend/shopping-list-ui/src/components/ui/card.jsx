import React from "react";


export const CardContent = ({ children }) => (
    <div className="p-4">{children}</div>
  );
  
const Card = ({ children }) => (
  <div className="p-4 bg-white rounded-lg shadow-md">{children}</div>
);

export default Card;