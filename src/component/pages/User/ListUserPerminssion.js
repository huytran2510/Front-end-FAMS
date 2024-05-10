import React, { Component ,useState  } from "react";
import UserPerminssionService from "../../../services/userPermission.service";
import "../../../css/listUser.css";
import "../../../css/listPermission.css";
import "@fortawesome/fontawesome-free/css/all.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { PersonFill } from 'bootstrap-icons-react';
import Create from "../../../img/add.png"
import FullAccess from "../../../img/grade.png"
import View from "../../../img/visibility.png"
import AccessDenied from "../../../img/visibility_off.png"
import Modify from "../../../img/create.png"

import { Button, Dropdown,Container   } from 'react-bootstrap';

class UserPermissionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPermissions: [],
      userPermissionUpdate:[],
      editingUser: null,
      isDropdownActive: false,
      editedPermissions: {},
      selectedOptions: {},
      isEditing: false
    };
  }

    retrieveUsers() {
    UserPerminssionService.getUserPermissions()
        .then((response) => {
          this.setState({
            userPermissions: response.data,
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


    handleEditClick = () => {
      this.setState(prevState => ({
        isEditing: true
      }));
    };

    handleOptionChange = (e, userId, permission) => {
      const { selectedOptions } = this.state;
      const options = e.target.options;
      const selectedValues = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedValues.push(options[i].value);
        }
      }
      
      this.setState(prevState => ({
        selectedOptions: {
          ...prevState.selectedOptions,
          [userId]: {
            ...prevState.selectedOptions[userId],
            [permission]: selectedValues // Cập nhật selectedOptions cho select box tương ứng
          }
        }
      }));
      // this.handlePermissionChange(permission, selectedValues);

      this.updateUserPermissions(userId, permission, selectedValues);
    };

    updateUserPermissions = (userId, permission, value) => {
      const stringValue = value.join(', ');
      console.log(stringValue)
      this.setState(prevState => ({
        userPermissions: prevState.userPermissions.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              [permission]: stringValue
            };
          }
          return user;
        })
      }));
    };

    // handlePermissionChange = (permission, value) => {
    //   this.setState(prevState => {
    //     const editedPermissions = { ...prevState.editedPermissions };
    //     editedPermissions[permission] = value;
    //     return { editedPermissions } ;
    //   });
    // };
    

    handleSaveClick = async () => {
      // Handle saving logic here
      this.setState({ isEditing: false });
      const { userPermissions } = this.state;
      const responseData = [];
      for (const user of userPermissions) {
        try {
          console.log(user);
          const response = await UserPerminssionService.updateUserPermissions({
            id: user.id,
            syllabus: user.syllabus,
            learningMaterial: user.learningMaterial,
            classes: user.classes,
            trainingProgram: user.trainingProgram,
            userManagement: user.userManagement,
          });
          userPermissions.push(response.data);
          // this.setState({ userPermissions });
        } catch (error) {
          console.error("Error updating user permissions:", error);
        }
      }
      // console.log(responseData)
    };

    renderCell = (user, permissionValue, permission) => {
      const { isEditing, selectedOptions } = this.state;
      const selectedValue = this.state.editedPermissions[permission] || permissionValue;
      const id = `${user.id}-${permission}`;
      if (isEditing &&  !["TRAINER", "CLASS_ADMIN", "SUPER_ADMIN"].includes(permissionValue)) {
        return (
          <select
            id={id}
            value={selectedOptions[user.id]?.[permission] || permissionValue} // Sử dụng selectedOptions tương ứng với user và permission
            onChange={(e) => this.handleOptionChange(e, user.id, permission)}
            className="form-select rounde"
            >
            <option value="VIEW">View</option>
            <option value="ACCESS_DENIED">Access Denied</option>
            <option value="CREATE">Create</option>
            <option value="MODIFY">Modify</option>
            <option value="FULL_ACCESS">Full Acces</option>
            {/* Add more options here */}
          </select>
        );
      } else {
        return (
          <div>{this.renderIconRole(selectedValue)}</div>
        );
      }
    };
  
    
    renderIconRole(role) {
      if (role === 'ACCESS_DENIED') {
        return <div><img src={AccessDenied} alt="Sort Icon" /> Access Denied</div>;
      } else if (role === 'VIEW') {
        return <div ><img src={View} alt="Sort Icon" /> View</div>;
      } else if (role === 'MODIFY') {
        return <div><img src={Modify} alt="Sort Icon" /> Modify</div>;
      } else if (role === 'CREATE') {
        return <div><img src={Create} alt="Sort Icon" /> Create</div>;
      } else if (role === 'FULL_ACCESS') {
        return <div ><img src={Create} alt="Sort Icon" /> Full Access</div>;
      } else {
        return <div>{role}</div>
      }
    }

  render() {
    const { userPermissions } = this.state;
    return (
      <div className="container-list-user">
        <h2>User Permission</h2>
        <div className="container ">
            <Button className="mb-3 float-right updatePermission" onClick={this.handleEditClick}>
                          Update Permission
            </Button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="small-column">Role Name </th>
              <th className="large-column">Syllabus </th>
              <th className="large-column">Training Program </th>
              <th className="medium-column">Class </th>
              <th className="small-column">Learning Material </th>
              <th className="medium-column">User </th>
            </tr>
          </thead>
          <tbody>
            {userPermissions.length === 0 ? (
              <tr>
                <td colSpan="5">No users found</td>
              </tr>
            ) : (
              userPermissions.map((user) => (
                <tr key={user.id}>
                  <td>{this.renderCell(user, user.role, 'role')}</td>
                  <td>{this.renderCell(user, user.syllabus, 'syllabus')}</td>
                  <td>{this.renderCell(user, user.trainingProgram, 'trainingProgram')}</td>
                  <td>{this.renderCell(user, user.classes, 'classes')}</td>
                  <td>{this.renderCell(user, user.learningMaterial, 'learningMaterial')}</td>
                  <td>{this.renderCell(user, user.userManagement, 'userManagement')}</td>
                </tr>
              ))
            )}  
          </tbody>
        </table>
        <Button className="mb-3 float-right savePermission" onClick={this.handleSaveClick}>
                          Save
            </Button>
      </div>
      
      
    );
  }
}
export default UserPermissionList;
