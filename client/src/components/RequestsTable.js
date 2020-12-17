// ReactJS imports
import React, { useState, useEffect, useContext } from 'react';

// MaterialUI imports
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import { green, red } from '@material-ui/core/colors';

// Firebase
import app from '../firebase/firebase';

const useStyles = makeStyles({
    container: {
        marginTop: '3%',
        width: '60%'
    },
    table: {
        minWidth: 450,
        backgroundColor: "#20232a",
        color: "white"
    },
    tableContainer: {
        maxWidth: '90%',
        marginTop: 20,
        height: 500,
        backgroundColor: "#20232a",
        color: "white", border: '1px solid',
        borderRadius: 5,
    },
    text: {
        color: 'white'
    },
});


function createRows(requests, classes, approveOrDisapproveRequest) {
    /**
     * Creating and populating rows for a table.
     * For each request we have we create a new row.
     */
    let tableRows = [];
    for (let key in requests) {
        tableRows.push(
            < TableRow key={key} >
                <TableCell className={classes.text} component="th" scope="row">
                    {requests[key].address}
                </TableCell>
                <TableCell className={classes.text} align="right">{requests[key].firstName}</TableCell>
                <TableCell className={classes.text} align="right">{requests[key].lastName}</TableCell>
                <TableCell className={classes.text} align="right">{requests[key].email}</TableCell>
                <TableCell className={classes.text} align="center">{requests[key].kyc ? "Yes" : "No"}</TableCell>
                <TableCell className={classes.text} align="right">
                    <IconButton color="primary" aria-label="add to shopping cart" size="small" onClick={(event) => approveOrDisapproveRequest(event, key)}>
                        {requests[key].kyc ? <p style={{ color: red[500] }} >Disapprove</p> : <p style={{ color: green[500] }} >Approve</p>}
                        &nbsp;
                        {requests[key].kyc ? <CancelIcon color="secondary" /> : <VerifiedUserIcon style={{ color: green[500] }} />}
                    </IconButton>
                </TableCell>
            </ TableRow>
        );

    }
    return tableRows
}

export default function RequestsTable(props) {
    const classes = useStyles();

    const approveOrDisapproveRequest = async (event, requestId) => {
        /**
         * Function that handles the user action and updates the kyc status. 
         */

        // Change the KYC flaf
        let request = props.requests[requestId];
        request.kyc = !request.kyc;

        // Save record to the database
        const requessRef = app.database().ref('requests').child(requestId);
        await requessRef.update({
            kyc: request.kyc 
        });
        request.kyc? alert("Successfully approved the request!") : alert("Revoked the request!");

    }

    let tableRows = createRows(props.requests, classes, approveOrDisapproveRequest);

    return (
        <Container className={classes.container} >
            <TableContainer component={Paper} className={classes.tableContainer}>
                <h4 align="left">&nbsp;&nbsp;&nbsp;{props.title}</h4>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.text} align="left" style={{ 'fontWeight': 'bold' }}>Address</TableCell>
                            <TableCell className={classes.text} align="right" style={{ 'fontWeight': 'bold' }}>Name</TableCell>
                            <TableCell className={classes.text} align="right" style={{ 'fontWeight': 'bold' }}>Surname</TableCell>
                            <TableCell className={classes.text} align="right" style={{ 'fontWeight': 'bold' }}>Email</TableCell>
                            <TableCell className={classes.text} align="right" style={{ 'fontWeight': 'bold' }}>KYC completed</TableCell>
                            <TableCell className={classes.text} align="center" style={{ 'fontWeight': 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableRows}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}