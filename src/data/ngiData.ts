export interface Institution {
  id: string;
  name: string;
  shortName: string;
  category:
    | "medical_sciences"
    | "ayurveda_nursing"
    | "biotechnology_management"
    | "industrial_training"
    | "law"
    | "engineering";
  location: string;
  district: string;
  state: string;
  affiliation: string;
  description: string;
  featuredCourses: string[];
  bannerImage: string;
}

export const INSTITUTION_CATEGORIES: Record<Institution["category"], string> = {
  medical_sciences: "Medical Sciences",
  ayurveda_nursing: "Ayurveda Nursing",
  biotechnology_management: "Biotechnology & Management",
  industrial_training: "Industrial Training",
  law: "Law",
  engineering: "Engineering & Technology",
};

export interface Course {
  id: string;
  name: string;
  level: 'UG' | 'PG' | 'Diploma' | 'Integrated' | 'Vocational';
  stream: string;
  duration: string;
  institution: string;
  eligibility: string;
  careerProspects: string;
  badge?: string;
}

export interface StatItem {
  number: string;
  label: string;
  description: string;
  iconName: string;
}

export const NGI_STATS: StatItem[] = [
  {
    number: "16+",
    label: "Years of Educational Excellence",
    description: "Established in Upali Oden, Nathdwara near Udaipur, Rajasthan",
    iconName: "Award",
  },
  {
    number: "6+",
    label: "Institutes & Specialized Wings",
    description: "Engineering, Biotechnology, Management, Pharmacy & Teacher Education",
    iconName: "Building2",
  },
  {
    number: "45+",
    label: "Undergraduate & Postgrad Programs",
    description: "B.Tech, BCA, B.Sc, B.Pharm, Integrated B.Ed, MBA & Polytechnic",
    iconName: "GraduationCap",
  },
  {
    number: "8,500+",
    label: "Alumni & Active Students",
    description: "Youth from across Rajasthan, Gujarat, MP and northern states",
    iconName: "Users",
  },
  {
    number: "120+",
    label: "Corporate Recruiting Partners",
    description: "Leading manufacturing, tech, core engineering and regional giants",
    iconName: "Briefcase",
  },
  {
    number: "30+ Acres",
    label: "Lush Green Aravali Campus",
    description: "Wi-Fi enabled hi-tech campus, digital labs, sports ground & hostels",
    iconName: "TreePine",
  }
];

