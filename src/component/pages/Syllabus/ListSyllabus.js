import React, { Component } from "react";
import UserService from "../../../services/user.service";
import AuthService from "../../../services/auth.service";
import "../../../css/listUser.css";
import "@fortawesome/fontawesome-free/css/all.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { PersonFill } from 'bootstrap-icons-react';
import sortIcon from "../../../img/sort.png"

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentPage: 1,
      usersPerPage: 5,
    };
  }

  retrieveUsers() {
      UserService.getUsers()
        .then((response) => {
          this.setState({
            users: response.data.content,
          });
          console.log(response);
        })
        .catch((error) => {
          console.error("Error retrieving users:", error);
        });
    }

      componentDidMount() {
      this.retrieveUsers();
    }

  render() {
    const { users, currentPage, usersPerPage } = this.state;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }
    console.log("user : " ,users);
    console.log(pageNumbers)

    function renderColorCircle(role) {
      if (role === 'Admin') {
        return <div className="rounded-pill" style={{backgroundColor : '#4DB848' , color:'white', width : "100%", textAlign : 'center'}}>Admin</div>;
      } else if (role === 'TRAINER') {
        return <div className="rounded-pill" style={{backgroundColor : '#0B2136' , color:'white', width : "100%", textAlign : 'center'}}>Trainer</div>;
      } else {
        return <div className="rounded-pill">{role}</div>;
      }
    }

    function renderIconGender(gender) {
        if(gender === "MALE") {
            return  <PersonFill style={{ color: '#2D3748' }} />;
        } else {
            return  <PersonFill style={{ color: 'red' }} />;
        }
    }
    
    return (
      <div className="container-list-user">
        <h2>User Management</h2>

        <div class="row">
          <div class="col">
            <div class="input-group mb-3">
              <span class="input-group-append custom-btn">
                <button class="btn btn-outline border-end-0 border custom-btn">
                  <i class="fa fa-search"></i>
                </button>
              </span>
              <input
                className="form-control border-start-0 border"
                type="search"
                id="search-input"
                placeholder="Search by.."
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="filter"
                >
                  Filter <i className="fas fa-filter"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <i class="bi bi-heart-fill"></i>
        <table className="table">
          <thead>
            <tr>
              <th className="small-column">ID <img src={sortIcon} alt="Sort Icon" /></th>
              <th className="large-column">Name <img src={sortIcon} alt="Sort Icon" /></th>
              <th className="large-column">Email <img src={sortIcon} alt="Sort Icon" /></th>
              <th className="medium-column">Date of Birth <img src={sortIcon} alt="Sort Icon" /></th>
              <th className="small-column">Gender <img src={sortIcon} alt="Sort Icon" /></th>
              <th className="medium-column">Type <img src={sortIcon} alt="Sort Icon" /></th>
              <th className="small-column"></th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5">No users found</td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.dob).toLocaleDateString()} </td>
                  <td>{renderIconGender(user.gender)}</td>
                  <td>{renderColorCircle(user.role)}</td>
                  <td>
                    <div className="dropdown">
                        <button className="btn dropdown" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        ...
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                    </td>
                </tr>
                
              ))
            )}  
          </tbody>
        </table>
        Pagination
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <a
                href="#"
                onClick={() => this.setState({ currentPage: number })}
                className="page-link"
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default UserList;
