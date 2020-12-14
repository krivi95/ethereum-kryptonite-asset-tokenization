import React, { useState, useEffect } from 'react';

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

function partial(func /*, 0..n args */) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var allArguments = args.concat(Array.prototype.slice.call(arguments));
        return func.apply(this, allArguments);
    };
}

async function getTokenBalance(props, setBalance) {
    let amount = await props.contractContext.kryptoniteToken.methods.balanceOf(props.contractContext.accounts[0]).call();
    setBalance(amount);
}

async function listenToTransferEvent(props, setBalance) {
    let callback = partial(getTokenBalance, props, setBalance);
    props.contractContext.kryptoniteToken.events.Transfer({ to: props.contractContext.accounts[0] }).on("data", callback);
}


export default function BuyTokens(props) {
    const classes = useStyles();
    const [myBalance, setBalance] = useState(0);
    const [buyTokenAmount, setBuyTokenAmount] = useState(10);

    // useEffect hook for getting the balance of KRY tokens
    useEffect(() => {
        getTokenBalance(props, setBalance);
    }, [props, setBalance]);

    // useEffect hook to subscribe to the emitted Transfer events on ERC20 smart contract
    // Only events related to the current address
    useEffect(() => {
        listenToTransferEvent(props, setBalance)
    }, [props, setBalance])

    function handleChange(event) {
        setBuyTokenAmount(event.target.value);
    }

    // Handling the process of buying the tokens (interraction with kryptoniteTokenSale smart contract)
    async function buyTokens() {
        await props.contractContext.kryptoniteTokenSale.methods.buyTokens(props.contractContext.accounts[0]).send({
            from: props.contractContext.accounts[0],
            value: buyTokenAmount
        })
    }

    return (
        <Container className={classes.container} >
            <Paper className={classes.root} elevation={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1 className={classes.title}>Buy Kryptonite Tokens</h1>
                        <h3 className={classes.title}>Contract address: {props.contractContext.kryptoniteTokenSaleAddress}</h3>
                        <h3 className={classes.title}>My Balance: {myBalance} KRY</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.button}
                            InputProps={{
                                className: classes.input
                            }}
                            id="buyTokenAmount"
                            label="Token amount"
                            variant="outlined"
                            value={buyTokenAmount}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button className={classes.button} variant="outlined" onClick={buyTokens}>Buy tokens</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};