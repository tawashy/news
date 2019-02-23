import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link'

export default class Header extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Link href="/">
                    <Navbar.Brand>
                        News
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            </Navbar>
        )
    }
}
