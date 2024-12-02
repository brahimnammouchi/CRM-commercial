import React, { Component,useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { menuItems } from "menuItems";
import { Nav,Dropdown } from "react-bootstrap";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const [open, setOpen] = useState(false)

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      
      <div className="sidebar-wrapper">
        {/* <Dropdown>
  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
  ACTIVITES  </Dropdown.Toggle>
        <Dropdown.Menu> <Dropdown.Item href="#/action-1">Appel téléphoniques</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Rendez-vous</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Activités</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown> */}
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li>
                    <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                    
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
