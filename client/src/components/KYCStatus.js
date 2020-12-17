import React, { useState } from 'react';

// MaterialUI components
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    container: {
        marginTop: '3%',
        width: '40%'
    },
    rootGreen: {
        backgroundColor: "#20232a",
        border: '1px solid',
        borderRadius: 15,
        borderColor: "#18FF1E",
        padding: 10
    },
    rootRed: {
        backgroundColor: "#20232a",
        border: '1px solid',
        borderRadius: 15,
        borderColor: "#ff0000",
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

export default function KYCStatus(props) {
    // Address that will be initially displayed in the text field.
    // Checking if the user has been redirected from the Landing Page form and if so, populate text field with specified address.
    let addressPlaceholder = "0x1234...";
    if (props.address){
        addressPlaceholder = props.address;
    }

    const classes = useStyles();
    const [address, setAddress] = useState(addressPlaceholder);
    const [statusMessage, setStatusMessage] = useState("");
    const [isKycCompleted, setIsKycCompleted] = useState(null);


    function handleChange(event) {
        setAddress(event.target.value);
    }

    // Interracting with KryptoniteTokenSale smart contract.
    // Checking if the specified address has been whitelisted and displaying appropriate message for that.
    // If the KYC process is completed allowing used in the parent container component to buy tokens.
    async function verifyAddress(event) {
        event.preventDefault();

        let isKycCompleted = false;

        // Get flag from token crowdsale smart contract
        try {
            isKycCompleted = await props.contractContext.kycContract.methods.isKycCompleted(address).call();
        } catch (error) {
            setStatusMessage("Please enter a valid address.");
            setIsKycCompleted(isKycCompleted);
            return;
        }

        // Updating the states
        setIsKycCompleted(isKycCompleted);
        if (isKycCompleted) {
            setStatusMessage("You address has been whitelisted. You can buy KRY toneks now.");
        }
        else {
            setStatusMessage("You address hasn't been whitelisted yet. Please have patience while your request is being processed.");
        }

        // Updating the parent component
        props.tokenPurchaseEnabled(isKycCompleted);
    }

    return (
        <Container className={classes.container} >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h1 className={classes.title}>Verify KYC process</h1>
                    <div className={classes.text}>
                        Specify the wallet address to check if your address has been whitelisted.
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
                    <Button className={classes.button} variant="outlined" onClick={verifyAddress} >Verify address</Button>
                </Grid>
                {isKycCompleted != null && isKycCompleted === false &&
                    <Grid item xs={12}>
                        <Paper className={classes.rootRed} elevation={3}>
                            <h2 className={classes.title}>{statusMessage}</h2>
                        </Paper>
                    </Grid>
                }
                {isKycCompleted &&
                    <Grid item xs={12}>
                        <Paper className={classes.rootGreen} elevation={3}>
                            <h2 className={classes.title}>{statusMessage}</h2>
                        </Paper>
                    </Grid>
                }
            </Grid>
        </Container>
    );
};