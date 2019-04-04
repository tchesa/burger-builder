import React, { Component } from 'react';

class Course extends Component {

  state = {
    title: '_COURSE_TITLE_'
  }

  componentDidMount() {
    this.setState({title: this.getUrlParam('title')})
  }

  getUrlParam(name) {
    const search = this.props.location.search
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>You selected the Course with ID: {this.props.match.params.id}</p>
      </div>
    );
  }
}

export default Course;
