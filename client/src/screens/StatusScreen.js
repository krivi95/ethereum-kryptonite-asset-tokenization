// ReactJS components
import React, { useState } from "react";

// Local ReactJs components
import HomepageHeader from "../components/HomepageHeader";
import BuyTokens from "../components/BuyTokens";
import KYCStatus from "../components/KYCStatus";

// Contract context
import ContractContex from "../context/ContractContex"

export default function StatusScreen() {
    const [isKycCompleted, setIsKycCompleted] = useState(false);

    return (
        <ContractContex.Consumer>
            {web3 => (
                <div>
                    <HomepageHeader />
                    <KYCStatus contractContext={web3} tokenPurchaseEnabled={setIsKycCompleted}/>
                    {isKycCompleted && <BuyTokens contractContext={web3}/>}
                </div>
            )}
        </ContractContex.Consumer >
    );
}