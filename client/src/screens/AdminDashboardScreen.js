// ReactJS components
import React from "react";

// Local ReactJs components
import AdminHeader from "../components/AdminHeader";
import WhitelistAddress from "../components/WhitelistAddress";

// Contract context
import ContractContex from "../context/ContractContex"

export default function AdminDashboardScreen() {

    return (
        <ContractContex.Consumer>
            {web3 => (
                <div>
                    <AdminHeader />
                    <WhitelistAddress contractContext={web3}/>
                </div>
            )}
        </ContractContex.Consumer >
    );
}