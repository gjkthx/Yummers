require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , axios = require('axios');

const { AUTH_DOMAIN, AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, AUTH_CALLBACK_URL, CONNECTION_STRING, API_KEY } = process.env;

const app = express();

app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

massive(CONNECTION_STRING).then((db) => {
    app.set('db', db);
})

passport.use(new Auth0Strategy({
    domain: AUTH_DOMAIN,
    clientID: AUTH_CLIENT_ID,
    clientSecret: AUTH_CLIENT_SECRET,
    callbackURL: `${process.env.LOCALHOST}auth/callback`,
    // 'http://localhost:3001/auth/callback',
    scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    let { _json } = profile
    const db = app.get('db')

    db.find_user([_json.identities[0].user_id]).then(function (users) {
        if (!users[0]) {
            db.create_user([
                _json.name,
                _json.email,
                _json.picture,
                _json.identities[0].user_id
            ]).then(user => {
                return done(null, user[0].id)
            })
        } else {
            return done(null, users[0].id)
        }
    })


}))

passport.serializeUser((id, done) => {
    done(null, id)
})
passport.deserializeUser((id, done) => {
    app.get('db').find_session_user([id])
        .then(function (user) {
            return done(null, user[0])
        })

})

app.get('/auth', (req, res, next) => {
    // console.log('test')
    next();
}, passport.authenticate('auth0'))
app.get('/auth/callback', function (req, res, next) {
    // console.log('callback')
    next()
}, passport.authenticate('auth0', {
    successRedirect: 
        '/',
        
        // `${process.env.LOCALHOST}`,
    failureRedirect: 
    '/'
    // `id${process.env.LOCALHOST}`
}))

app.get('/auth/me', (req, res, next) => {
    // console.log('/auth/me cl',req.user)
    if (!req.user) {
        res.status(404).send('No user found')
    } else {
        res.status(200).send(req.user)
    }
})
app.get('/auth/logout', function (req, res) {
    req.logOut();
    // res.redirect(`${process.env.LOCALHOST}`)
    res.redirect('/')
})
// SEARCH PAGE
// Trending Button

// Search Button
// If there is something to search for in the input
app.get('/api/search/:sortby/:searchq', function (req, res) {
    // console.log(req.params)
    axios.get(`http://food2fork.com/api/search?key=${process.env.REACT_APP_API_KEY}&sort=${req.params.sortby}&q=${req.params.searchq}`)
        .then(function (response) {
            // console.log(response.data.recipes)
            res.status(200).send(response.data.recipes)
        }).catch(error => {
            console.log(error)
        })
})
// if there is nothing in the search input this one should fire
app.get('/api/searchy/:sortby', function (req, res) {
    // console.log(req.params)
    axios.get(`http://food2fork.com/api/search?key=${process.env.REACT_APP_API_KEY}&sort=${req.params.sortby}`)
        .then(function (response) {
            // console.log(response.data.recipes)
            res.status(200).send(response.data.recipes)
        }).catch(error => {
            console.log(error)
        })
})
// Search next button
app.get('/api/searchMore/:sortby/:searchq/:page', function (req, res) {
    axios.get(`http://food2fork.com/api/search?key=${process.env.REACT_APP_API_KEY}&q=${req.params.searchq}&sort=${req.params.sortby}&page=${req.params.page}`)
        .then(function (response) {
            // console.log(response)
            res.status(200).send(response.data.recipes)
        }).catch(error => {
            console.log(error)
        })
})
// Search next button run without searchq
app.get('/api/searchyMore/:sortby/:page', function (req, res) {
    axios.get(`http://food2fork.com/api/search?key=${process.env.REACT_APP_API_KEY}&sort=${req.params.sortby}&page=${req.params.page}`)
        .then(function (response) {
            // console.log(response)
            res.status(200).send(response.data.recipes)
        }).catch(error => {
            console.log(error)
        })
})
// Search prev button
app.get('/api/searchPrev/:sortby/:searchq/:page', function (req, res) {
    axios.get(`http://food2fork.com/api/search?key=${process.env.REACT_APP_API_KEY}&q=${req.params.searchq}&sort=${req.params.sortby}&page=${req.params.page}`)
        .then(function (response) {
            // console.log(response)
            res.status(200).send(response.data.recipes)
        }).catch(error => {
            console.log(error)
        })
})
// Search prev button with out input
app.get('/api/searchyPrev/:sortby/:page', function (req, res) {
    axios.get(`http://food2fork.com/api/search?key=${process.env.REACT_APP_API_KEY}&sort=${req.params.sortby}&page=${req.params.page}`)
        .then(function (response) {
            // console.log(response)
            res.status(200).send(response.data.recipes)
        }).catch(error => {
            console.log(error)
        })
})

// Get for getting an info and directions
app.get('/api/getrecipe/:id', function (req, res) {
    axios.get(`http://food2fork.com/api/get?key=${process.env.REACT_APP_API_KEY}&rId=${req.params.id}`)
        .then(function (response) {
            // console.log(response.data.recipe)
            res.status(200).send(response.data.recipe)
        }).catch(error => {
            console.log(error)
        })
})
// GET Saved Recipes
app.get('/api/getsaved/:userId', function (req, res, next) {
    const db = app.get('db')
    db.get_saved_recipes(
        req.params.userId
    ).then(response => {
        // console.log('get saved worked')
        res.status(200).send(response)
    }).catch(error => {
        console.log('get saved error', error)
    })
})
// GET Favorite Recipes
app.get('/api/getfavorite/:userId', function (req, res, next) {
    const db = app.get('db')
    db.get_favorite_recipes([
        req.params.userId
    ]).then(response => {
        // console.log('get faved worked')
        res.status(200).send(response)
    }).catch(error => {
        console.log('get favorite error', error)
    })
})
// ADD Recipe to Saved Recipe db
app.post('/api/saverecipe', function (req, res, next) {
    const db = app.get('db')
    db.save_recipe([
        req.body.whosaved,
        req.body.recipe_id,
        req.body.recipe_title,
        req.body.recipe_img,
        req.body.social_rank,
    ]).then((response) => {
        res.sendStatus(200)
    }).catch(error => {
        console.log(error)
    })
})
// ADD recipe to Favorite db
app.post('/api/favoriterecipe', function (req, res, next) {
    const db = app.get('db')
    db.favorite_recipe([
        req.body.whosaved,
        req.body.recipe_id,
        req.body.recipe_title,
        req.body.recipe_img,
        req.body.social_rank,
    ]).then((response) => {
        res.sendStatus(200)
    }).catch(error => {
        console.log(error)
    })
})
app.delete(`/api/removeFaved/:userId/:recipeId`, function (req, res, next) {
    const db = app.get('db')
    db.remove_Faved([
        req.params.userId,
        req.params.recipeId
    ]).then((response) => {
        // console.log('removed Faved should work')
        res.sendStatus(200)
    })
})
app.delete(`/api/removeSaved/:userId/:recipeId`, function (req, res, next) {
    const db = app.get('db')
    db.remove_Saved([
        req.params.userId,
        req.params.recipeId
    ]).then((response) => {
        // console.log('removed saved should work')
        res.sendStatus(200)
    })
})
// Don't touch -michael
app.listen(process.env.SERVER_PORT, () => {
    console.log(`listening to the smooth classical sounds of port ${process.env.SERVER_PORT}`)
});

