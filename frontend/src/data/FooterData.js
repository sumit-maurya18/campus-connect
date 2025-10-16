// footerData.js

export const footerLinks = {
  quickLinks: {
    title: "Quick Links",
    links: [
      { name: "About Us", url: "#about-us-section" },
      { name: "Contact", url: "#contact" },
      { name: "Privacy Policy", url: "#privacy" },
      { name: "Terms of Service", url: "#terms" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { name: "Internships", url: "#internship-section" },
      { name: "Jobs", url: "#full-time-section" },
      { name: "Hackathons", url: "#hackathon-section" },
      { name: "Learning", url: "#learning-section" },
    ],
  },
};
// Updated social links to specify the Lucide Icon name
export const socialLinks = [
  { icon: 'Twitter', url: '#twitter' }, 
  { icon: 'Linkedin', url: '#linkedin' }, // Note: Lucide uses 'Linkedin' with a capital L
  { icon: 'Discord', url: '#discord' },
];