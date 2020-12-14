// ReactJS components
import React from "react";

// Local ReactJs components
import HomepageHeader from "../components/HomepageHeader";
import HomepageInformation from "../components/HomepageInformation";
import LandingPageForm from "../components/LandingPageForm";

export default function HomepageScreen() {
    return (
        <div>
            <HomepageHeader />
            <HomepageInformation />
            <LandingPageForm />
        </div>

    );
}