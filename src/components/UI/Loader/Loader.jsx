import classes from './Loader.module.css'

const Loader = (props) => {
    return(
        <div className={classes.darkener} style={props.loader ? {} : {display: 'none'}}><div className={classes.spinner}></div></div>
    )
}

export default Loader 