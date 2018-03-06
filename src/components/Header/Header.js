import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo } from './../duck/users';
import './Header.css';


class Header extends Component {
    // constructor(){
    //     super()

    // }

    componentDidMount() {
        this.props.getUserInfo()
    }
    render() {
        console.log('header props', this.props)
        return (
            <div className='header' >
                <div className='chef'>
                    <div className='chefHat'></div>
                    <div className='chefMoustache'></div>
                </div>
                <div className='headerText'>
                    <Link to='/' style={{ textDecoration: 'none', color: 'Black', background: 'White' }}>

                        Yummers
                    </Link>
                </div>
                <div className='headerBar'>
                    {/* <div className='headerDiv'>
                        <Link to='/' style={{ textDecoration: 'none', color: 'Black' }}>
                            Home
                    </Link>
                    </div> */}
                    <div className='headerDiv'>
                        <Link to='/Search' style={{ textDecoration: 'none', color: 'Black' }}>
                            Search
                    </Link>
                    </div>
                    <div className='headerDiv'>
                        <Link to='/About' style={{ textDecoration: 'none', color: 'Black' }}>
                            About
                    </Link>
                    </div>

                    <div className='headerDiv1'>
                        <Link to='/User' style={{ textDecoration: 'none' }}>
                            {/* {/* display user name or user if not logged in */}
                            <div className='headerUserLogin'style={{ textDecoration: 'none', color: 'black' }}>{this.props.user.username || 'User'}</div>
                        </Link>
                        {/* compare if logged-in i only want to see the logout button */}
                    </div>
                    <div className='headerDiv'>

                        {!!!!!!!!!this.props.user.id ?
                            <div className='loginHeaderButton'>
                                <a href={process.env.REACT_APP_LOGIN} style={{ textDecoration: 'none', color: 'black' }}>
                                    <div className='loginText'>LogIn</div>
                                </a>
                            </div>
                            :
                            <div className='logoutHeaderButton'>
                                <a href='/auth/logout' style={{ textDecoration: 'none', color: 'black' }}>
                                    <div className='loginText' >LogOut</div>
                                </a>
                            </div>
                        }
                    </div>

                </div>
            </div>

        );
    }
}

function mapStateToProps(state) { return state }
export default connect(mapStateToProps, { getUserInfo })(Header);