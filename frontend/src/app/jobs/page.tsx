// pages/Internships.jsx
import OpportunityPageTemplate from "../../components/OpportunityPageTemplate";
import Navbar from "@/components/Navbar";

const JobsPage = () => {
    return (
        <div>
            <Navbar />
            <OpportunityPageTemplate
            pageType="Full-Time" // This tells the template which data to fetch
            title="Find Full Time Opportunities"
            subtitle="Explore opportunities to gain practical experience and enhance your skills."/>
        </div>
    );
};

export default JobsPage;