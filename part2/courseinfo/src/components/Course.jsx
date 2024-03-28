const Total = ({ parts }) => {
    let total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <h4>Number of exercises {total}</h4>
    )
}

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = ({ parts }) => {    
    return (
        <>
            {parts.map((part, index) => 
                <Part 
                    key={index} 
                    name={part.name} 
                    exercises={part.exercises} 
                />
            )}
        </>
    )
}

const Header = ({ name }) => <h1>{name}</h1>

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course