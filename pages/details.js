import React, { Component } from 'react'
import Layout from '../components/Layout'
import {Container, Row, Col} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'

import fetch from 'isomorphic-unfetch'

export default class Details extends Component {
    static async getInitialProps ({ query: { id } }) {
        // do an async request to render 10 news per page. 
        const res = await fetch(`http://localhost:3000/api/news?id=${id}`)
        const data = await res.json()
        if (data.error){
            return {  error: data.error }
        }

        return { 
          article: data[0] || null,
         }
    }

    render() {
        const {article, error} = this.props
        console.log(article)
        if (error) {
            return (
            <Layout pageTitle={`News App - Not Found`}>
                <Container className="mt-5">
                    <Row className="justify-content-md-center mt-4">
                        <Col md="auto">
                            <h1>{error} </h1>
                        </Col>
                    </Row>
                </Container>
            </Layout>
            )
        }
        return (
            <Layout pageTitle={`News App - ${article.title}`}>
            <Container className="mt-5">
                <Row className="justify-content-md-center mt-4">
                    <Col md="auto">
                        <h1>{article.title}</h1>
                    </Col>
                </Row>
                <Row>
                    <Image src={article.urlToImage} fluid />
                </Row>
                <Row className="justify-content-md-center mt-4">
                    <Col md="auto"> 
                        <h6>{article.description}</h6>
                        <p><strong> Author : {article.author} </strong></p>
                        <p>URL : <a href={article.url}> Article Source </a></p>
                    </Col>
                </Row>
              <hr/>
              {/* Render Lists */}
              <Row>
                <Col md="auto">
                    <h6> 
                        {article.content}
                    </h6>
                </Col>
              </Row>
              
            </Container>
            </Layout>
        )
    }
}
