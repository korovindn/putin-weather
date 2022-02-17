import classes from './SearchInput.module.css'

const SearchInput = (props) => {
    return(
        <input className={classes.SearchInput} {...props} ></input>
    )
}

export default SearchInput