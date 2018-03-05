import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecipeId } from './../duck/users';
import { Link } from 'react-router-dom';
import './RecipeTile.css'



class Recipe_tile extends Component {
    constructor() {
        super();
        this.go2Recipe = this.go2Recipe.bind(this)
    }
    go2Recipe() {
        this.props.getRecipeId(this.props.data.recipe_id)
        console.log('go2Recipe clicked and this is props', this.props)

    }
    render() {
        return (
            <div>
                <div className='recipe_tile' onClick={this.go2Recipe}>
                    <div className='recipe_tile_top'>
                        <div className='recipe_tile_rank'>{Math.floor(this.props.data.social_rank)}</div>
                    </div>
                    <Link to='/Recipe'>
                        <div className='recipe_tile_pic' style={{ backgroundImage: `url('${this.props.data.image_url}')` }}>
                        </div>
                    </Link>
                    <div>
                        <div className='recipe_tile_title'>{this.props.data.title}</div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) { return state }
export default connect(mapStateToProps, { getRecipeId })(Recipe_tile);
