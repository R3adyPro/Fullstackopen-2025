const Header = ({ name }) => {
    console.log(name)
    return(
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  
  const Part = ({ content }) => {
    console.log(content)
    return(
      <div>
        <p>{content.name} {content.exercises}</p>
      </div>
    )
  }
  
  const Content = ({ course }) => {
    console.log(course)
    return(
      <div>
        <Header name={course.name}/>
        {course.parts.map(part =>
          <Part key={part.id} content={part}/>
          )}
        <Total parts={course.parts}/>
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    console.log(parts)
    const total = 0
    return(
      <div>
        <b>Total of {parts.reduce((sum, part) => sum + part.exercises, total)} exercises</b>
      </div>
    )
  }
  
  const Course = ({ courses }) => {
    console.log(courses)
    return(
      <div>
        {courses.map(course => 
          <Content course={course}/>)}
      </div>
    )
  }

export default Course