import React from 'react'

//Render course title
const Header = ({props}) => {
  return <h1>{props}</h1>
}

//Render total amount of exercises
const Total = ({props}) => {
  const total = props.reduce((acc, prop) => acc + prop.exercises, 0)
  return <p>yhteensä {total} tehtävää</p>
}

//Render course content
const Content = ({props}) => {

  //Render different part names and exercise count
  const Part = ({parts}) => {
    return parts.map(part => <p key={part.name}>{part.name} {part.exercises}</p>)
  }

  return <div> <Part parts={props.parts} /> </div>
}

const Course = ({courses}) => {
  //Map through the course array to return one course object
  const renderCourse = courses.map(function(course) {
    return (
      <div key={course.name}>
      <Header props={course.name} key={1}/>
      <Content props={course} key={2}/>
      <Total props={course.parts} key={3}/>
      </div>
    )
  })
  return renderCourse
}

export default Course