export const NGI_INSTITUTIONS: Institution[] = [
  {
    id: "vdsms",
    name: "Vallabh Darshan Society for Medical Science",
    shortName: "VDSMS",
    category: "medical_sciences",
    location: "Upali Oden, Nathdwara",
    district: "Rajsamand",
    state: "Rajasthan",
    affiliation: "Society approved by AICTE · Affiliations: NCVT, RTU Kota, MLSU, ALU Jaipur, BTER Jodhpur",
    description:
      "Premier medical sciences & paramedical training institution offering DMLT, Community Medical Services, and PMKVY healthcare certifications in Nathdwara.",
    featuredCourses: ["DMLT Pathology", "CMS & ED", "Healthcare Skilling"],
    bannerImage: "/institutions/vdsms-card.jpg",
  },
  {
    id: "ayurved-nursing",
    name: "Nathdwara College of B.Sc. Ayurveda Nursing",
    shortName: "NCAN",
    category: "ayurveda_nursing",
    location: "Upali Oden, Nathdwara",
    district: "Rajsamand",
    state: "Rajasthan",
    affiliation: "Affiliated to Dr. S. R. Rajasthan Ayurved University, Jodhpur · Approved by Govt. of Rajasthan",
    description:
      "Specialized Ayurveda nursing college integrating modern clinical nursing practices with ancient holistic Ayurvedic patient care and Panchakarma therapies.",
    featuredCourses: ["B.Sc. Ayurveda Nursing", "Diploma Ayush Nursing (DAN&P)"],
    bannerImage: "/institutions/ayurved-nursing-card.jpg",
  },
  {
    id: "nibm",
    name: "Nathdwara Institute of Biotechnology & Management",
    shortName: "NIBM",
    category: "biotechnology_management",
    location: "Upali Oden, Nathdwara",
    district: "Rajsamand",
    state: "Rajasthan",
    affiliation: "Affiliated to MLSU Udaipur | Approved by NCTE & Govt. of Rajasthan",
    description:
      "Premier MLSU-affiliated college offering BCA, B.Sc. (PCM/CBZ), B.A.-B.Ed., B.Sc.-B.Ed. (ITEP), and M.Sc. with 11+ specialized science & computer labs, NDLI digital library, and on-campus hostels.",
    featuredCourses: ["BCA", "B.Sc. (PCM / BZC)", "ITEP & B.Ed. integrated", "M.Sc. (Maths/Phy/Chem/Zoo)"],
    bannerImage: "/institutions/nibm-card.jpg",
  },
  {
    id: "npiti",
    name: "Nathdwara Private Industrial Training Institute",
    shortName: "NPITI",
    category: "industrial_training",
    location: "Upali Oden, Nathdwara",
    district: "Rajsamand",
    state: "Rajasthan",
    affiliation: "Affiliated to NCVT · Administered by DTE Rajasthan, Jodhpur",
    description:
      "Vocational training institute offering 2-year NCVT trades in Electrician and Fitter, with a placement cell for campus interviews and industry linkage.",
    featuredCourses: ["ITI Electrician (2 Yrs)", "ITI Fitter (2 Yrs)"],
    bannerImage: "/institutions/npiti-card.jpg",
  },
  {
    id: "nlc",
    name: "Nathdwara Law College",
    shortName: "NLC",
    category: "law",
    location: "Upali Oden, Nathdwara",
    district: "Rajsamand",
    state: "Rajasthan",
    affiliation: "Affiliated to Dr. Bhimrao Ambedkar Law University, Jaipur · BCI approved",
    description:
      "Law college of the Nathdwara Group offering the 3-year LL.B., affiliated to Dr. Bhimrao Ambedkar Law University, Jaipur, with fee concessions and scholarships for meritorious and needy students.",
    featuredCourses: ["LL.B. (3 Years)", "Library of ~10,000 books"],
    bannerImage: "/institutions/nlc-card.jpg",
  },
  {
    id: "niet",
    name: "Nathdwara Institute of Engineering and Technology",
    shortName: "NIET",
    category: "engineering",
    location: "Upali Oden, Nathdwara",
    district: "Rajsamand",
    state: "Rajasthan",
    affiliation: "Approved by AICTE New Delhi & Affiliated to RTU Kota",
    description:
      "Engineering and technology wing of the Nathdwara Group, sharing the campus library, laboratories, hostels and transport. Contact the admission desk for current programmes.",
    featuredCourses: ["B.Tech Computer Science", "B.Tech Civil Engineering", "Polytechnic Diploma"],
    bannerImage: "/institutions/niet-card.jpg",
  }
];

