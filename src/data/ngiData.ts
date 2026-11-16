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
  },
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
    affiliation: "Nathdwara Group of Institutions",
    description:
      "A specialist medical sciences institution within the Nathdwara Group. Contact the institution for current program, eligibility and admission information.",
    featuredCourses: ["Medical sciences", "Program details on enquiry"],
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
    affiliation: "Nathdwara Group of Institutions",
    description:
      "A specialist nursing college in Nathdwara. Contact the institution to confirm current course availability, eligibility and admission requirements.",
    featuredCourses: ["B.Sc. Ayurveda Nursing", "Nursing education"],
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
    affiliation: "Nathdwara Group of Institutions",
    description:
      "A specialist institution focused on biotechnology and management. Contact NIBM for current programs, eligibility and admissions.",
    featuredCourses: ["Biotechnology", "Management"],
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
    affiliation: "Nathdwara Group of Institutions",
    description:
      "A private industrial training institute in Nathdwara. Contact NPITI for details about available trades, eligibility and admissions.",
    featuredCourses: ["Industrial training", "Trade details on enquiry"],
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
    affiliation: "Nathdwara Group of Institutions",
    description:
      "A law college within the Nathdwara Group. Contact the college to confirm current law programs, eligibility and admission details.",
    featuredCourses: ["Law programs", "Program details on enquiry"],
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
    affiliation: "Nathdwara Group of Institutions",
    description:
      "A specialist engineering and technology institution in Nathdwara. Contact NIET for current courses, eligibility and admission requirements.",
    featuredCourses: ["Engineering", "Technology"],
    bannerImage: "/institutions/niet-card.jpg",
  }
];

export interface InstitutionLeaderMessage {
  name: string;
  role: string;
  quote?: string;
  text: string[];
}

export interface InstitutionContactPerson {
  name: string;
  role: string;
  phone?: string;
  email?: string;
}

export interface InstitutionSiteContent {
  tagline: string;
  heroImage: string;
  welcome: string[];
  highlights: string[];
  /** Keywords matched against Course.institution to list this institution's courses */
  courseMatch: string[];
  phone?: string;
  vision?: string;
  mission?: { title: string; description: string }[];
  messages?: InstitutionLeaderMessage[];
  contacts?: InstitutionContactPerson[];
}

