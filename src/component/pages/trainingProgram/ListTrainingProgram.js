import React, { Component } from "react";
import TrainingProgramService from "../../../services/trainingProgram.service";
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
      trainingPrograms: [],
      currentPage: 1,
      usersPerPage: 5,
    };
  }

  retrieveUsers() {
    TrainingProgramService.getTrainingPrograms()
        .then((response) => {
          this.setState({
            trainingPrograms: response.data.content,
          });
          console.log(response);
        })
        .catch((error) => {
          console.error("Error retrieving trainingPrograms:", error);
        });
    }

      componentDidMount() {
      this.retrieveUsers();
    }

  render() {
    const { trainingPrograms, currentPage, usersPerPage } = this.state;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currenttrainingPrograms = trainingPrograms.slice(indexOfFirstUser, indexOfLastUser);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(trainingPrograms.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }
    console.log("trainingPrograms : " ,trainingPrograms);
    console.log(pageNumbers)

    function renderColorCircle(role) {
      if (role === 'Active') {
        return <div className="rounded-pill" style={{backgroundColor : '#2d3748' , color:'white', width : "100%", textAlign : 'center'}}>Admin</div>;
      } else if (role === 'Inactive') {
        return <div className="rounded-pill" style={{backgroundColor : '#b9b9b9' , color:'white', width : "100%", textAlign : 'center'}}>Trainer</div>;
      } else {
        return <div className="rounded-pill" style={{backgroundColor : '#285d9a' , color:'white', width : "100%", textAlign : 'center'}}>Drafting</div>;
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
              <th className="large-column">Program Name <img src={sortIcon} alt="Sort Icon" /></th>
              <th className="large-column">Created on <img src={sortIcon} alt="Sort Icon" /></th>
              <th className="medium-column">Created by <img src={sortIcon} alt="Sort Icon" /></th>
              <th className="small-column">Duration <img src={sortIcon} alt="Sort Icon" /></th>
              <th className="medium-column">Status <img src={sortIcon} alt="Sort Icon" /></th>
              <th className="small-column"></th>
            </tr>
          </thead>
          <tbody>
            {trainingPrograms.length === 0 ? (
              <tr>
                <td colSpan="5">No users found</td>
              </tr>
            ) : (
                currenttrainingPrograms.map((trainingProgram) => (
                <tr key={trainingProgram.code}>
                  <td>{trainingProgram.code}</td>
                  <td>{trainingProgram.name}</td>
                  <td>{new Date(trainingProgram.createdOn).toLocaleDateString()}</td>
                  <td>{trainingProgram.nameUser} </td>
                  <td>{trainingProgram.duration}</td>
                  <td>{renderColorCircle(trainingProgram.status)}</td>
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
