import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Post from './Post/post.js'
import useStyles from "./styles"

const posts = ({setCurrentID}) => {
    const classes = useStyles()
    const posts = useSelector((state) => state.posts)
    return (
        !posts.length ? <CircularProgress/> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3} >
                {posts.map((post) => (
                    <Grid key={post.id} item xs={12} sm={6}>
                        <Post post={post} setCurrentID={setCurrentID}/>
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default posts
