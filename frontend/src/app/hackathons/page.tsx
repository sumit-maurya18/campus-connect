// pages/Internships.jsx
import HackLearnPageTemplate from "../../components/HackLearnPageTemplate";
import Navbar from "@/components/Navbar";

const HackathonsPage = () => {
    return (
        <div>
            <Navbar />
            <HackLearnPageTemplate
            pageType="hackathon" // This tells the template which data to fetch
            title="Hackathons"
            subtitle="Explore upcoming hackathons and showcase your skills."/>
        </div>
    );
};

export default HackathonsPage;