export const FEATURED_COURSES: Course[] = [
  {
    id: "c-btech-cse",
    name: "B.Tech Computer Science & Engineering",
    level: "UG",
    stream: "Engineering",
    duration: "4 Years",
    institution: "Nathdwara Institute of Engineering & Technology (NIET)",
    eligibility: "10+2 with Physics & Mathematics (REAP / JEE Main or Direct Merit)",
    careerProspects: "Full-Stack Developer, Software Engineer, Cloud Architect, Data Analyst in IT giants",
    badge: "Most Popular",
  },
  {
    id: "c-btech-civil",
    name: "B.Tech Civil Engineering",
    level: "UG",
    stream: "Engineering",
    duration: "4 Years",
    institution: "Nathdwara Institute of Engineering & Technology (NIET)",
    eligibility: "10+2 with Physics, Chemistry & Mathematics",
    careerProspects: "Structural Engineer, Highway Construction, PWD, NHAI, Real Estate & Urban Planning",
  },
  {
    id: "c-btech-mech",
    name: "B.Tech Mechanical Engineering",
    level: "UG",
    stream: "Engineering",
    duration: "4 Years",
    institution: "Nathdwara Institute of Engineering & Technology (NIET)",
    eligibility: "10+2 with PCM (REAP / JEE Main / Direct)",
    careerProspects: "Design Engineer, Automobile Manufacturing, Thermal Power Plants, Industrial Automation",
  },
  {
    id: "c-btech-ee",
    name: "B.Tech Electrical Engineering",
    level: "UG",
    stream: "Engineering",
    duration: "4 Years",
    institution: "Nathdwara Institute of Engineering & Technology (NIET)",
    eligibility: "10+2 with Physics & Mathematics",
    careerProspects: "Power Grid Engineer, DISCOM Junior Engineer, Renewable Energy & Substation Specialist",
  },
  {
    id: "c-polytechnic",
    name: "Diploma in Engineering (Polytechnic)",
    level: "Diploma",
    stream: "Engineering",
    duration: "3 Years (2 Yrs for ITI/12th)",
    institution: "Nathdwara Institute of Engineering & Technology (NIET)",
    eligibility: "10th Standard Pass (or 12th Science / ITI for Lateral Entry)",
    careerProspects: "Junior Engineer (JE) in Govt. Departments, Railways, Mining & Manufacturing Industries",
    badge: "Lateral Entry Open",
  },
  {
    id: "c-bca",
    name: "BCA (Bachelor of Computer Applications)",
    level: "UG",
    stream: "Computer Applications",
    duration: "3 Years",
    institution: "Nathdwara Institute of Biotechnology & Management (NIBM)",
    eligibility: "10+2 in Arts, Commerce or Science; admission through MLSU common entrance",
    careerProspects: "Software Engineer, Network Engineer, Database Administrator, System Analyst, MCA / MBA pathways",
    badge: "High Demand",
  },
  {
    id: "c-bsc-pcm",
    name: "B.Sc. (Physics, Chemistry, Mathematics - PCM)",
    level: "UG",
    stream: "Basic Sciences",
    duration: "3 Years",
    institution: "Nathdwara Institute of Biotechnology & Management (NIBM)",
    eligibility: "10+2 with Science (Mathematics) — 70 seats, ₹11,000 per semester",
    careerProspects: "Scientific Officer, Civil Services, School Lecturer, M.Sc. & Higher Research Pathways",
  },
  {
    id: "c-bsc-cbz",
    name: "B.Sc. (Botany, Zoology, Chemistry - BZC)",
    level: "UG",
    stream: "Life Sciences",
    duration: "3 Years",
    institution: "Nathdwara Institute of Biotechnology & Management (NIBM)",
    eligibility: "10+2 with Science (Biology) — MLSU Udaipur",
    careerProspects: "Botanist, Zoologist, Environmental Analyst, Clinical Lab Specialist, Pharma R&D",
  },
  {
    id: "c-msc-chem",
    name: "M.Sc. Chemistry (CBCS)",
    level: "PG",
    stream: "Basic Sciences",
    duration: "2 Years",
    institution: "Nathdwara Institute of Biotechnology & Management (NIBM)",
    eligibility: "B.Sc. — 40 seats, ₹11,000 per semester",
    careerProspects: "Lectureship (CSIR NET/SET), Analytical Chemist in Pharma & Mineral Industries, R&D Labs",
    badge: "CBCS Pattern",
  },
  {
    id: "c-msc-phy",
    name: "M.Sc. Physics (CBCS)",
    level: "PG",
    stream: "Basic Sciences",
    duration: "2 Years",
    institution: "Nathdwara Institute of Biotechnology & Management (NIBM)",
    eligibility: "B.Sc. — 40 seats, ₹12,000 per semester",
    careerProspects: "Lectureship (CSIR NET), Physics Researcher, Defense Laboratories, Data Analyst",
    badge: "CBCS Pattern",
  },
  {
    id: "c-msc-math",
    name: "M.Sc. Mathematics (CBCS)",
    level: "PG",
    stream: "Basic Sciences",
    duration: "2 Years",
    institution: "Nathdwara Institute of Biotechnology & Management (NIBM)",
    eligibility: "B.Sc. — 40 seats, ₹10,000 per semester",
    careerProspects: "Operations Research, Actuarial Analyst, Assistant Professor (NET), Data Science",
    badge: "CBCS Pattern",
  },
  {
    id: "c-msc-zoo",
    name: "M.Sc. Zoology (CBCS)",
    level: "PG",
    stream: "Life Sciences",
    duration: "2 Years",
    institution: "Nathdwara Institute of Biotechnology & Management (NIBM)",
    eligibility: "B.Sc. — 25 seats, ₹12,000 per year",
    careerProspects: "Wildlife Biologist, Ecologist, Fisheries Officer, Research Associate, Academic Lecturer",
    badge: "CBCS Pattern",
  },
  {
    id: "c-llb",
    name: "LL.B. (Bachelor of Law)",
    level: "UG",
    stream: "Law",
    duration: "3 Years",
    institution: "Nathdwara Law College (NLC)",
    eligibility: "Graduation in any discipline — 45% General, 42% OBC, 40% SC/ST",
    careerProspects: "Advocate, Legal Advisor, Judicial Services Aspirant, Corporate and Government Legal Roles",
    badge: "BCI Approved",
  },
  {
    id: "c-bsc-ayurved-nursing",
    name: "B.Sc. Ayurveda Nursing",
    level: "UG",
    stream: "Ayurveda Nursing",
    duration: "4 Years",
    institution: "Nathdwara College of B.Sc. Ayurveda Nursing (NCAN)",
    eligibility: "10+2 with Physics, Chemistry & Biology (PCB) with min 45% marks",
    careerProspects: "Ayurvedic Hospital Staff Nurse, Panchakarma Specialist Nurse, Ayush Medical Officer Assistant, Wellness Clinics",
    badge: "Ayush Approved",
  },
  {
    id: "c-dan-p",
    name: "Diploma in Ayush Nursing & Pharmacy (DAN&P)",
    level: "Diploma",
    stream: "Ayurveda Nursing",
    duration: "2.5 Years",
    institution: "Nathdwara College of B.Sc. Ayurveda Nursing (NCAN)",
    eligibility: "10+2 with Science (PCB) or recognized equivalent",
    careerProspects: "Government Ayush Clinics, Ayurvedic Dispensaries, Herbal Pharmacy In-charge",
  },
  {
    id: "c-dmlt",
    name: "DMLT (Diploma in Medical Laboratory Technology)",
    level: "Diploma",
    stream: "Medical Sciences",
    duration: "2 Years",
    institution: "Vallabh Darshan Society for Medical Science (VDSMS)",
    eligibility: "10+2 with Science (PCB / PCM)",
    careerProspects: "Medical Lab Technician, Pathology Diagnostic Centers, Hospital Blood Bank Technician, Lab In-charge",
    badge: "High Placement",
  },
  {
    id: "c-cms-ed",
    name: "CMS & ED (Community Medical Services & Essential Drugs)",
    level: "Diploma",
    stream: "Medical Sciences",
    duration: "18 Months",
    institution: "Vallabh Darshan Society for Medical Science (VDSMS)",
    eligibility: "10+2 or equivalent pass",
    careerProspects: "Rural Primary Health Worker, Community Health Center Assistant, First-Aid Care Provider",
  },
  {
    id: "c-pmkvy-health",
    name: "Allied Healthcare Skill Certification (PMKVY / RSLDC)",
    level: "Vocational",
    stream: "Medical Sciences",
    duration: "6 - 12 Months",
    institution: "Vallabh Darshan Society for Medical Science (VDSMS)",
    eligibility: "10th or 12th Standard pass",
    careerProspects: "General Duty Assistant (GDA), Emergency Medical Technician, Home Healthcare Aide",
    badge: "Govt. Subsidized",
  },
  {
    id: "c-iti-elec",
    name: "ITI Electrician",
    level: "Vocational",
    stream: "Technical Trades",
    duration: "2 Years",
    institution: "Nathdwara Private Industrial Training Institute (NPITI)",
    eligibility: "10th Pass with Science and Math from recognized board",
    careerProspects: "Certified Electrician in Indian Railways, AVVNL/JVVNL DISCOMs, Thermal Power Stations, Industrial Plants",
    badge: "NCVT Approved",
  },
  {
    id: "c-iti-fitter",
    name: "ITI Fitter",
    level: "Vocational",
    stream: "Technical Trades",
    duration: "2 Years",
    institution: "Nathdwara Private Industrial Training Institute (NPITI)",
    eligibility: "10th Pass from recognized board",
    careerProspects: "Loco Workshop Fitter in Railways, Plant Maintenance Technician in Cement & Marble industries, BHEL, DRDO",
    badge: "NCVT Approved",
  },
  {
    id: "c-bsc-bed",
    name: "B.Sc.-B.Ed. (4-Year Integrated)",
    level: "Integrated",
    stream: "Teacher Education",
    duration: "4 Years",
    institution: "Nathdwara Institute of Biotechnology & Management (NIBM)",
    eligibility: "10+2 Science with 50% (45% reserved); admission through PTET — 50 seats",
    careerProspects: "Govt. & Private School Senior Science Teacher, Educational Consultant, Academics",
    badge: "NCTE Recognised",
  },
  {
    id: "c-itep-bsc-bed",
    name: "ITEP B.Sc. B.Ed. (Secondary)",
    level: "Integrated",
    stream: "Teacher Education",
    duration: "4 Years",
    institution: "Nathdwara Institute of Biotechnology & Management (NIBM)",
    eligibility: "10+2 with Science and qualify NCET (NTA) — 100 seats from 2026-27",
    careerProspects: "Secondary School Science Teacher, Educational Content Developer, Academic Coordinator",
    badge: "New · NEP 2020",
  },
  {
    id: "c-ba-bed",
    name: "BA-B.Ed. (4-Year Integrated Teacher Education)",
    level: "Integrated",
    stream: "Teacher Education",
    duration: "4 Years",
    institution: "Nathdwara Institute of Biotechnology & Management (NIBM)",
    eligibility: "10+2 with 50% (45% reserved); admission through PTET — 50 seats",
    careerProspects: "Senior Secondary School Teacher, Civil Services Aspirant, Academic Instructor",
    badge: "Integrated Program",
  }
];

