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
    affiliation: "Affiliated to Rajasthan Paramedical Council & Govt Schemes",
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
    affiliation: "Affiliated to DSRRAU Jodhpur & Govt of Rajasthan",
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
    featuredCourses: ["BCA (Computer Apps)", "B.Sc.-B.Ed. / BA-B.Ed. (ITEP)", "B.Sc. (PCM / CBZ)", "M.Sc. (Math/Phy/Chem/Zoo)"],
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
    affiliation: "Approved by NCVT / DGT, Govt of India",
    description:
      "Hands-on vocational training institute delivering certified NCVT trades in Electrician and Fitter with high placement in Railways, DISCOMs, and manufacturing.",
    featuredCourses: ["ITI Electrician (2 Yrs)", "ITI Fitter (2 Yrs)", "Polytechnic Lateral Entry"],
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
    affiliation: "Approved by Bar Council of India (BCI) & MLSU Udaipur",
    description:
      "Leading law college in Mewar providing LL.B. (3 Years) and B.A. LL.B. (5 Years) with active Moot Court, legal aid clinics, and judiciary coaching.",
    featuredCourses: ["LL.B. (3 Years)", "B.A. LL.B. Integrated (5 Years)", "Moot Court & RJS Prep"],
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
      "Leading engineering college featuring B.Tech in CSE, Civil, Mechanical & Electrical Engineering and Polytechnic Diploma with 120+ corporate recruiters.",
    featuredCourses: ["B.Tech Computer Science", "B.Tech Civil Engineering", "Polytechnic Diploma"],
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
      "Nathdwara Institute of Engineering and Technology (NIET) is the premier engineering wing of the Nathdwara Group of Institutions, situated on the scenic Aravali campus at Upali Oden, Nathdwara near Udaipur. Approved by AICTE, New Delhi and affiliated with Rajasthan Technical University (RTU), Kota, NIET delivers industry-aligned engineering and polytechnic education.",
      "With high-end computer clusters, mechanical workshops, robotics setups, surveying and civil testing labs, and an active Training & Placement cell with 120+ corporate recruiters, NIET equips aspiring engineers with technical rigor and practical mastery.",
    ],
    highlights: [
      "B.Tech in Computer Science, Civil, Mechanical & Electrical",
      "Polytechnic 3-year diploma & lateral entry options",
      "Advanced machine shop, fluid mechanics, CAD/CAM and IoT labs",
      "Training & Placement cell with 120+ recruiting partners",
      "Active NPTEL Local Chapter and technical clubs",
      "Dedicated transport fleet connecting Udaipur, Rajsamand and Mavli",
    ],
    courseMatch: ["NIET", "Engineering"],
    phone: "+91 95713 45444",
    vision:
      "To be recognized as a leading technical institute in Rajasthan fostering technological innovation, ethical engineering practice, and entrepreneurship.",
    mission: [
      {
        title: "Hands-on Technical Mastery",
        description:
          "Provide intensive laboratory, workshop and project-based training aligned with contemporary engineering demands.",
      },
      {
        title: "Industry Collaboration",
        description:
          "Build strong corporate alliances for internships, live projects, industrial visits and campus placements.",
      },
      {
        title: "Ethical Engineering",
        description:
          "Cultivate problem solvers dedicated to sustainable technological solutions for society and regional infrastructure.",
      },
    ],
    messages: [
      {
        name: "Director Academics",
        role: "Head of Engineering",
        quote: "True engineering transforms challenges into community solutions.",
        text: [
          "At NIET, our focus extends beyond textbooks into practical application. Through our extensive labs and industry interactions, we ensure our students graduate with the technical confidence to thrive in multinational tech companies and core infrastructure firms.",
          "We welcome ambitious students to join a campus where innovation, discipline, and career readiness go hand in hand.",
        ],
      },
    ],
    contacts: [
      {
        name: "Admission Coordinator (NIET)",
        role: "Engineering Admissions",
        phone: "+91 95713 45444",
        email: "admissions.niet@ngi.edu.in",
      },
      {
        name: "Training & Placement Officer",
        role: "T&P Cell",
        phone: "+91 98292 34138",
        email: "placements@ngi.edu.in",
      },
    ],
  },
  nibm: {
    tagline: "Affiliated to MLSU Udaipur | Approved by NCTE & Govt. of Rajasthan",
    heroImage: "/institutions/nibm.jpg",
    welcome: [
      "Nathdwara Institute of Biotechnology and Management (NIBM) is committed to providing quality lifelong learning opportunities today that prepare individuals and communities for tomorrow. Our supportive faculty and staff continue to build a reputation for providing a variety of services that create flexible, affordable, and accessible academic programs.",
      "NIBM offers a broad scope of professional and personal educational programming using current technologies. The college also develops customized training programs to meet specific needs of business and industry. Ongoing education and practical training is the foundation to a prosperous future. The staff at NIBM look forward to developing this foundation with you.",
      "The campus is equipped with 11+ specialized laboratories—including Computer Labs, Chemistry, Botany, Zoology, Physics, Mathematics, Psychology, Geography, Music, Art & Craft, and Activity Resource Labs—along with an NDLI Club recognized central library, separate boys' & girls' hostels, cafeteria, sports facilities, and dedicated transport fleet.",
    ],
    highlights: [
      "Affiliated to Mohanlal Sukhadia University (MLSU), Udaipur",
      "Approved by NCTE (National Council for Teacher Education) & Govt. of Rajasthan",
      "ITEP (Integrated Teacher Education Program) 4-Year B.Sc.-B.Ed. & BA-B.Ed.",
      "11+ specialized labs: Computer, Physics, Chemistry, Botany, Zoology, Math, Psychology & Geography",
      "Central Library with National Digital Library of India (NDLI) Club membership",
      "Active committees: Anti-Ragging, ICC, SC/ST, Grievance Redressal, OBC & Women Development Cell",
      "Social Entrepreneurship, Swachhta & Rural Engagement Cell (SES-REC)",
      "Daily bus fleet connecting Udaipur, Nathdwara, Rajsamand, Kankroli, Mavli & Fatehnagar",
    ],
    courseMatch: ["NIBM", "Biotechnology", "Computer Applications", "ITEP", "Teacher Education"],
    phone: "+91 98292 34138",
    vision:
      "To provide value education leading to all-round development of the students through need-based career-oriented education with an emphasis on personality & social concerns.",
    mission: [
      {
        title: "M1. Professional & Life Skills",
        description:
          "To facilitate students to develop professional and life skills to enhance their employability in IT, sciences, and education.",
      },
      {
        title: "M2. Advanced Technology in Teaching",
        description:
          "To promote the use of advanced technology for teaching as well as a learning process and serve society.",
      },
      {
        title: "M3. Liberal & Progressive Education",
        description:
          "To promote education that would be liberal and progressive which contributes to the new dimensions of education.",
      },
      {
        title: "M4. Continual Quality Improvement",
        description:
          "To provide comprehensive, cost-effective training and strive for continual improvement in performance for student satisfaction.",
      },
    ],
    messages: [
      {
        name: "Chairman",
        role: "Chairman's Message",
        quote: "Education goes beyond textbooks and examinations. It is a powerful tool for personal growth, social transformation, and global citizenship.",
        text: [
          "It is with great pride and immense pleasure that I welcome you to Nathdwara Institute of Biotechnology & Management—a center of excellence where knowledge meets purpose and education becomes a transformative journey. As chairman, I consider it a privilege to lead an institution that is committed to academic rigor and deeply dedicated to the holistic development of each student.",
          "At NIBM, our philosophy is rooted in the belief that education goes beyond textbooks and examinations. It is a powerful tool for personal growth, social transformation, and global citizenship. We aspire to nurture not only well-informed minds but also compassionate hearts and courageous spirits. We aim to produce individuals who are capable of making a meaningful impact in their chosen fields and in society at large.",
          "Our curriculum is carefully designed to blend academic knowledge with practical application. We offer programs guided by experienced educators, interdisciplinary projects, and real-world exposure through fieldwork and community engagement.",
        ],
      },
      {
        name: "Mr. Deepesh Parikh",
        role: "Managing Director's Message",
        quote: "Our academic framework is designed to balance foundational knowledge with real-world application.",
        text: [
          "Welcome to Nathdwara Institute of Biotechnology & Management—a place where potential meets purpose, and education is designed to empower, inspire, and transform. As Managing Director, I take great pride in overseeing the dynamic day-to-day functioning of this institution.",
          "In today’s fast-paced world, higher education must go beyond traditional learning models. It must be agile, innovative, and relevant. That is why we continuously work on enhancing the quality of our academic programs, upgrading infrastructure, and embracing modern teaching methodologies that meet the demands of 21st-century learners.",
          "Whether through industry-linked projects, professional training, internships, or skill-development programs, we ensure that our students are not just knowledgeable, but also employable, adaptable, and entrepreneurial in spirit.",
        ],
      },
      {
        name: "Principal, NIBM",
        role: "Principal's Message",
        quote: "Our mission is simple yet profound: to nurture capable, compassionate, and confident individuals who can make meaningful contributions to society.",
        text: [
          "Dear Students, Parents, and Visitors, It is with great pride and heartfelt warmth that I welcome you to Nathdwara Institute of Biotechnology & Management—a place where education is not only a process of learning but a celebration of discovery, growth, and purpose.",
          "As Principal, I am honored to lead a college that has continually upheld the ideals of academic excellence, character building, and inclusive development. We are committed to delivering a well-rounded education that blends intellectual rigor with practical application, ensuring our students are well-prepared for both professional careers and life’s broader challenges.",
          "Our dedicated faculty members create an engaging and personalized learning experience, supported by modern laboratories, digital library resources, and active student clubs.",
        ],
      },
    ],
    contacts: [
      {
        name: "Dr. Pankaj Rathi",
        role: "Academic Head / Manager",
        phone: "+91 96368 15142",
        email: "infopankajrathi@gmail.com",
      },
      {
        name: "Mr. Deepesh Parikh",
        role: "Managing Director",
        phone: "+91 98292 34138",
        email: "md@nathdwarainstitute.com",
      },
      {
        name: "NIBM Admission & Enquiry Office",
        role: "Campus Helpdesk",
        phone: "+91 95713 45444",
        email: "info@ngi.edu.in",
      },
    ],
  },
  nlc: {
    tagline: "Step up towards justice and legal excellence",
    heroImage: "/institutions/nlc.jpg",
    welcome: [
      "Nathdwara Law College (NLC) is the legal education wing of the Nathdwara Group of Institutions, serving aspiring advocates, corporate legal advisors, and judicial service aspirants from the Mewar and Southern Rajasthan region.",
      "Approved by the Bar Council of India (BCI) and affiliated with Mohanlal Sukhadia University (MLSU), Udaipur, NLC blends comprehensive classroom teaching with moot courts, legal aid camps, and interaction with experienced legal luminaries.",
    ],
    highlights: [
      "Bar Council of India (BCI) approved LL.B. degree programs",
      "Dedicated Moot Court hall for mock trials and appellate advocacy",
      "Legal Aid Clinic providing real-world pro-bono community exposure",
      "Rich law library with Supreme Court cases, AIR journals & legal databases",
      "Regular court visits to District & Sessions Courts and High Court",
      "Preparation assistance for Rajasthan Judicial Services (RJS) & competitive exams",
    ],
    courseMatch: ["Law College", "NLC", "Law"],
    phone: "+91 70148 10591",
    vision:
      "To produce ethical, socially conscious, and competent legal professionals who uphold the Constitution, justice, and the rule of law.",
    mission: [
      {
        title: "Doctrinal & Practical Mastery",
        description:
          "Provide a rigorous grounding in civil, criminal, constitutional, and corporate laws supplemented with courtroom training.",
      },
      {
        title: "Social Justice Advocacy",
        description:
          "Engage students in legal aid awareness for rural and underprivileged communities across Rajsamand and Mewar.",
      },
      {
        title: "Judicial Career Readiness",
        description:
          "Guide students toward successful judicial service careers, civil services, and corporate legal counsel.",
      },
    ],
    messages: [
      {
        name: "Principal, Nathdwara Law College",
        role: "Principal's Desk",
        quote: "Law is the cornerstone of a just and progressive society.",
        text: [
          "At Nathdwara Law College, we do not merely teach statutes; we nurture analytical minds capable of advocating for justice, equity, and good governance.",
          "Our moot court simulations, guest lectures by senior advocates, and active legal aid clinic offer our law students real-world practical experience.",
        ],
      },
    ],
    contacts: [
      {
        name: "Law Admissions Cell",
        role: "Admissions Coordinator",
        phone: "+91 70148 10591",
        email: "law@ngi.edu.in",
      },
      {
        name: "Campus Office",
        role: "General Enquiries",
        phone: "+91 95713 45444",
        email: "info@ngi.edu.in",
      },
    ],
  },
  npiti: {
    tagline: "Skilled trades, certified hands, real careers",
    heroImage: "/institutions/npiti.jpg",
    welcome: [
      "Nathdwara Private Industrial Training Institute (NPITI) delivers hands-on vocational training that leads directly to employment in Indian Railways, state electricity boards (DISCOMs), cement plants, marble processing, and manufacturing industries across Rajasthan.",
      "Approved by NCVT / DGT (Government of India), NPITI follows a workshop-first approach: trainees spend over 70% of their curriculum on operational machinery, wiring boards, lathe machines, and diagnostic instruments under seasoned technical instructors.",
    ],
    highlights: [
      "NCVT / DGT approved trades: Electrician and Fitter",
      "Extensive workshops equipped with industry-grade machinery and test benches",
      "Direct pathway for ITI graduates to Polytechnic lateral entry (2nd year)",
      "Apprenticeship tie-ups with regional manufacturing & mining corporations",
      "Specialized training for Railway Assistant Loco Pilot & Technician tests",
      "Safe campus with hostel facilities, mess, and daily transport bus routes",
    ],
    courseMatch: ["Industrial Training", "ITI", "Trades"],
    phone: "+91 95713 45444",
    vision:
      "To empower the youth of Rajasthan with certified technical skills and vocational mastery that enable self-reliance and industrial employment.",
    mission: [
      {
        title: "Workshop-First Training",
        description:
          "Prioritize practical benchwork, machine operations, electrical wiring, and safety standards.",
      },
      {
        title: "Industrial Apprenticeship",
        description:
          "Connect trainees with public and private sector apprenticeship programs for immediate job placement.",
      },
      {
        title: "Career Progression",
        description:
          "Facilitate seamless lateral entry into engineering diploma courses within the NGI network.",
      },
    ],
    messages: [
      {
        name: "Superintendent, NPITI",
        role: "Technical Head",
        quote: "Skill in the hands builds the backbone of modern industry.",
        text: [
          "Skilled technicians are in high demand across Indian manufacturing, power infrastructure, and railway departments. At NPITI, we ensure every trainee masters both safety and craftsmanship.",
          "Our graduates consistently secure government apprenticeships and private industrial employment across Rajasthan and Gujarat.",
        ],
      },
    ],
    contacts: [
      {
        name: "ITI Office & Admissions",
        role: "Trade Enquiries",
        phone: "+91 95713 45444",
        email: "iti@ngi.edu.in",
      },
    ],
  },
  vdsms: {
    tagline: "Compassionate care, scientific excellence",
    heroImage: "/institutions/vdsms.jpg",
    welcome: [
      "Vallabh Darshan Society for Medical Science (VDSMS) is the dedicated medical and allied health sciences wing of the Nathdwara Group of Institutions at Upali Oden, Nathdwara. The institution is committed to imparting quality, ethical, and professional education that gives direction, purpose, and values to life.",
      "VDSMS aims to equip students with a positive attitude, professional diagnostic skills, and social responsibility so they can build successful healthcare careers and contribute to national wellness. The institute also runs government-recognized skill development programs under the PMKVY and RSLDC schemes.",
    ],
    highlights: [
      "Medical sciences and diagnostic laboratory programs",
      "Skill-development programs under PMKVY & RSLDC healthcare schemes",
      "Fully functional pathology, hematology and biochemistry student labs",
      "Access to shared NGI 30-acre campus, central library and hostel amenities",
      "State government scholarship and fee concession support for eligible students",
      "Hospital training partnerships with regional medical centers",
    ],
    courseMatch: ["VDSMS", "Medical Science", "Health", "DMLT"],
    phone: "+91 96368 15142",
    vision:
      "We offer our students numerous curricular and co-curricular opportunities that empower them to become conscientious, competent, and responsible healthcare leaders of the community.",
    mission: [
      {
        title: "Academic & Clinical Excellence",
        description:
          "To impart quality, affordable education in medical and allied health fields with a focus on precision, hygiene, and ethical practice.",
      },
      {
        title: "Healthcare Training",
        description:
          "To promote practical laboratory training that responds to regional and rural healthcare diagnostic challenges.",
      },
      {
        title: "Skill Development",
        description:
          "To equip healthcare trainees with compassionate patient care, diagnostic leadership, and community service values.",
      },
    ],
    messages: [
      {
        name: "Chairman",
        role: "Chairman's Message",
        quote: "The power of the future is the power of the mind and compassionate service.",
        text: [
          "If mass production characterized the industrial revolution, individual creativity and brilliance marks the youth's revolution of this century. Development is no longer symbolized by imposing plants and machinery; instead knowledge and compassionate service are now recognized as the true strength of a nation.",
          "It is important to be led by a set of agreed shared beliefs. At VDSMS, we prepare healthcare professionals whose technical skill is matched by their commitment to healing.",
        ],
      },
      {
        name: "Mr. Deepesh Parikh",
        role: "Managing Director",
        text: [
          "Education is not limited to bookish knowledge but it is a tool that gives direction, purpose and values to life. Our institution, Vallabh Darshan Society for Medical Sciences, is committed to imparting quality, ethical and professional education keeping this core principle in mind.",
          "Our aim is to equip the students with a positive attitude, professional skills and social responsibility so that they can not only build a successful career but also contribute to the development of the nation as a responsible citizen.",
        ],
      },
    ],
    contacts: [
      {
        name: "Dr. Pankaj Rathi",
        role: "Manager",
        phone: "+91 96368 15142",
        email: "infopankajrathi@gmail.com",
      },
      {
        name: "Deepesh Parikh",
        role: "Secretary",
        phone: "+91 98292 34138",
        email: "md@nathdwarainstitute.com",
      },
    ],
  },
  "ayurved-nursing": {
    tagline: "Holistic healing, modern nursing care",
    heroImage: "/institutions/ayurved-nursing.jpg",
    welcome: [
      "Nathdwara College of B.Sc. Ayurveda Nursing (NCAN) trains dedicated nursing professionals who combine modern patient care fundamentals with centuries-old Ayurvedic holistic healing traditions.",
      "Operating from the serene Nathdwara Group campus at Upali Oden, the college features clinical simulation laboratories, herbal pharmacology displays, anatomy models, and practical clinical rotations at affiliated hospitals.",
    ],
    highlights: [
      "B.Sc. Ayurveda Nursing 4-year degree program",
      "Diploma in Ayush Nursing & Pharmacy (DAN&P) courses",
      "Hands-on clinical skill labs, Panchakarma therapy demonstrations and patient care practice",
      "Safe, well-maintained on-campus girls' and boys' hostels with 24/7 security",
      "Scholarship incentives including Beti Padhao girl-child financial aid",
      "Placement pathways in Ayurvedic hospitals, wellness retreats, and public health centers",
    ],
    courseMatch: ["Ayurveda Nursing", "NCAN", "Nursing"],
    phone: "+91 95713 45444",
    vision:
      "To be a distinguished center of Ayurvedic nursing education that promotes holistic well-being, integrative healthcare, and compassionate patient service.",
    mission: [
      {
        title: "Integrative Nursing Skills",
        description:
          "Harmonize conventional clinical nursing practices with Ayurvedic therapeutics, Panchakarma care, and herbal medicine.",
      },
      {
        title: "Clinical Exposure",
        description:
          "Provide clinical rotations in multispecialty and Ayurvedic hospitals to instill confidence in patient management.",
      },
      {
        title: "Humanitarian Care",
        description:
          "Nurture empathy, dedication, and patient-first ethics in every aspiring nurse.",
      },
    ],
    messages: [
      {
        name: "Principal, NCAN",
        role: "Principal's Desk",
        quote: "Nursing is the noble bridge between ancient wisdom and compassionate care.",
        text: [
          "Ayurvedic nursing provides a unique career combining time-tested holistic health sciences with modern nursing protocols. Our students are trained to serve with skill, warmth, and dedication.",
          "We offer modern clinical labs, seasoned nursing mentors, and hospital training tie-ups that make our students highly sought after.",
        ],
      },
    ],
    contacts: [
      {
        name: "Ayurveda Nursing Admissions",
        role: "Admissions Desk",
        phone: "+91 95713 45444",
        email: "nursing@ngi.edu.in",
      },
    ],
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
    eligibility: "10+2 in any stream with minimum 48% marks (MLSU Udaipur affiliated)",
    careerProspects: "Full-Stack Developer, Software Engineer, App Developer, Database Administrator, MCA pathways",
    badge: "High Demand",
  },
  {
    id: "c-bsc-pcm",
    name: "B.Sc. (Physics, Chemistry, Mathematics - PCM)",
    level: "UG",
    stream: "Basic Sciences",
    duration: "3 Years",
    institution: "Nathdwara Institute of Biotechnology & Management (NIBM)",
    eligibility: "10+2 with Science (PCM) from recognized board (MLSU Udaipur affiliated)",
    careerProspects: "Scientific Officer, Civil Services, School Lecturer, M.Sc. & Higher Research Pathways",
  },
  {
    id: "c-bsc-cbz",
    name: "B.Sc. (Chemistry, Botany, Zoology - CBZ)",
    level: "UG",
    stream: "Life Sciences",
    duration: "3 Years",
    institution: "Nathdwara Institute of Biotechnology & Management (NIBM)",
    eligibility: "10+2 with Science (PCB) from recognized board (MLSU Udaipur affiliated)",
    careerProspects: "Botanist, Zoologist, Environmental Analyst, Clinical Lab Specialist, Pharma R&D",
  },
  {
    id: "c-msc-chem",
    name: "M.Sc. Chemistry (CBCS)",
    level: "PG",
    stream: "Basic Sciences",
    duration: "2 Years",
    institution: "Nathdwara Institute of Biotechnology & Management (NIBM)",
    eligibility: "B.Sc. with Chemistry with min 50% marks (MLSU Udaipur affiliated)",
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
    eligibility: "B.Sc. with Physics and Mathematics with min 50% marks (MLSU affiliated)",
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
    eligibility: "B.Sc. with Mathematics with min 50% marks (MLSU affiliated)",
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
    eligibility: "B.Sc. with Zoology / Bioscience with min 50% marks (MLSU affiliated)",
    careerProspects: "Wildlife Biologist, Ecologist, Fisheries Officer, Research Associate, Academic Lecturer",
    badge: "CBCS Pattern",
  },
  {
    id: "c-llb",
    name: "LL.B. (Bachelor of Laws)",
    level: "UG",
    stream: "Law",
    duration: "3 Years",
    institution: "Nathdwara Law College (NLC)",
    eligibility: "Graduation in any discipline with min 45% (40% for SC/ST)",
    careerProspects: "Advocate in High Court & District Courts, Judicial Magistrate (RJS), Corporate Legal Advisor, Public Prosecutor",
    badge: "BCI Approved",
  },
  {
    id: "c-ba-llb",
    name: "B.A. LL.B. (5-Year Integrated Law Course)",
    level: "Integrated",
    stream: "Law",
    duration: "5 Years",
    institution: "Nathdwara Law College (NLC)",
    eligibility: "10+2 in any stream with minimum 45% marks",
    careerProspects: "Corporate Law Firms, Civil Litigation, Legal Officer in PSUs, Human Rights Counsel",
    badge: "Dual Degree",
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
    name: "B.Sc.-B.Ed. (4-Year Integrated ITEP)",
    level: "Integrated",
    stream: "Teacher Education",
    duration: "4 Years",
    institution: "Nathdwara Institute of Biotechnology & Management (NIBM)",
    eligibility: "10+2 with Science stream (PCM / PCB) through PTET / Direct Merit (NCTE & MLSU approved)",
    careerProspects: "Govt. & Private School Senior Science Teacher, Educational Consultant, Academics",
    badge: "ITEP / NCTE Approved",
  },
  {
    id: "c-ba-bed",
    name: "BA-B.Ed. (4-Year Integrated Teacher Education)",
    level: "Integrated",
    stream: "Teacher Education",
    duration: "4 Years",
    institution: "Nathdwara Institute of Biotechnology & Management (NIBM)",
    eligibility: "10+2 in Arts / Commerce / Science through PTET / Direct Merit (NCTE & MLSU approved)",
    careerProspects: "Senior Secondary School Teacher, Civil Services Aspirant, Academic Instructor",
    badge: "Integrated Program",
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
    id: "c-mba",
    name: "MBA (Master of Business Administration)",
    level: "PG",
    stream: "Management",
    duration: "2 Years",
    institution: "Shrinathji Institute of Management Studies",
    eligibility: "Graduation in any discipline with min 50% (RMAC / CMAT / Direct)",
    careerProspects: "Marketing Manager, Financial Analyst, HR Executive, Operations Manager, Business Banker",
    badge: "Dual Specialization",
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