export const INSTITUTION_SITES: Record<string, InstitutionSiteContent> = {
  niet: {
    tagline: "Engineering a future-ready workforce",
    heroImage: "/institutions/niet.jpg",
    welcome: [
      "Nathdwara Institute of Engineering and Technology (NIET) is the engineering wing of the Nathdwara Group of Institutions, located on the lush green Aravali campus at Upali Oden, Nathdwara. The institute prepares students for careers in core engineering and modern software disciplines through a blend of classroom learning and intensive practical training.",
      "With fully equipped workshops, digital computer labs, and an active Training & Placement cell, NIET students follow the RTU Kota academic calendar and graduate ready for industry, government engineering services, and higher studies.",
    ],
    highlights: [
      "B.Tech and Polytechnic programs with lateral-entry options",
      "Machine shop, surveying, fluid mechanics and electronics labs",
      "Training & Placement cell with 120+ recruiting partners",
      "Wi-Fi enabled campus with hostels and daily bus fleet",
    ],
    courseMatch: ["NIET"],
  },
  nibm: {
    tagline: "Value-based education for all-round development",
    heroImage: "/institutions/nibm.jpg",
    welcome: [
      "Nathdwara Institute of Biotechnology & Management (NIBM) offers career-oriented programs across biotechnology, computer applications, basic sciences and management on the Nathdwara Group campus at Upali Oden.",
      "The institute's vision is to provide value education leading to the all-round development of students through need-based, career-oriented education with an emphasis on personality and social concerns.",
    ],
    highlights: [
      "BCA, B.Sc Biotechnology and M.Sc programs under MLSU curriculum",
      "Tissue culture, microbiology and molecular biology laboratories",
      "Industry projects that build real-world portfolios before graduation",
      "Central digital library with 35,000+ volumes and NPTEL chapter",
    ],
    courseMatch: ["NIBM"],
    phone: "9829234138",
  },
  nlc: {
    tagline: "Step up towards justice",
    heroImage: "/institutions/nlc.jpg",
    welcome: [
      "Nathdwara Law College (NLC) is the law wing of the Nathdwara Group of Institutions, serving aspiring advocates and legal professionals from the Mewar region.",
      "The college combines a university-affiliated law curriculum with moot court practice and guidance from experienced faculty. Contact the college office for the current programs, eligibility and admission schedule.",
    ],
    highlights: [
      "University-affiliated law programs",
      "Moot court sessions and legal-aid awareness activities",
      "Experienced faculty with courtroom exposure",
      "Shared NGI campus library, hostels and transport",
    ],
    courseMatch: ["Law College", "NLC"],
    phone: "7014810591",
  },
  npiti: {
    tagline: "Skilled trades, real careers",
    heroImage: "/institutions/npiti.jpg",
    welcome: [
      "Nathdwara Private Industrial Training Institute (NPITI) delivers hands-on vocational training that leads directly to employment in railways, discoms, cement, marble and manufacturing industries across Rajasthan.",
      "Training follows a workshop-first approach: students spend most of their time on machines and live electrical boards, supported by the group's engineering faculty.",
    ],
    highlights: [
      "ITI trades including Electrician and Fitter",
      "Workshop-first training on industry-grade equipment",
      "Pathways to Polytechnic lateral entry within NGI",
      "Placement support with regional industrial recruiters",
    ],
    courseMatch: ["Industrial Training", "ITI"],
  },
  vdsms: {
    tagline: "Compassionate care, scientific excellence",
    heroImage: "/institutions/vdsms.jpg",
    welcome: [
      "Vallabh Darshan Society for Medical Science (VDSMS) is the medical sciences wing of the Nathdwara Group of Institutions at Upali Oden, Nathdwara. The institution is committed to imparting quality, ethical and professional education that gives direction, purpose and values to life.",
      "VDSMS aims to equip students with a positive attitude, professional skills and social responsibility so they can build successful careers and contribute to the nation as responsible citizens. The institute also runs skill-development programs under the PMKVY and RSLDC schemes.",
    ],
    highlights: [
      "Medical sciences education within the NGI campus",
      "Skill-development programs under PMKVY & RSLDC",
      "Access to shared NGI labs, library and hostels",
      "Scholarship support under state and NGI schemes",
    ],
    courseMatch: ["VDSMS", "Medical Science"],
    phone: "9636815142",
    vision:
      "We offer our students numerous curricular and co-curricular opportunities that empower them to become conscientious and responsible citizens of the community.",
    mission: [
      {
        title: "Academic Excellence",
        description:
          "To impart quality, affordable education in medical, engineering and academic fields with a focus on innovation and ethical practice.",
      },
      {
        title: "Research & Innovation",
        description:
          "To promote research that responds to regional and global healthcare challenges.",
      },
      {
        title: "Skill Development",
        description:
          "To equip students with practical skills, leadership qualities, and a human-centric approach.",
      },
    ],
    messages: [
      {
        name: "Chairman",
        role: "Chairman's Message",
        quote: "The power of the future is the power of the mind.",
        text: [
          "If mass production characterized the industrial revolution, individual creativity and brilliance marks the youth's revolution of this century. Development is no longer symbolized by imposing plants and machinery; instead knowledge is now universally recognized as the true strength of a nation.",
          "It is important to be led by a set of agreed shared beliefs. To achieve this we need to enter into learning conversations to define and articulate such a philosophy. As it is said: \"If you stand for nothing you will fall for anything.\"",
        ],
      },
      {
        name: "Mr. Deepesh Parikh",
        role: "Managing Director",
        text: [
          "Education is not limited to bookish knowledge but it is a tool that gives direction, purpose and values to life. Our institution, Vallabh Darshan Society for Medical Sciences, is committed to imparting quality, ethical and professional education keeping this core principle in mind.",
          "Our aim is to equip the students with a positive attitude, professional skills and social responsibility so that they can not only build a successful career but also contribute to the development of the nation as a responsible citizen. Let us join together and take this sacred endeavor of education to new heights.",
        ],
      },
    ],
    contacts: [
      {
        name: "Dr. Pankaj Rathi",
        role: "Manager",
        phone: "+91-9636815142",
        email: "infopankajrathi@gmail.com",
      },
      {
        name: "Deepesh Parikh",
        role: "Secretary",
        phone: "+91-9829234138",
        email: "md@nathdwarainstitute.com",
      },
    ],
  },
  "ayurved-nursing": {
    tagline: "Nursing rooted in Ayurveda",
    heroImage: "/institutions/ayurved-nursing.jpg",
    welcome: [
      "Nathdwara College of B.Sc. Ayurveda Nursing (NCAN) trains compassionate nursing professionals who combine modern patient care with the Ayurvedic tradition.",
      "The college operates from the Nathdwara Group campus at Upali Oden. Contact the college to confirm current course availability, eligibility and admission requirements.",
    ],
    highlights: [
      "B.Sc. Ayurveda Nursing program",
      "Clinical skill labs and supervised patient-care practice",
      "Separate hostels with 24/7 security for women students",
      "Scholarships including the Beti Padhao girl-child incentive",
    ],
    courseMatch: ["Ayurveda Nursing", "NCAN"],
  },
};

/** Old WordPress-style paths that should land on the same institution site */
export const INSTITUTION_SLUG_ALIASES: Record<string, string> = {
  vdsms1: "vdsms",
  ncan: "ayurved-nursing",
};

export function getInstitutionCourses(institutionId: string): Course[] {
  const site = INSTITUTION_SITES[institutionId];
  if (!site) return [];
  return FEATURED_COURSES.filter((course) =>
    site.courseMatch.some((keyword) =>
      course.institution.toLowerCase().includes(keyword.toLowerCase()),
    ),
  );
}

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
