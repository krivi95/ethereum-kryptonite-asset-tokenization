import React, { useState } from 'react';

// MaterialUI components
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


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

export default function WhitelistAddress(props) {
    const classes = useStyles();
    const [address, setAddress] = useState("0x1234...");

    function handleChange(event) {
        setAddress(event.target.value);
    }

    async function handleSubmit(event) {
        /**
         * Interacting with smart contract - Approving KYC for specified address.
         */
        await props.contractContext.kycContract.methods.approveAddress(address).send({
            from: props.contractContext.accounts[0]
        });
        event.preventDefault();
        alert('A name was submitted: ' + address);
    }

    return (
        <Container className={classes.container} >
            <Paper className={classes.root} elevation={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1 className={classes.title}>Whitelist address:</h1>
                        <div className={classes.text}>
                            Manually approve address to allow investors to buy tokens.
                        </div>
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
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button className={classes.button} variant="outlined" onClick={handleSubmit} >Approve address</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};