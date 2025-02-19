import React from "react";

export const Tab = ({ label, active, onClick }) => (
    <button
      className={`py-2 px-4 ${
        active ? "border-b-2 border-blue-500" : "text-gray-500"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
  
const Tabs = ({ tabs, activeTab, onTabClick }) => (
  <div className="flex space-x-4 border-b">
    {tabs.map((tab) => (
      <button
        key={tab}
        className={`py-2 px-4 ${activeTab === tab ? "border-b-2 border-blue-500" : ""}`}
        onClick={() => onTabClick(tab)}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default Tabs;