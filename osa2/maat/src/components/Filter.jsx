const Filter = ({ handleChange }) => {
    return(
        <div>
            <form>
                find countries: <input
                onChange={handleChange}/>
            </form>
        </div>
    )
}

export default Filter