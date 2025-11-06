// pages/Internships.jsx
import OpportunityPageTemplate from "../../components/OpportunityPageTemplate";
import Navbar from "@/components/Navbar";

const InternshipsPage = () => {
    return (
        <div>
            <Navbar />
            <OpportunityPageTemplate
            pageType="Internship" // This tells the template which data to fetch
            title="Find Your Next Internship"
            subtitle="Explore opportunities to gain practical experience and enhance your skills."/>
        </div>
    );
};

export default InternshipsPage;