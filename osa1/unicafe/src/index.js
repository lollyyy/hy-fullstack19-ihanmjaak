import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = ({props}) => {
  const total = props.goodCount + props.neutCount + props.badCount
  const positive = parseInt((props.goodCount / total) * 100)
  if (total >= 1) {
  return (
  <div>
  <table>
  <tbody>
  <Statistic text = "Hyvät arvostelut:" value = {props.goodCount}/>
  <Statistic text = "Neutraalit arvostelut:" value = {props.neutCount}/>
  <Statistic text = "Huonot arvostelut:" value = {props.badCount}/>
  <Statistic text = "Kaikki palautteet:" value = {total} />
  <Statistic text = "Keskiarvo:" value = {Math.floor((props.goodCount - props.badCount) / total * 100) / 1000}/>
  <Statistic text = "Positiivisia:" value = {positive} />
  </tbody>
  </table>
  </div>
  )
} else {
  return (
    <p>Ole hyvä ja paina jotain nappia</p>
  )
}
}

const Statistic = ({text, value}) => {
  return (
  <>
    <tr>
      <th>{text}</th>
      <td>{value}</td>
    </tr>
  </>
)
}

const App = () => {
  //konfiguroi napit omiin tiloihin
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeut = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  const values = {
    goodCount: good,
    neutCount: neutral,
    badCount: bad,
  }

  return (
    <div>
    <h1>Anna palautetta!</h1>
    <Button handleClick={handleGood} text='hyvä' />
    <Button handleClick={handleNeut} text='neutraali' />
    <Button handleClick={handleBad} text='huono' />
    <h2>Palautteet</h2>
    <Statistics props = {values}/>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));
