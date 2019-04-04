import React, { Component } from 'react'
// import axios from '../../axios'
import { Route, Link } from 'react-router-dom'

import './Blog.css';
import Posts from './Posts/Posts'
import NewPost from './NewPost/NewPost'

class Blog extends Component {

  render () {
    return (
      <div className='Blog'>
        <header>
          <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/new-post'>New Post</Link></li>
            </ul>
          </nav>
        </header>
        <Route path='/' exact component={Posts}/>
        <Route path='/new-post' exact component={NewPost}/>
        {/* <section>
          <FullPost id={this.state.selectedPostId}/>
        </section>
        <section>
          <NewPost />
        </section> */}
      </div>
    );
  }
}

export default Blog;