export const PLACEMENT_PARTNERS = [
  { name: "Wonder Cement", category: "Core Industry" },
  { name: "JK Tyre", category: "Manufacturing" },
  { name: "Secure Meters", category: "Electronics/IoT" },
  { name: "Pyrotech", category: "Industrial Control" },
  { name: "TCS", category: "IT & Software" },
  { name: "Infosys", category: "IT & Software" },
  { name: "Wipro", category: "IT & Software" },
  { name: "L&T Construction", category: "Core Civil" },
  { name: "HCL Tech", category: "IT Services" },
  { name: "Ambuja Cement", category: "Core Industry" },
  { name: "HDFC Bank", category: "Banking & Finance" },
  { name: "ICICI Bank", category: "Banking & Finance" },
  { name: "Reliance Jio", category: "Telecom" },
  { name: "Tech Mahindra", category: "IT & Software" },
  { name: "Miraj Group", category: "Diversified FMCG" },
  { name: "RK Marble", category: "Mineral & Core" }
];

export const CAMPUS_FACILITIES = [
  {
    title: "Advanced Computer & IT Labs",
    tagline: "High-Speed Computing",
    description: "Over 500 modern computer systems, dedicated high-speed optical fiber leased line, latest IDEs, Python, Java, Oracle & AI development software.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=700&q=80",
    iconName: "Monitor",
  },
  {
    title: "Central Digital Library & NPTEL",
    tagline: "35,000+ Volumes & DELNET",
    description: "Rich collection of engineering, management, science, pharmacy, and education books, national journals, e-books, and active NPTEL local chapter.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=700&q=80",
    iconName: "BookOpen",
  },
  {
    title: "Engineering Workshops & Labs",
    tagline: "Hands-on Practical Training",
    description: "Fully equipped machine shop, carpentry, fitting, welding, foundry, civil surveying, fluid mechanics, electrical machines, and electronics testing labs.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=700&q=80",
    iconName: "Wrench",
  },
  {
    title: "Biotechnology & Pharmacy Labs",
    tagline: "State-of-the-Art Research",
    description: "Sophisticated tissue culture, microbiology, molecular biology, pharmacognosy, pharmaceutics, and analytical chemistry laboratories.",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=700&q=80",
    iconName: "FlaskConical",
  },
  {
    title: "Separate Boys & Girls Hostels",
    tagline: "Safe & Comfortable Living",
    description: "On-campus hostels with nutritious hygienic mess, RO drinking water, 24/7 security surveillance, recreational indoor games, and study rooms.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=700&q=80",
    iconName: "Home",
  },
  {
    title: "College Bus Fleet & Sports Ground",
    tagline: "Connectivity & Physical Wellness",
    description: "Daily bus service connecting Udaipur, Nathdwara, Rajsamand, Kankroli, Mavli & Fatehnagar, plus sprawling cricket, volleyball, and athletic grounds.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80",
    iconName: "Bus",
  }
];

