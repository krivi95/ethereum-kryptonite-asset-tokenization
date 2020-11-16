import React from 'react';

// MaterialUI imports
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

export default function HomepageInformation() {
    return (
        <Container style={{ 'marginTop': '2%', 'width': '100%' }}>
            <Grid container spacing={2}>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <h2 style={{ 'color': 'white', 'fontFamily': 'monospace', 'fontWeight': 'bold'}}>
                        Obviously a fake stablecoin backed by <span style={{ color: "#18FF1E" }}>Kryptonite</span> mineral
                    </h2>
                    <h2 style={{ 'color': 'white', 'fontFamily': 'monospace', 'fontWeight': 'lighter' }}>
                        Each Kryptonite ERC-20 token is 1-to-1 pegged to the 1g of Kryptonite mineral
                    </h2>
                    <a href="https://en.wikipedia.org/wiki/Kryptonite">
                        <img src="KryptoniteLogo.svg" alt="KryptoniteLogo" style={{ height: "160px", width: "160px" }} />
                    </a>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </Container>
    );
}