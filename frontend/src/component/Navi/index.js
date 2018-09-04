import React from 'react';
import PropsType from 'prop-types'
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavItem } from 'react-bootstrap';

const Navigation = props =>{
    console.log(props.isLoggedIn)
    return (
      <div>
      <Navbar default collapseOnSelect>
      <Navbar.Header>
      <Navbar.Brand>
              <Link to ="/">React Project </Link> 
          </Navbar.Brand>
      <Navbar.Toggle />
      </Navbar.Header>    
      <Navbar.Collapse>
          <Nav pullRight>
          <NavItem eventKey={1} href="/Home">Home</NavItem>

          <NavItem eventKey={2} href="/feed">News</NavItem>
          <NavItem eventKey={2} href="/test">test</NavItem>
          <NavItem eventKey={3} href ="/people">People</NavItem>
          { props.isLoggedIn ? <Menu1  /> : <Menu2 /> }
          </Nav>
      </Navbar.Collapse>    
      </Navbar>   
      </div>
    )
}
Navigation.PropsType = {
  isLoggedIn : PropsType.bool.isRequired
};

export const Menu1 = () => (
  <Nav>
  <NavItem eventKey={2} href="/About">My Account</NavItem>
  <NavItem eventKey={3} href ="/Movie">DashBoard</NavItem>
  </Nav>
)       

export const Menu2 = () => (
  <Nav>
  <NavItem eventKey={2} href="/About">Login </NavItem>
  <NavItem eventKey={3} href ="/Movie">Sign up </NavItem>
  </Nav>
)       

export default Navigation