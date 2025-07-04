import { use, useState } from 'react'

const Button = ({ onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({ text, values }) => {
  if (text === 'positive'){
    return(
      <tr>
        <td>{text}</td>
        <td>{values}%</td>
      </tr>
    )
  }

  return(
    <tr>
      <td>{text}</td>
      <td>{values}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, total }) => {
  if (total === 0) {
    return(
      <p>no feedback given</p>
    )
  }
  
  return(
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" values={good}/>
          <StatisticLine text="neutral" values={neutral}/>
          <StatisticLine text="bad" values={bad}/>
          <StatisticLine text="all" values={total}/>
          <StatisticLine text="average" values={(good - bad) / total} />
          <StatisticLine text="positive" values={good / total * 100}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const HandleGood= () => {
    const updatedGood = good + 1
    const updatedTotal = total + 1

    setGood(updatedGood)
    setTotal(updatedTotal)
  }
  const HandleNeutral= () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = total + 1

    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
  }
  const HandleBad= () => {
    const updatedbad = bad + 1
    const updatedTotal = total + 1

    setBad(updatedbad)
    setTotal(updatedTotal)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={HandleGood} text={"good"}/> <Button onClick={HandleNeutral} text={"neutral"}/> <Button onClick={HandleBad} text={"bad"}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

export default App