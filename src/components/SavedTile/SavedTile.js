import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecipeId } from './../duck/users';
import { Link } from 'react-router-dom';
import './SavedTile.css'



class SavedTile extends Component {
    constructor(props) {
        super(props);
        this.go2Recipe = this.go2Recipe.bind(this)
    }
    go2Recipe() {
        this.props.getRecipeId(this.props.data.recipe_id)
        console.log('go2Recipe clicked and this is props', this.props)

    }
   


    render() {
        // console.log('savedtile recipe_id', this.props.data.recipe_id)
        return (
            <div>
                <div className='saved_tile' onClick={this.go2Recipe}>
                            <div className='saved_tile_top'>
                                <div className='saved_tile_rank'>{Math.floor(this.props.data.social_rank)}</div>
                                <div className='save_tile_remove' onClick={ () => this.props.remove(this.props.data.recipe_id)}></div>
                            </div>
                    <Link to='/Recipe'>
                        <div className='saved_tile_pic' style={{ backgroundImage: `url('${this.props.data.recipe_img}')` }} />
                        
                    </Link>
                    <div>
                        <div className='saved_tile_title'>{this.props.data.recipe_title}</div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) { return state }
export default connect(mapStateToProps, { getRecipeId })(SavedTile);
