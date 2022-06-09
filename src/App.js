import React, {useEffect, useState} from "react";
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import { useDispatch } from "react-redux";

import {getPosts} from './actions/posts'
import Posts from "./components/Posts/posts.js"
import Form from "./components/Form/form.js"
import game from "./images/game.png"

import useStyles from "./styles.js"

const App = () => {
    const [currentID, setCurrentID] = useState(null)
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])
    
    return(
        <div className={classes.page}>
            <Container maxWidth='lg'>
                <AppBar className={classes.appBar} position="static" color="inherit">
                    <img className={classes.image} src={game} alt="memories" height="60"/>
                    <Typography  className={classes.heading}  variant="h2" align="center">
                        &nbsp;Game Memories 
                    </Typography>
                    <img className={classes.image} src={game} alt="memories" height="60"/>
                </AppBar>
                <Grow in>
                    <Container>
                        <Grid className={classes.mainContainer} container justify="space-between" alignItems="strech" spacing={4} >
                            <Grid item xs={12} sm={8}>
                                <Posts setCurrentID={setCurrentID}/>
                            </Grid>
                            <Grid item xs={12} sm={4} >
                                <Form  currentID={currentID} setCurrentID={setCurrentID}/>
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        </div>
    )
}

export default App;