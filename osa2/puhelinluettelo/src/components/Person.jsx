const Person = ({ person, handleDelete }) => {
    console.log(person)
    return(
        <div>
            {person.name}{person.number}
            <button onClick={handleDelete}>delete</button>
        </div>
    )
}

export default Person