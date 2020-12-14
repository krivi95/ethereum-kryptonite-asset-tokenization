// ReactJS components
import React from "react";

// Contract context
import ContractContex from "../context/ContractContex"

// Local ReactJs components
import HomepageHeader from "../components/HomepageHeader";
import HomepageInformation from "../components/HomepageInformation";
import WhitelistAddress from "../components/WhitelistAddress";
import BuyTokens from "../components/BuyTokens";

export default function HomepageScreen() {
    return (
        <ContractContex.Consumer>
            {web3 => (
                <div>
                    <HomepageHeader />
                    <HomepageInformation />
                    <WhitelistAddress contractContext={web3}/>
                    <BuyTokens contractContext={web3}/>
                </div>
            )}
        </ContractContex.Consumer >
    );
}