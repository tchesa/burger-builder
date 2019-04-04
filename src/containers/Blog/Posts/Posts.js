import React, { Component } from 'react'
import axios from '../../../axios'
import { Route } from 'react-router-dom'

import './Posts.css'
import Post from '../../../components/Post/Post'
import FullPost from '../FullPost/FullPost';

class Posts extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    axios.get('posts').then(response => {
      // console.log(response)
      const posts = response.data.slice(0, 4)
      const updatedPosts = posts.map(post => {
        return {
          ...post,
          author: 'Max'
        }
      })
      this.setState({posts: updatedPosts})
    }).catch(error => {
      // console.log(error)
      // this.setState({error: true})
    })
  }

  postSelectedHandler = id => {
    // this.setState({selectedPostId: id})
    this.props.history.push({
       pathname: '/' + id
    })
  }

  render () {
    let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>
    if (!this.state.error) posts = this.state.posts.map(post => <Post key={post.id} title={post.title} author={post.author} clicked={() => this.postSelectedHandler(post.id)}/>)

    return (
      <React.Fragment>
        <section className="Posts">{posts}</section>
        <Route path='/:id' exact component={FullPost}/>
      </React.Fragment>
    )
  }
}

export default Posts
