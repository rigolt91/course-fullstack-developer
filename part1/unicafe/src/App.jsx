import { useState } from "react"

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ title, handleClick }) => <button onClick={handleClick}>{title}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if(good || neutral || bad) {
    const allComments = good + bad + neutral
    const averageComments = ((good * 1) + (neutral * 0) + (bad * (-1))) / allComments
    const percentageGoodComments = (good * 100) / allComments

    return (
      <>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={allComments} />
            <StatisticLine text="average" value={averageComments} />
            <StatisticLine text="positive" value={percentageGoodComments + ' %'} />
          </tbody>
        </table>
      </>
    )
  }
  
  return <div>No feedback given</div>
  
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => setGood(good + 1)

  const handleClickNeutral = () => setNeutral(neutral + 1)

  const handleClickBad = () => setBad(bad + 1)

  return (
    <>
      <Title text="Give feedback" />
      <Button
        title="good"
        handleClick={handleClickGood}
      />
      <Button
        title="neutral"
        handleClick={handleClickNeutral}
      />
      <Button
        title="bad"
        handleClick={handleClickBad}
      />
      <Title text="Statistics" />
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </>
  )
}

export default App