export const SCHOLARSHIPS = [
  {
    title: "Rajasthan SJE Post-Matric Scholarship",
    waiver: "100% Tuition & Maintenance Allowance",
    criteria: "Eligible SC, ST, OBC, SBC, and EBC students belonging to Rajasthan under State Govt. social justice guidelines.",
    category: "Government Aid",
  },
  {
    title: "NGI Board Merit Scholarship",
    waiver: "Up to 50% Tuition Fee Concession",
    criteria: "Students securing 80%+ marks in 10+2 (RBSE / CBSE) or high rank in JEE Main / REAP / PTET examinations.",
    category: "Academic Excellence",
  },
  {
    title: "Beti Padhao Girl Child Incentive",
    waiver: "Special 20% Fee Concession",
    criteria: "Encouraging female students of Mewar and Rajasthan to pursue technical, pharmacy, and higher professional education.",
    category: "Women Empowerment",
  },
  {
    title: "Defense Personnel & Police Wards",
    waiver: "25% Fee Exemption",
    criteria: "Children of Indian Armed Forces, Ex-Servicemen, Paramilitary forces, and Rajasthan Police officers.",
    category: "National Service",
  },
  {
    title: "Shrinathji Need-Based Concession",
    waiver: "Up to 30% Fee Waiver",
    criteria: "Economically weaker families, orphans, and single-parent wards after institutional verification.",
    category: "Philanthropic Aid",
  }
];

