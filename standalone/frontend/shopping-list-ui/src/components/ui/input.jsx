import React from "react";

const Input = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full p-2 border rounded-lg"
  />
);

export default Input;