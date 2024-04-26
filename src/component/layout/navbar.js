import React from "react";
import "../../css/navbar.css"; // Import CSS for styling
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Navbar from 'react-bootstrap/Navbar';
// import "react-pro-sidebar/dist/css/styles.css"; // Import sidebar CSS
import Container from 'react-bootstrap/Container'
import Home from '../../img/icon-navbar/home.png'
import Book from '../../img/icon-navbar/book-open.png'
import Training from '../../img/icon-navbar/biotech.png'
import Class from '../../img/icon-navbar/school.png'
import Calendar from '../../img/icon-navbar/calendar_today.png'
import UserList from '../../img/icon-navbar/group.png'
import Folder from '../../img/icon-navbar/Folder.png'
import AuthService from "../../services/auth.service";
import 'bootstrap'



const Side = () => {
  return (
    <div>
      <div>
        <Sidebar className="nav-bar">
          <Menu>
            <MenuItem> <><img src={Home} alt="Logo" /> <span className="label-nav">Home</span> </> </MenuItem>
            
            <SubMenu label={<><img src={Book} alt="Syllabus" /><label className="label-nav">Syllabus</label></>} >
              <MenuItem> View Syllabus </MenuItem>
              <MenuItem> Create Syllabus </MenuItem>
            </SubMenu>
            
            <SubMenu label={<><img src={Training} alt="Training Program" /><label className="label-nav">Training Program</label></>} >
              <MenuItem> View Program </MenuItem>
              <MenuItem> Create Program </MenuItem>
            </SubMenu>

            <SubMenu label={<><img src={Class} alt="Class" /><label className="label-nav">Class</label></>} >
              <MenuItem> View Class </MenuItem>
              <MenuItem> Create Class </MenuItem>
            </SubMenu>

            <MenuItem> <><img src={Calendar} alt="Logo" /> <span className="label-nav">Training Calendar</span> </> </MenuItem>

            <SubMenu label={<><img src={UserList} alt="Class" /><label className="label-nav">User Management</label></>} >
              <MenuItem> User List </MenuItem>
              <MenuItem> User Permission </MenuItem>
            </SubMenu>

            <MenuItem><><img src={Folder} alt="Logo" /> <span className="label-nav">Learning Marterial</span> </>  </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      <div>
        
      </div>
    </div>
    
  );
};
export default Side;