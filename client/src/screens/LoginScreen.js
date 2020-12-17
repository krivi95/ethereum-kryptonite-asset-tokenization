// ReactJS components
import React, { useState } from "react";

// Local ReactJs components
import HomepageHeader from "../components/HomepageHeader";

// MaterialUI components
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

// React Router
import { Redirect } from "react-router-dom";


const useStyles = makeStyles({
    container: {
        marginTop: '3%',
        width: '40%'
    },
    root: {
        backgroundColor: "#20232a",
        border: '1px solid',
        borderRadius: 15,
        borderColor: "#18FF1E",
        padding: 10
    },
    title: {
        color: 'white',
        fontFamily: 'monospace',
        fontWeight: 'lighter',
    },
    subtitle: {
        color: 'white',
        fontFamily: 'monospace',
        fontWeight: 'bold'
    },
    button: {
        color: 'white',
        fontSize: "15px",
        fontFamily: 'monospace',
        fontWeight: 'lighter',
        "&:hover": {
            backgroundColor: "#282c34"
        }
    },
    input: {
        color: 'white',
    }
});

export default function LoginScreen() {
    const classes = useStyles();
    const [email, setEmail] = useState("Email address");
    const [password, setPassword] = useState("Password");
    const [redirectPage, setRedirectPage] = useState(null);

    function emailHandleChange(event) {
        setEmail(event.target.value);
    }

    function passwordHandleChange(event) {
        setPassword(event.target.value);
    }

    async function login(event) {
        setRedirectPage(<Redirect push to="/admin" />);
    }

    if (redirectPage != null) {
        return redirectPage;
    }
    else {
        return (
            <div>
                <HomepageHeader />
                <Container className={classes.container} >
                    <Paper className={classes.root} elevation={3}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <a href="https://en.wikipedia.org/wiki/Kryptonite">
                                    <img src="KryptoniteLogo.svg" alt="KryptoniteLogo" style={{ height: "160px", width: "160px" }} />
                                </a>
                                <div className={classes.subtitle}>
                                    ERC-20 token backed by <span style={{ color: "#18FF1E" }}>Kryptonite</span> mineral
                            </div>
                            </Grid>
                            <Grid item xs={12}>
                                <h1 className={classes.title}>Login page</h1>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.button}
                                    InputProps={{
                                        className: classes.input
                                    }}
                                    id="email"
                                    label="Email address"
                                    variant="outlined"
                                    value={email}
                                    onChange={emailHandleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.button}
                                    InputProps={{
                                        className: classes.input
                                    }}
                                    type="password"
                                    id="password"
                                    label="Password"
                                    variant="outlined"
                                    value={password}
                                    onChange={passwordHandleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button className={classes.button} variant="outlined" onClick={login} >Login</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </div>
        );
    }
}