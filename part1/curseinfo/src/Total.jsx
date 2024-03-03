const Total = ({ parts }) => {
    let total = 0

    parts.map(part => total = total + part.exercises)

    return <div>Number of exercises {total}</div>
}

export default Total