import React from "react";
import Container from "../Container/Container";
import { NavLink } from "react-router-dom";
import "./PageHeader.css";

const PageHeader = () => {
  return (
    <div className="page-header">
      <Container>
        <nav className="main-navigation">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/">Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/users">Users</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/posts">Posts</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/albums">Albums</NavLink>
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
};

export default PageHeader;
