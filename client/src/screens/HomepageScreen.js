// ReactJS components
import React from "react";

// Local ReactJs components
import HomepageHeader from "../components/HomepaegHeader";
import HomepageInformation from "../components/HomepageInformation";

export default function HomepageScreen() {
    return (
        <div>
            <HomepageHeader />
            <HomepageInformation />
        </div>
    );
}