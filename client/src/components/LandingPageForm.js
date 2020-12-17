import React, { useState } from 'react';

// MaterialUI components
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

// Firebase
import app from '../firebase/firebase';

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
    button: {
        color: 'white',
        fontSize: "15px",
        fontFamily: 'monospace',
        fontWeight: 'lighter',
        "&:hover": {
            backgroundColor: "#282c34"
        }
    },
    text: {
        color: 'white',
        fontFamily: 'monospace',
        fontWeight: 'bold'
    },
    input: {
        color: 'white',
    }
});

export default function LandingPageForm(props) {
    const classes = useStyles();
    const [firstName, setfirstName] = useState("Clark");
    const [lastName, setLastName] = useState("Kent");
    const [email, setEmail] = useState("clark.kent@superman.com");
    const [address, setAddress] = useState("0x123...");
    const [redirectPage, setRedirectPage] = useState(null);

    function handleChangeFirstName(event) {
        setfirstName(event.target.value);
    }

    function handleChangelastName(event) {
        setLastName(event.target.value);
    }

    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }

    function handleChangeAddress(event) {
        setAddress(event.target.value);
    }

    // Creating new requst to database
    async function handleSubmit(event) {
        const requestsRef = app.database().ref('requests');
        const request = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            address: address,
            kyc: false
        }
        requestsRef.push(request);

        alert('You have successfully registered! Please wait until KYC is completed. You may check the porgress on status page.');

        // If signup has been successful it it redirrecting user to status page to check his/her KYC status.
        setRedirectPage(
            <Redirect
                push
                to={{ 
                    pathname: "/status",
                    state: { address: address} 
                }}
            />
        );
    }

    if (redirectPage != null) {
        return redirectPage;
    }
    else {
        return (
            <Container className={classes.container} >
                <Paper className={classes.root} elevation={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <h1 className={classes.title}>Sign Up to buy Kryptonite!</h1>
                            <div className={classes.text}>
                                In order to buy tokens you must first go through KYC process. Once you have been approved (whitelisted)
                                you will be able to buy Kryptonite tokens. Please check on the status page your KYC process.
                        </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.button}
                                InputProps={{
                                    className: classes.input
                                }}
                                id="firstName"
                                label="First name"
                                variant="outlined"
                                value={firstName}
                                onChange={handleChangeFirstName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.button}
                                InputProps={{
                                    className: classes.input
                                }}
                                id="lastName"
                                label="Last name"
                                variant="outlined"
                                value={lastName}
                                onChange={handleChangelastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.button}
                                InputProps={{
                                    className: classes.input
                                }}
                                id="email"
                                label="Email"
                                variant="outlined"
                                value={email}
                                onChange={handleChangeEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.button}
                                InputProps={{
                                    className: classes.input
                                }}
                                id="address"
                                label="Address"
                                variant="outlined"
                                value={address}
                                onChange={handleChangeAddress}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button className={classes.button} variant="outlined" onClick={handleSubmit} >Submit request</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        );
    }
};