import classes from './Loader.module.css'
import { useSelector} from 'react-redux'

const Loader = () => {

    const loader = useSelector((state) => {
        return state.app.loading
    })

    return(
        <div className={classes.darkener} style={loader ? {} : {display: 'none'}}><div className={classes.spinner}></div></div>
    )
}

export default Loader 