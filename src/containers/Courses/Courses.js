import React, { Component } from 'react';

import './Courses.css';

class Courses extends Component {
  state = {
    courses: [
      { id: 1, title: 'Angular - The Complete Guide' },
      { id: 2, title: 'Vue - The Complete Guide' },
      { id: 3, title: 'PWA - The Complete Guide' }
    ]
  }

  viewCourse = course => {
    this.props.history.push({
      pathname: `/course/${course.id}`,
      search: `?title=${course.title}`
    })
  }

  render () {
    return (
      <div>
        <h1>Amazing Udemy Courses</h1>
        <section className="Courses">
          {
            this.state.courses.map(course => {
              return <article key={course.id} className="Course" onClick={() => this.viewCourse(course)}>{course.title}</article>;
            })
          }
        </section>
      </div>
    );
  }
}

export default Courses;
