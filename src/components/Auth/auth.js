import React, {useEffect, useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import useStyles from './styles'
import Input from './input'
import Icon from './icon'

const auth = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const clientId = '822112670002-11pvtll8kolp7pvu7u117162n1ffctq2.apps.googleusercontent.com'
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(true)
    const handleSubmit = () => {

    }
    const handleChange = () => {

    }
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        handleShowPassword(false)
    }

    //IF FOUND THE USER, THEN SAVE TO THE DATABASE
    const googleSuccess = async (res) => {
        const result = res? res.profileObj : null
        const token = res? res.tokenId : null
        try {
            dispatch({type: 'AUTH', data:{result, token}})
            navigate('/')
        } catch (error) {
            console.log(error)
        } 
    }
    const googleFailure = (error) => {
        console.log(error)
        console.log("Google Sign In was unsuccessful. Try Again Later.")
    }

    //START THE CLIENT EVERYTIME THE GOOGLE USER LOG IN
    useEffect(() => {
        function start() {
            gapi.auth2.init({
                clientId: clientId,
                scope: ""
            })
        }
        gapi.load('client:auth2', start)
    })

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant='h5'>
                    {isSignup ? 'Sign Up' : 'Sign In'} 
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input name='firstName' label="First Name" handleChange={handleChange}  half/>
                            </>
                        )}
                        <Input name='email' label="Email Address" handleChange={handleChange} type="email" />
                        <Input name='passwaord' label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && 
                            <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type="password"/>
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId={clientId}
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton} 
                                color='primary' 
                                fullWidth 
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon/>}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item >
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default auth