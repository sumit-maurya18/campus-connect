// pages/Internships.jsx
import HackLearnPageTemplate from "../../components/HackLearnPageTemplate";
import Navbar from "@/components/Navbar";

const LearningsPage = () => {
    return (
        <div>
            <Navbar />
            <HackLearnPageTemplate
            pageType="learning" // This tells the template which data to fetch
            title="Learning Programs"
            subtitle="Explore upcoming Learning Opportunities and enhance your skills."/>
        </div>
    );
};

export default LearningsPage;