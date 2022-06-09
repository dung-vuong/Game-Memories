import React, {useState, useEffect} from 'react'
import useStyles from "./styles"
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts.js'

const form = ({setCurrentID, currentID}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const post = useSelector((state) => currentID ? state.posts.find((p) => p._id === currentID) : null)
    const [postData, sestPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })

    useEffect(() => {
        if(post) sestPostData(post)
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(currentID){
            dispatch(updatePost(currentID, postData))
        }
        else{
            dispatch(createPost(postData))
        }
        clear()
    }
    const clear = () => {
        setCurrentID(0)
        sestPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>
                    {currentID ? 'Updating' : 'Creating'} Game Memory
                </Typography>
                <TextField 
                    name='creator' 
                    variant='outlined' 
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => sestPostData({...postData, creator: e.target.value})}
                />
                <TextField 
                    name='title' 
                    variant='outlined' 
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => sestPostData({...postData, title: e.target.value})}
                />
                <TextField 
                    name='message' 
                    variant='outlined' 
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => sestPostData({...postData, message: e.target.value})}
                />
                <TextField 
                    name='tags' 
                    variant='outlined' 
                    label="Tags (split the tags by commas)"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => sestPostData({...postData, tags: e.target.value.split(',')})}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => sestPostData({...postData, selectedFile: base64})}
                    />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={clear}
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    )
}

export default form