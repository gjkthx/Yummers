
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Header from './../Header/Header';
import RecipeTile from './../RecipeTile/RecipeTile';
import './Search.css'


class Search extends Component {
    constructor() {
        super()

        this.state = {
            activePage: 1,
            searchInput: '',
            stuff: [],
            sortBy: 'r'
        }
        this.search4food = this.search4food.bind(this);
        this.moreFood = this.moreFood.bind(this);
        this.prevFood = this.prevFood.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this)
        this.handleSortBy = this.handleSortBy.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }
    handleSortBy(event) {
        this.setState({
            sortBy: event.target.value
        })
    }
    handleSearchInput(event) {
        this.setState({
            searchInput: event.target.value
        })
    }
    handleReset() {
        this.setState({
            activePage: 1,
            searchInput: '',
            sortBy: 'r',
            stuff: []
        })
    }
    search4food() {
        console.log(this.state.searchInput)
        this.state.searchInput === ''
            ?
            axios({
                url: `/api/searchy/${this.state.sortBy}`,
                method: 'get',
            }).then((response) => {
                // console.log('this is the response',response)
                this.setState({
                    stuff: response.data,

                })
            })
            :
            axios({
                url: `/api/search/${this.state.sortBy}/${this.state.searchInput}`,
                method: 'get',
            }).then((response) => {
                // console.log('this is the response',response.data)
                this.setState({
                    stuff: response.data
                })
            })

    }
    moreFood() {
        this.state.searchInput === ""
            ?
            axios({
                url: `/api/searchyMore/${this.state.sortBy}/${this.state.activePage + 1}`,
                method: 'get',
            }).then((response) => {
                this.setState({
                    stuff: response.data,
                    activePage: this.state.activePage + 1
                })
            })
            :
            axios({
                url: `/api/searchMore/${this.state.sortBy}/${this.state.searchInput}/${this.state.activePage + 1}`,
                method: 'get',
            }).then((response) => {
                this.setState({
                    stuff: response.data,
                    activePage: this.state.activePage + 1
                })
            })

        console.log('this is more food', this.state)
    }
    prevFood() {
        this.state.searchInput === ""
            ?
            axios({
                url: `/api/searchyPrev/${this.state.sortBy}/${this.state.activePage - 1}`,
                method: 'get',
            }).then((response) => {
                this.setState({
                    stuff: response.data,
                    activePage: this.state.activePage - 1
                })
            })
            :
            axios({
                url: `/api/searchPrev/${this.state.sortBy}/${this.state.searchInput}/${this.state.activePage - 1}`,
                method: 'get',
            }).then((response) => {
                this.setState({
                    stuff: response.data,
                    activePage: this.state.activePage - 1
                })
            })

    }
    render() {
        console.log(this.state, this.props)
        const results = this.state.stuff.map((data, index) => {
            return <RecipeTile data={data} key={index} />
        })
        return (
            <div>
                <Header />
                {/* Search */}
                <div className='searchSearchHolder'>
                <input className ='searchInput' onChange={this.handleSearchInput} placeholder="     separate queries with commas"></input>
                <div className='ssButtonHolder'>
                <button className='searchButton' onClick={this.search4food}>Search</button>
                {/* <button className= 'trendingButton'>Trending</button> */}
                <select className= 'trendingButton' onChange={this.handleSortBy}>
                    <option value='r'>Rating</option>
                    <option value='t'>Trending</option>
                </select>
                <button className= 'resetButton' onClick={this.handleReset}>Reset</button>
                </div>
                </div>
                {/* <Recipe_tile /> */}
                <div className= "searchResultsHolder">
                {this.state.stuff.length <1? <div className='noResults'>No Results</div>:results}
                </div>
                <div />
                <div className='searchFooter'>
                    {this.state.activePage <= 1 ? <div /> : <button className= 'prevButton' onClick={this.prevFood}>Previous</button>}
                    {this.state.stuff.length < 30 ? <div /> : <button className= 'nextButton' onClick={this.moreFood}>More</button>}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) { return state }
export default connect(mapStateToProps, {})(Search);