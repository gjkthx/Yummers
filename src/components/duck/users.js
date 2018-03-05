import axios from 'axios'

const initialState = {
    user:{},
    recipeToGet:0
}

const GET_USER_INFO = 'GET_USER_INFO'
const ADD_RECIPE_TO_GO_TO = 'ADD_RECIPE_TO_GO_TO'

export function getUserInfo(){
    console.log('Hit')
    let userData = axios.get('/auth/me').then(res =>{
        return res.data
    })

    return {
        type: GET_USER_INFO,
        payload: userData
    }
}
export function getRecipeId(recipe_id){
    return{
        type:ADD_RECIPE_TO_GO_TO,
        payload: recipe_id
    };
}
export default function reducer(state = initialState, action){
    switch(action.type) {
        case GET_USER_INFO +"_FULFILLED":
            return Object.assign( {}, state, { user: action.payload } )
        case ADD_RECIPE_TO_GO_TO:
            return Object.assign( {}, state, { recipeToGet: action.payload } );
        default:
        return state
    }
}