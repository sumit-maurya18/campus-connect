// pages/Internships.jsx
import OpportunityPageTemplate from "../../components/OpportunityPageTemplate";
import Navbar from "@/components/Navbar";

const InternshipsPage = () => {
    return (
        <div>
            <Navbar />
            <OpportunityPageTemplate
            pageType="job" // This tells the template which data to fetch
            title="Find Full Time Opportunities"
            subtitle="Explore opportunities to gain practical experience and enhance your skills."/>
        </div>
    );
};

export default InternshipsPage;