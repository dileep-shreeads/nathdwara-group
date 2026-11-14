export interface Institution {
  id: string;
  name: string;
  shortName: string;
  category: 'engineering' | 'biotech_mgmt' | 'pharmacy' | 'education' | 'iti' | 'management';
  location: string;
  district: string;
  state: string;
  approval: string;
  affiliation: string;
  description: string;
  featuredCourses: string[];
  bannerImage: string;
}

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
  },
];

export const NGI_INSTITUTIONS: Institution[] = [
  {
    id: "niet",
    name: "Nathdwara Institute of Engineering & Technology",
    shortName: "NIET",
    category: "engineering",
    location: "Upali Oden, Nathdwara",
    district: "Rajsamand",
    state: "Rajasthan",
    approval: "AICTE, New Delhi & Govt. of Rajasthan",
    affiliation: "Rajasthan Technical University (RTU), Kota",
    description: "Premier technical institute in Mewar region offering B.Tech and Polytechnic programs with advanced computing, IoT, robotics, and engineering workshop centers.",
    featuredCourses: ["B.Tech Computer Science & Engg", "B.Tech Civil Engineering", "B.Tech Mechanical Engineering", "Diploma Polytechnic"],
    bannerImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "nibm",
    name: "Nathdwara Institute of Biotechnology & Management",
    shortName: "NIBM",
    category: "biotech_mgmt",
    location: "Upali Oden, Nathdwara",
    district: "Rajsamand",
    state: "Rajasthan",
    approval: "Govt. of Rajasthan & NCTE Approved",
    affiliation: "Mohanlal Sukhadia University (MLSU), Udaipur",
    description: "Center of excellence for computational sciences, life sciences, commerce, and fundamental science research with molecular laboratories and computer centers.",
    featuredCourses: ["BCA (Bachelor of Computer Applications)", "B.Sc (Biotechnology / PCM / CBZ)", "BBA", "M.Sc (Chemistry, Zoology, Physics, Maths)"],
    bannerImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "site",
    name: "Shrinathji Institute of Technology & Engineering",
    shortName: "SITE",
    category: "engineering",
    location: "Bhansol Gadwada Road, Nathdwara",
    district: "Rajsamand",
    state: "Rajasthan",
    approval: "AICTE Approved, New Delhi",
    affiliation: "RTU Kota",
    description: "Industry-aligned engineering institution fostering technical innovation, smart prototyping, and competitive software engineering skills.",
    featuredCourses: ["B.Tech Artificial Intelligence", "B.Tech Electrical Engineering", "M.Tech Digital Communications"],
    bannerImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ncoe",
    name: "Nathdwara College of Education (Teacher Training)",
    shortName: "NCOE",
    category: "education",
    location: "Upali Oden, Nathdwara",
    district: "Rajsamand",
    state: "Rajasthan",
    approval: "NCTE (National Council for Teacher Education)",
    affiliation: "MLSU Udaipur & Govt. of Rajasthan",
    description: "Pioneering teacher education institution offering 4-year integrated dual degree programs and B.Ed. shaping progressive school educators.",
    featuredCourses: ["BA-B.Ed (4-Year Integrated)", "B.Sc-B.Ed (4-Year Integrated)", "B.Ed (2-Year Degree)"],
    bannerImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "nip",
    name: "Nathdwara Institute of Pharmacy",
    shortName: "NIP",
    category: "pharmacy",
    location: "Upali Oden, Nathdwara",
    district: "Rajsamand",
    state: "Rajasthan",
    approval: "Pharmacy Council of India (PCI) & AICTE",
    affiliation: "RUHS Jaipur",
    description: "Equipped with state-of-the-art pharmacognosy, pharmaceutical chemistry, machine room, and drug testing laboratories.",
    featuredCourses: ["B.Pharm (Bachelor of Pharmacy)", "D.Pharm (Diploma in Pharmacy)"],
    bannerImage: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sims",
    name: "Shrinathji Institute of Management Studies",
    shortName: "SIMS",
    category: "management",
    location: "Bhansol Road, Nathdwara",
    district: "Rajsamand",
    state: "Rajasthan",
    approval: "AICTE Approved",
    affiliation: "RTU Kota",
    description: "Developing modern corporate leaders, marketing analysts, financial consultants, and young entrepreneurs through practical case studies.",
    featuredCourses: ["MBA (Dual Specialization)", "Executive Management Workshops"],
    bannerImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ngi-iti",
    name: "NGI Industrial Training Institute",
    shortName: "NGI ITI",
    category: "iti",
    location: "Upali Oden, Nathdwara",
    district: "Rajsamand",
    state: "Rajasthan",
    approval: "NCVT & DGT, Govt. of India",
    affiliation: "BTER Jodhpur",
    description: "Practical vocational technical training with modern workshops for skill certification and immediate industrial employability.",
    featuredCourses: ["ITI Electrician (2 Years)", "ITI Fitter (2 Years)", "COPA (Computer Operator)"],
    bannerImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
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
    id: "c-bca",
    name: "BCA (Bachelor of Computer Applications)",
    level: "UG",
    stream: "Computer Applications",
    duration: "3 Years",
    institution: "Nathdwara Institute of Biotechnology & Management (NIBM)",
    eligibility: "10+2 in any stream with minimum 48% marks",
    careerProspects: "App Developer, Database Administrator, Web Developer, System Analyst, MCA pathways",
    badge: "High Demand",
  },
  {
    id: "c-bsc-bed",
    name: "B.Sc.-B.Ed. (4-Year Integrated ITEP)",
    level: "Integrated",
    stream: "Teacher Education",
    duration: "4 Years",
    institution: "Nathdwara College of Education",
    eligibility: "10+2 with Science stream (PCM / PCB) through PTET / Direct Merit",
    careerProspects: "Govt. & Private School Senior Science Teacher, Educational Consultant, Academics",
    badge: "Saves 1 Full Year",
  },
  {
    id: "c-ba-bed",
    name: "BA-B.Ed. (4-Year Integrated ITEP)",
    level: "Integrated",
    stream: "Teacher Education",
    duration: "4 Years",
    institution: "Nathdwara College of Education",
    eligibility: "10+2 in Arts / Commerce / Science through PTET / Direct Merit",
    careerProspects: "Senior Secondary School Teacher, Civil Services Aspirant, Academic Instructor",
    badge: "Integrated Program",
  },
  {
    id: "c-btech-civil",
    name: "B.Tech Civil Engineering",
    level: "UG",
    stream: "Engineering",
    duration: "4 Years",
    institution: "NIET Nathdwara",
    eligibility: "10+2 with Physics, Chemistry & Mathematics",
    careerProspects: "Structural Engineer, Highway Construction, PWD, NHAI, Real Estate & Urban Planning",
  },
  {
    id: "c-bpharm",
    name: "B.Pharm (Bachelor of Pharmacy)",
    level: "UG",
    stream: "Pharmacy",
    duration: "4 Years",
    institution: "Nathdwara Institute of Pharmacy",
    eligibility: "10+2 with PCB / PCM with min 45% marks",
    careerProspects: "Registered Pharmacist, Drug Inspector, Quality Control Manager, Pharma Manufacturing",
    badge: "PCI Approved",
  },
  {
    id: "c-dpharm",
    name: "D.Pharm (Diploma in Pharmacy)",
    level: "Diploma",
    stream: "Pharmacy",
    duration: "2 Years",
    institution: "Nathdwara Institute of Pharmacy",
    eligibility: "10+2 with Science (PCB or PCM)",
    careerProspects: "Hospital Pharmacist, Retail Pharmacy Owner, Medical Representative",
  },
  {
    id: "c-polytechnic",
    name: "Diploma in Engineering (Polytechnic)",
    level: "Diploma",
    stream: "Engineering",
    duration: "3 Years (2 Yrs for ITI/12th)",
    institution: "NIET Nathdwara",
    eligibility: "10th Standard Pass (or 12th Science / ITI for Lateral Entry)",
    careerProspects: "Junior Engineer (JE) in Govt. Departments, Railways, Mining & Manufacturing Industries",
  },
  {
    id: "c-bsc-biotech",
    name: "B.Sc Biotechnology",
    level: "UG",
    stream: "Life Sciences",
    duration: "3 Years",
    institution: "Nathdwara Institute of Biotechnology & Management (NIBM)",
    eligibility: "10+2 with Biology / Agriculture / Biotechnology",
    careerProspects: "Biotech Research Assistant, Clinical Lab Specialist, Food Processing, Quality Analyst",
  },
  {
    id: "c-mba",
    name: "MBA (Master of Business Administration)",
    level: "PG",
    stream: "Management",
    duration: "2 Years",
    institution: "Shrinathji Institute of Management Studies",
    eligibility: "Graduation in any discipline with min 50% (RMAC / CMAT / Direct)",
    careerProspects: "Marketing Manager, Financial Analyst, HR Executive, Operations Manager, Business Banker",
    badge: "Dual Specialization",
  },
  {
    id: "c-msc-chem",
    name: "M.Sc. Chemistry / Zoology / Physics",
    level: "PG",
    stream: "Basic Sciences",
    duration: "2 Years",
    institution: "NIBM Nathdwara",
    eligibility: "B.Sc. in relevant subject with min 50% marks",
    careerProspects: "Lectureship (NET/SET), Chemical Industries, Research Laboratories, School Lecturer",
  },
  {
    id: "c-iti-elec",
    name: "ITI Electrician & Fitter",
    level: "Vocational",
    stream: "Technical Trades",
    duration: "2 Years",
    institution: "NGI Industrial Training Institute",
    eligibility: "10th Pass from recognized board",
    careerProspects: "Certified Electrician, Fitter in Indian Railways, Discoms, Cement & Marble Plants",
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
