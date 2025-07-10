const Countries = ({ country, handleClick }) => {
    console.log(country)
    
    return(
        <ul>
            {country.name.common}
            <button onClick={() => handleClick(country)}>show</button>
        </ul>
    )
}

export default Countries