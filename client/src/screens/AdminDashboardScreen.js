// ReactJS components
import React, { useState, useEffect } from "react";

// Local ReactJs components
import AdminHeader from "../components/AdminHeader";
import WhitelistAddress from "../components/WhitelistAddress";
import RequestsTable from "../components/RequestsTable";

// Contract context
import ContractContex from "../context/ContractContex"

// Firebase
import app from '../firebase/firebase';


export default function AdminDashboardScreen() {
    const [requests, setRequests] = useState([])
    const [requestsLoaded, setRequestsLoaded] = useState(false)
    useEffect(() => {
        async function getRequests() {
            /**
             * Getting the requests data from the database and updating state that stores that info.
             */
            const requestsRef = app.database().ref('requests');
            await requestsRef.on('value', (snapshot) => {
                const requests = snapshot.val();
                setRequests(requests);
                setRequestsLoaded(true);
            });
        }
        getRequests();
    }, []);

    return (
        <ContractContex.Consumer>
            {web3 => (
                <div>
                    <AdminHeader />
                    <WhitelistAddress contractContext={web3} />
                    {requestsLoaded && <RequestsTable contractContext={web3} requests={requests} title={"Requests"}/>}
                </div>
            )}
        </ContractContex.Consumer >
    );
}