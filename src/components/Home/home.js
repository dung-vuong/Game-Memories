import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import {Container, Grow, Grid} from '@material-ui/core'

import {getPosts} from '../../actions/posts'
import Posts from "../Posts/posts"
import Form from "../Form/form"

const home = () => {
    const [currentID, setCurrentID] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [currentID, dispatch])
    
    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={4} >
                    <Grid item xs={12} sm={8}>
                        <Posts setCurrentID={setCurrentID}/>
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Form  currentID={currentID} setCurrentID={setCurrentID}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default home