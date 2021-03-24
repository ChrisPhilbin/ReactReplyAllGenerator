import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios'

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    progess: {
        position: 'absolute'
    }
});


const SignUp = (props) => {

    let [userName, setUsername]               = useState('')
    let [email, setEmail]                     = useState('')
    let [password, setPassword]               = useState('')
    let [confirmPassword, setConfirmPassword] = useState('')
    let [errors, setErrors]                   = useState('')
    let [loading, setLoading]                 = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
		const newUserData = {
			username: userName,
			email: email,
			password: password,
			confirmPassword: confirmPassword
		};
		axios
			.post('https://sleepy-plateau-48238.herokuapp.com/https://us-central1-replyallgenerator.cloudfunctions.net/api/signup', newUserData)
			.then((response) => {
				localStorage.setItem('AuthToken', `${response.data.token}`);
                setLoading(false)
				props.history.push('/');
			})
			.catch((error) => {
                setErrors(error.response.data)
                setLoading(false)
			});
	};

    const { classes } = props

    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="User Name"
                                name="username"
                                autoComplete="username"
                                helperText={errors.username}
                                error={errors.username ? true : false}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                helperText={errors.email}
                                error={errors.email ? true : false}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                helperText={errors.password}
                                error={errors.password ? true : false}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        disabled={
                            loading || 
                            !password ||
                            !email ||  
                            !userName
                        }
                    >
                        Sign Up
                        {loading && <CircularProgress size={30} className={classes.progess} />}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default withStyles(styles)(SignUp)