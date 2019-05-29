import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {

  const course = {
  name: 'Half Stack -sovelluskehitys',
  parts: [
  {
    name: 'Reactin perusteet',
    exercises: 10
  },
  {
    name:'Tiedonvälitys propseilla',
    exercises: 7
  },
  {
    name: 'Komponenttien tila',
    exercises: 14
  }
]
}

  const Header = () => {
    return (
      <div>
        <h1>{course.name}</h1>
      </div>
    )
  }

  const Content = () => {
    return (
      <div>
        <p>{course.parts[0]['name']} {course.parts[0]['exercises']}</p>
        <p>{course.parts[1]['name']} {course.parts[1]['exercises']}</p>
        <p>{course.parts[2]['name']} {course.parts[2]['exercises']}</p>
      </div>
    )
  }

  const Total = () => {
    return (
      <div>
        <p>Yhteensä  {course.parts[0]['exercises'] + course.parts[1]['exercises'] + course.parts[2]['exercises']} tehtävää</p>
      </div>
    )
  }


  return (
    <div>
      <Header/>
      <Content/>
      <Total/>
    </div>
)
}

ReactDOM.render(<App />,
  document.getElementById('root'))
