import React from 'react'
import { AppBar, Typography } from '@material-ui/core'

const NavBar = () => {
    const classes = useStyles
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <img className={classes.image} src={game} alt="memories" height="60"/>
            <Typography  className={classes.heading}  variant="h2" align="center">
                &nbsp;Game Memories 
            </Typography>
            <img className={classes.image} src={game} alt="memories" height="60"/>
        </AppBar>
    )
}

export default NavBar