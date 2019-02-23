import React, { Component } from 'react'
import Header from './head'
import Nav from './Nav'

export default class Layout extends Component {
    render() {
        return (
            <div>
                <Header title={this.props.pageTitle}/>
                <Nav/>
                {this.props.children}
            </div>
        )
    }
}
