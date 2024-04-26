import React, { Component } from 'react';
import './App.css';
import './css/font.css'
import Header from './component/layout/header.js'; // Assuming the component name is 'Header' and the file extension is '.js'
import Navbar from './component/layout/navbar.js'
import Footer from './component/layout/footer.js'
import 'bootstrap'
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './component/Login'

// const App = () => {
//   return (
//     <div className="app-container">
//       <header className='header'>
//         <Header />
//       </header>
//       <div className='content'>
//         <div className='side-bar'>
//           <Navbar />
//         </div>
//         <div className="main-content">
//           {/* Main content goes here */}
//         </div>
//       </div>
//       <footer className='footer' >
//         <Footer />
//       </footer>
//     </div>
//     <Login></Login>
//   );
// };

// export default App;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      loading: true
    };
  }

  handleLogin = () => {
    this.setState({ isLoggedIn: true, loading: false });
  }

  render() {
    const { isLoggedIn, loading } = this.state;

    if (!isLoggedIn && loading) {
      return <Login onLoginSuccess={this.handleLogin} />;
    }

    return (
      <div className="app-container">
        <header className='header'>
          <Header />
        </header>
        <div className='content'>
          <div className='side-bar'>
            <Navbar />
          </div>
          <div className="main-content">
            {/* Main content goes here */}
          </div>
        </div>
        <footer className='footer'>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;