export const LATEST_NEWS = [
  {
    date: "Admissions 2026-27",
    category: "Admissions",
    title: "Direct Admission Open for B.Tech, BCA, B.Sc, B.Pharm, D.Pharm, BA-B.Ed, B.Sc-B.Ed & Polytechnic for Academic Session 2026-27.",
    urgent: true,
  },
  {
    date: "12 Nov 2026",
    category: "Campus Placement",
    title: "Major placement drive held at NGI: Wonder Cement, Secure Meters, and Pyrotech recruit engineering and BCA graduates.",
    urgent: false,
  },
  {
    date: "08 Nov 2026",
    category: "Academic Notice",
    title: "RTU Kota Semester Examination forms and internal assessment submission schedule announced for NIET students.",
    urgent: false,
  },
  {
    date: "01 Nov 2026",
    category: "Events",
    title: "Annual Tech-Fest & Sports Meet 'Udaan' celebrated with great enthusiasm across Nathdwara campus.",
    urgent: false,
  }
];

export const TESTIMONIALS = [
  {
    name: "Vikram Singh Gehlot",
    batch: "B.Tech CSE (Batch 2023)",
    institution: "NIET Nathdwara",
    role: "Software Engineer, Infosys",
    quote: "The practical programming labs and dedicated Training & Placement guidance at NIET gave me the technical skill foundation to clear multiple MNC rounds right from campus.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Sneha Sharma",
    batch: "B.Sc-B.Ed Integrated (Batch 2024)",
    institution: "Nathdwara College of Education",
    role: "Senior Science Educator, Udaipur",
    quote: "The 4-year integrated B.Sc.-B.Ed. at NGI saved me a complete academic year. The teaching practice sessions and micro-teaching methodology are outstanding.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Mohit Kumawat",
    batch: "BCA (Batch 2023)",
    institution: "NIBM Nathdwara",
    role: "Web Applications Developer, Pyrotech",
    quote: "Studying BCA at NIBM under MLSU curriculum with hands-on industrial projects helped me build a real-world software portfolio before graduation.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  }
];
