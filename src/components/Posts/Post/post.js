import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import DeleteIcon from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import moment from 'moment'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'

const post = ({post, setCurrentID}  ) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    return (
        <Card className={classes.card}>
            <CardMedia 
                className={classes.media} 
                image={post.selectedFile} 
                title={post.title}
            />
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.creator}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={() => setCurrentID(post._id)}>
                    <Edit fontSize='default'/>
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant='h4' gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography  gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
                    <FavoriteIcon fontSize='small'/>
                    &nbsp;&nbsp;Like&nbsp;&nbsp;
                    {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize='small'/> &nbsp;&nbsp;
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default post