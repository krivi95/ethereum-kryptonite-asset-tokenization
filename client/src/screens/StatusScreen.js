// ReactJS components
import React, { useState } from "react";

// Local ReactJs components
import HomepageHeader from "../components/HomepageHeader";
import BuyTokens from "../components/BuyTokens";
import KYCStatus from "../components/KYCStatus";

// Contract context
import ContractContex from "../context/ContractContex"

export default function StatusScreen(props) {
    const [isKycCompleted, setIsKycCompleted] = useState(false);

    // If user has been automatically redirected to this page right after signing up (from Langing Page)
    // Automatically populate address field, with the address he/she provided, on the status page, for KYC check.
    let addressLandingPage = null
    if(props.location && props.location.state){
        addressLandingPage = props.location.state.address;
    }

    return (
        <ContractContex.Consumer>
            {web3 => (
                <div>
                    <HomepageHeader />
                    <KYCStatus contractContext={web3} tokenPurchaseEnabled={setIsKycCompleted} address={addressLandingPage}/>
                    {isKycCompleted && <BuyTokens contractContext={web3}/>}
                </div>
            )}
        </ContractContex.Consumer >
    );
}