
const Person = ({ numbers }) => {
    console.log(numbers)
    return(
        <p>{numbers.name} {numbers.number}</p>
    )
}

export default Person