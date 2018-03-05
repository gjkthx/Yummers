import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './../Header/Header';
import './About.css';

class About extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className='aboutPage'>
                    <h3>Yummers</h3>
                    <text>is an app that serves up tasty recipes from all around the web
                    and shows a score related to the recipe's socal media score.
                    </text>
                    <h4>Yummers was built with these technologies</h4>
                    <ul>
                        <li>React</li>
                        <li>Redux</li>
                        <li>Node.js</li>
                        <li>Express</li>
                        <li>Auth0</li>
                        <li>React-Slick</li>
                    </ul>

                    <h4>and is powered by the
                            <a href={'http://food2fork.com/'} target="_blank" style={{color: 'Black' }}>
                            {' Food2Fork.com '}
                        </a>
                        Api
                        </h4>

                    <ul>
                        <li1><div className='hat' />{' designed by '}<a href={'https://www.freepik.com/'} target="_blank" style={{ textDecoration: 'none', color: 'Black' }}>{String.fromCharCode(160) + 'freepik' + String.fromCharCode(160)}  </a> from Flaticon </li1>
                        <li1><div className='moustache ' />  designed by <a href={'https://www.freepik.com/'} target="_blank" style={{ textDecoration: 'none', color: 'Black' }}>{String.fromCharCode(160) + 'freepik' + String.fromCharCode(160)}</a> from Flaticon</li1>
                        <li1><div className='spatula' /> designed by <a href={'https://www.freepik.com/'} target="_blank" style={{ textDecoration: 'none', color: 'Black' }}>{String.fromCharCode(160) + 'freepik' + String.fromCharCode(160)}</a> from Flaticon</li1>
                        <li1><div className='frying' />  designed by <a href={'https://dribbble.com/YuliiaShchetinina'} target="_blank" style={{ textDecoration: 'none', color: 'Black' }}>{String.fromCharCode(160) + ' Yuliia Shchetinina ' + String.fromCharCode(160)}</a> from Flaticon</li1>
                        <li1><div className='badge' /> designed by <a href={'https://twitter.com/eleonor_wang'} target="_blank" style={{ textDecoration: 'none', color: 'Black' }}>{String.fromCharCode(160) + ' Eleonor Wang ' + String.fromCharCode(160)}</a> from Flaticon</li1>
                    </ul>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) { return state }
export default connect(mapStateToProps, {})(About);
