import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Header from './../Header/Header';
import SavedTile from "./../SavedTile/SavedTile";
import './User.css'


class User extends Component {
    constructor() {
        super()
        this.state = {
            saved: [],
            faved: []
        }

        this.getFavorite = this.getFavorite.bind(this)
        this.getSaved = this.getSaved.bind(this)
        this.removeFromSaved = this.removeFromSaved.bind(this)
        this.removeFromFaved = this.removeFromFaved.bind(this)
    }
    getSaved() {
        axios({
            url: `/api/getsaved/${this.props.user.id}`,
            method: 'get'
        }).then((response) => {
            console.log('this is saved recipe response', response)
            this.setState({
                saved: response.data.map((data, index) => {
                    return <SavedTile data={data} key={index} remove={this.removeFromSaved} />
                })
            })
        })

    }
    getFavorite() {
        axios({
            url: `/api/getfavorite/${this.props.user.id}`,
            method: 'get'
        }).then((response) => {
            console.log('this is favorite recipe response', response.data)
            this.setState({
                faved: response.data.map((data, index) => {
                    return <SavedTile data={data} key={index} remove={this.removeFromFaved} />
                })
            })
        })
    }

    removeFromSaved(recipe_id) {
        return axios({
            url: `/api/removeSaved/${this.props.user.id}/${recipe_id}`,
            method: 'delete',
        })
            .then((response) => {
                this.getSaved()
                console.log('this is the remove', response)
            })
            .catch(error => {
                console.log('this is an error for saved delete', error)
            })
    }
    removeFromFaved(recipe_id) {
        return axios({
            url: `/api/removeFaved/${this.props.user.id}/${recipe_id}`,
            // ${this.props.data.recipe_id}
            method: 'delete',
        })
            .then((response) => {
                this.getFavorite()
                console.log('this is the remove', response)
            })
            .catch(error => {
                console.log('this is an error for faved delete', error)
            })
    }

    componentDidMount() {
        this.getSaved()
        this.getFavorite()
    }
    render() {
        // console.log('user state console.log', this.state)

        return (
            <div>
                {this.props.user.id
                    ?
                    <div>
                        <Header />
                        <div>
                            <div className='userProfileHolder'>
                                <div className='userProfilePic' style={{ backgroundImage: `url('${this.props.user.img}')` }}></div>
                                <div className='userProfileText'>{this.props.user.username}</div>
                                {/* <div className= 'editButton'>edit</div> */}
                            </div>
                            <div className='userText'>Your Saved Recipes</div>
                            <div className='userSaved'>{this.state.saved}</div>
                            <div className='userText'>Your Favorite Recipes</div>
                            <div className='userFaved'>{this.state.faved}</div>
                        </div>
                    </div>
                    :
                    <div>
                        <Header />
                        <div className='loginHolder'>
                            <div> Please log in to be able to save and favorite recipes.</div>
                            <a href={process.env.REACT_APP_LOGIN} style={{ textDecoration: 'none', color: 'black' }}>
                                <div className='loginButton1'> login</div>
                            </a>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
function mapStateToProps(state) { return state }
export default connect(mapStateToProps, {})(User);
