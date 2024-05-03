import React, { useState } from "react";
import logo from "../assets/logo.png";
import task from "../assets/task.png";
import setting from "../assets/setting.png";
import logout from "../assets/logout.png";
import { Link, useNavigate } from "react-router-dom";

export const Sidebar = ({ handleFilter, handleCategoryFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(" Categories");
  const options = [
    { value: "All", label: "All Tasks" },
    { value: "Home", label: "Home" },
    { value: "School", label: "School" },
    { value: "Training", label: "Training" },
    { value: "Other", label: "Other" },
  ];

  const handleSelect = (option) => {
    setSelectedItem(option.label);
    setIsOpen(false);
    if (option.value === "All Tasks") {
      handleFilter("All");
      handleCategoryFilter("All");
    } else {
      handleCategoryFilter(option.value);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <section className="sidebar">
      <div className="logo">
        <img src={logo} alt="" />
      </div>

      <div className="menu">
        <div className="all-Task">
          <img src={task} alt="" />
          <button onClick={() => handleSelect(options[0])}>
            {options[0].label}
          </button>
        </div>

        <div className="select">
          <div
            className={`select-selected ${isOpen ? "select-arrow-active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedItem}
          </div>
          <div className={`select-items ${isOpen ? "" : "select-hide"}`}>
            {options.slice(1).map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className={
                  selectedItem === option.label ? "same-as-selected" : ""
                }
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>

        <div className="setting">
          <img src={setting} alt="" />
          <h1>Setting</h1>
        </div>
      </div>

      <div className="logout">
        <img src={logout} alt="" />
        <button onClick={handleLogout}>Logout</button>
      </div>
    </section>
  );
};

export default Sidebar;
