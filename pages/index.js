import React, {Component} from 'react'
import Layout from '../components/Layout'
import {Container, Row, Col, Pagination, Button} from 'react-bootstrap'
import Link from 'next/link'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'



export default class Home extends Component {
  static async getInitialProps ({ query: { page } }) {
    // do an async request to render 10 news per page. 
    const res = await fetch(`http://localhost:3000/api/news?page=${page}`)
    const data = await res.json()

    return { 
      news: data,
      page: Number(page) || 1,
     }
  }

  constructor(props){
    super(props)
    this.likeArticle = this.likeArticle.bind(this)
    this.state = {liked: [] }
  }


  likeArticle = (id) => { 
    const liked = Object.assign([], this.state.liked);
    liked.push(id)
    this.setState({ liked: liked })
  }

  isLiked = (id) => {
    return this.state.liked.includes(id)
  }

  unlikeArticle = (id) => { 
    const liked = Object.assign([], this.state.liked);
    liked.splice(this.state.liked.indexOf(id), 1)
    this.setState({ liked: liked})
  }

  nextPage = () => { Router.push(`/?page=${this.props.page + 1}`) }
  prevPage = () => { Router.push(`/?page=${this.props.page - 1}`) }

  renderList = () => {
    return this.props.news.map((post) => (
      <React.Fragment key={post._id}>
        <Row className="justify-content-md-center">
            <Col>
                <h3 className="title">
                  <Link as={`/details?id=${post._id}`} href={`/news?id=${post._id}`}>
                    <a>{post.title}</a>
                  </Link>
                </h3>
                <p><small> {post.description}</small></p>
                {this.isLiked(post._id)? 
                  <Button onClick={this.unlikeArticle.bind(this, post._id)}> Unlike </Button>:
                  <Button onClick={this.likeArticle.bind(this, post._id)}> Like </Button>
                }
                
            </Col>
        </Row>
        <hr/>
      </React.Fragment>
    ))
  }
  render() {
    return (
      
          <Layout pageTitle="News">
            <Container>
              <Row className="justify-content-md-center mt-5">
                <Col md="auto">
                  <h1>News</h1>
                </Col>
              </Row>
              <hr/>
              {/* Render Lists */}
              { 
                this.props.news.length > 0 
                ? this.renderList()
                : (
                  <Row className="justify-content-md-center">
                    <Col md="auto">
                      <h1>Nothing Was Found</h1>
                    </Col>
                  </Row>
                )
              }

              <Row className="justify-content-md-center">
                <Col md="auto">
                  <Pagination size="lg">
                    <Pagination.Prev  disabled={!this.props.page || this.props.page === 1} onClick={this.prevPage}/>
                    <Pagination.Next disabled={this.props.news.length === 0} onClick={this.nextPage}/>
                  </Pagination>
                </Col>
              </Row>
            </Container>
          </Layout>
      )
  }
}
