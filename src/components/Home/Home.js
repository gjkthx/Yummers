import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './../Header/Header';
import ReactSlickDemo from './../Carousel/Carousel';
import './Home.css';


class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        {/* <div className='homeWelcome' >
          <div className='homeTitle' >Welcome to Yummers</div>
          <div className='homeUnderTitle' >a great way to search 1000's of recipes</div>
        </div> */}
        <div className='homeLoginHeader'>
          {!this.props.user.id ?
            <div className='loginButton'>
              <a href={process.env.REACT_APP_LOGIN} style={{ textDecoration: 'none', color: 'black' }}>
                <div className='loginText'>LogIn</div>
              </a>
            </div>
            : <div />
          }
          {/* <div className='loginButton' >LogIn</div> */}
        </div>
        <ReactSlickDemo />
        {/* <div className='carousel-container'></div> */}
      </div>
      // <div className='logoutButton'>
      // <a href='http://localhost:3001/auth/logout' style={{ textDecoration: 'none',color: 'black'}}>
      //     <div className ='loginText' >LogOut</div>
      // </a>
      // </div>
    );
  }
}
function mapStateToProps(state) { return state }
export default connect(mapStateToProps, {})(Home);
