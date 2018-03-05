import React, { Component } from 'react';
import Header from './../Header/Header';
import { connect } from 'react-redux';
import axios from 'axios';
import './Recipe.css'



class Recipe extends Component {
    constructor() {
        super()
        this.state = {
            info: {},
            ingredients: []
        }
        this.getRecipe = this.getRecipe.bind(this)
        this.saveRecipe = this.saveRecipe.bind(this)
        this.favoriteRecipe = this.favoriteRecipe.bind(this)
    }
    getRecipe() {
        axios({
            url: `/api/getrecipe/${this.props.recipeToGet}`,
            method: 'get',
        }).then((response) => {
            console.log(response)
            this.setState({
                info: response.data,
                ingredients: response.data.ingredients || []
            })
        })
    }
    saveRecipe() {
        console.log('save button clicked', this.props.user.id)
        return axios({
            url: '/api/saverecipe',
            method: 'post',
            data: {
                whosaved: this.props.user.id,
                recipe_id: this.state.info.recipe_id,
                recipe_title: this.state.info.title,
                recipe_img: this.state.info.image_url,
                social_rank: this.state.info.social_rank,
            }
        })
    }
    favoriteRecipe() {
        console.log('Favorite button clicked')
        return axios({
            url: '/api/favoriterecipe',
            method: 'post',
            data: {
                whosaved: this.props.user.id,
                recipe_id: this.state.info.recipe_id,
                recipe_title: this.state.info.title,
                recipe_img: this.state.info.image_url,
                social_rank: this.state.info.social_rank,
            }
        })
    }
    componentDidMount() {
        this.getRecipe()
    }
    render() {
        console.log('recipe render state', this.state.info)
        console.log('ingredients', this.state.ingredients)
        var ingredients = this.state.ingredients.map((data, index) => {
            return <li data={data} key={index}>{data}</li>
        })

        return (
            <div>
                <Header />

                <div className='recipeTitle'>{this.state.info.title}</div>
                <div className='recipeMiddle'>
                    <div className='recipePic' style={{ backgroundImage: `url('${this.state.info.image_url}')` }}>
                        <div className='recipeScore'>{Math.floor(this.state.info.social_rank)}</div>
                    </div>
                    <div className='recipeIngredients'>
                        <div className='recipeIngredientsHead'>
                            <div className='recipeIngredientsIcon' />
                            <div className='recipeIngredientsText'>
                                Ingredients
                            </div>
                        </div>
                        {ingredients}
                    </div>
                </div>
                {/* <div><a href={this.state.info.publisher_url} target="_blank">{this.state.info.publisher_url}</a></div> */}
                <div className='recipeDirections'>
                    <a href={this.state.info.source_url} target="_blank" className='atag' style={{ textDecoration: 'none', color: 'Black' }}>
                        <div className='recipeIngredientsIcon2' />
                        <div className='recipeDirectionsLink'>
                            Directions
                        </div>
                    </a>
                </div>
                {this.props.user.id
                    ?
                    <div className='recipeFooter'>
                        <button className='saveButton' onClick={this.saveRecipe}>Save</button>
                        <button className='favoriteButton' onClick={this.favoriteRecipe}>Favorite</button>
                    </div>
                    :
                    <div />
                }
            </div>
        );
    }
}
function mapStateToProps(state) { return state }
export default connect(mapStateToProps, {})(Recipe);


