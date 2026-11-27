import { FEATURED_COURSES, type Course } from "@/data/ngiData";

/**
 * Per-institution website content. Everything here is taken from the official
 * sites (nibmedu.com and ngi.edu.in/<college>); `sourceUrl` records where.
 * Where an official site publishes nothing (NIET, Ayurveda Nursing), keep the
 * copy general and avoid specific claims.
 */

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

export interface ProgrammeDetail {
  name: string;
  duration: string;
  seats: string;
  fee: string;
  eligibility: string;
  admission?: string;
  subjects?: string[];
  careers?: string[];
}

export interface InstitutionDocument {
  label: string;
  href: string;
  note?: string;
}

export interface LabInfo {
  name: string;
  summary: string;
}

export interface InstitutionSiteContent {
  tagline: string;
  heroImage: string;
  welcome: string[];
  highlights: string[];
  /** Keywords matched against Course.institution to list this institution's courses */
  courseMatch: string[];
  phone?: string;
  sourceUrl?: string;
  vision?: string;
  mission?: { title: string; description: string }[];
  messages?: InstitutionLeaderMessage[];
  programmes?: ProgrammeDetail[];
  feeNote?: string;
  admissionNotes?: string[];
  labs?: LabInfo[];
  library?: { value: string; label: string }[];
  libraryNotes?: string[];
  placementNotes?: string[];
  documents?: InstitutionDocument[];
  contacts?: InstitutionContactPerson[];
}

const CHAIRMAN_MESSAGE: InstitutionLeaderMessage = {
  name: "Mr. Ashok Parikh",
  role: "Chairman",
  quote: "The power of the future is the power of the mind.",
  text: [
    "If mass production characterized the industrial revolution, individual creativity and brilliance marks the youth's revolution of this century. Development is no longer symbolized by imposing plants and machinery; instead knowledge is now universally recognized as the true strength of a nation.",
    "It is important to be led by a set of agreed shared beliefs. To achieve this we need to enter into learning conversations to define and articulate such a philosophy. As it is said: \"If you stand for nothing you will fall for anything\" — or \"Control your own destiny or someone else will.\"",
  ],
};

const DIRECTOR_MESSAGE = (college: string): InstitutionLeaderMessage => ({
  name: "Mr. Deepesh Parikh",
  role: "Managing Director",
  text: [
    `${college} is committed to providing quality lifelong learning opportunities today that prepare individuals and communities for tomorrow. Our supportive staff continues to build a reputation for providing a variety of services that create flexible, affordable and accessible programs.`,
    `We offer a broad scope of professional and personal educational programming using current technologies, and develop customized training programs to meet specific needs of business and industry. Ongoing education and training is the foundation to a prosperous future — the staff at ${college} look forward to developing this foundation with you.`,
  ],
});

const GROUP_VISION =
  "We offer our students numerous curricular and co-curricular opportunities that empower them to become conscientious and responsible citizens of the community.";

const GROUP_MISSION = [
  {
    title: "Academic Excellence",
    description:
      "To impart quality, affordable education in medical, engineering and academic fields with a focus on innovation and ethical practice.",
  },
  {
    title: "Research & Innovation",
    description: "To promote research that responds to regional and global healthcare challenges.",
  },
  {
    title: "Skill Development",
    description: "To equip students with practical skills, leadership qualities, and a human-centric approach.",
  },
];

const OFFICE_CONTACTS: InstitutionContactPerson[] = [
  { name: "Admission Helpline", role: "All NGI colleges", phone: "+91 95713 45444" },
  { name: "Mr. Deepesh Parikh", role: "Managing Director", phone: "+91 98292 34138", email: "md@nathdwarainstitute.com" },
];

const NGI = "https://ngi.edu.in";
const NIBM = "https://www.nibmedu.com";

export const INSTITUTION_SITES: Record<string, InstitutionSiteContent> = {
  niet: {
    tagline: "Engineering & technology education on the NGI campus",
    heroImage: "/institutions/niet.jpg",
    sourceUrl: `${NGI}/niet/`,
    welcome: [
      "Nathdwara Institute of Engineering and Technology (NIET) is the engineering and technology wing of the Nathdwara Group of Institutions, located on the group campus at Upali Odan, Nathdwara in Rajsamand district.",
      "NIET shares the group's campus facilities — central library, laboratories, separate boys' and girls' hostels, canteen and a fleet of college buses covering towns within 50 km. Contact the admission desk for the current programmes, eligibility and session dates.",
    ],
    highlights: [
      "Part of the six-college NGI campus at Upali Odan, Nathdwara",
      "Shared library, laboratories and computer facilities",
      "Separate boys' and girls' hostels with mess",
      "College buses from Udaipur, Nathdwara, Kankroli, Mavli and more",
    ],
    courseMatch: ["NIET"],
    phone: "+91 95713 45444",
    vision: GROUP_VISION,
    mission: GROUP_MISSION,
    messages: [CHAIRMAN_MESSAGE],
    documents: [
      { label: "Management Committee", href: `${NGI}/niet/wp-content/uploads/2022/05/Management-Commitee.jpg` },
    ],
    contacts: OFFICE_CONTACTS,
  },

  nibm: {
    tagline: "Affiliated to MLSU Udaipur · Recognised by NCTE",
    heroImage: "/institutions/nibm.jpg",
    sourceUrl: `${NIBM}/`,
    welcome: [
      "Nathdwara Institute of Biotechnology and Management (NIBM) is committed to providing quality lifelong learning opportunities today that prepare individuals and communities for tomorrow. Our supportive staff continues to build a reputation for providing a variety of services that create flexible, affordable and accessible programs.",
      "NIBM offers a broad scope of professional and personal educational programming using current technologies, and develops customized training programs to meet specific needs of business and industry. The college is affiliated to Mohanlal Sukhadia University (MLSU), Udaipur, and its teacher-education programmes are recognised by the National Council for Teacher Education (NCTE).",
      "The institute aims to become a world-class professional education provider and a valuable resource for industry and society — imparting quality education, improving the employability of its students and supporting them with campus placement activities.",
    ],
    highlights: [
      "BCA, B.Sc., four M.Sc. programmes and integrated B.Ed. courses",
      "New NCTE-recognised ITEP B.Sc. B.Ed. — 100 seats from 2026-27",
      "11 laboratories: science, computer, psychology, music, art & more",
      "Library of 14,456 books with DELNET and NDLI access",
      "Hostels for about 1,000 students; canteen seating 1,000",
      "16 college buses carrying 700+ students daily within 50 km",
    ],
    courseMatch: ["NIBM"],
    phone: "+91 98292 34138",
    vision:
      "To provide value education leading to all-round development of the students through need-based career-oriented education with an emphasis on personality and social concerns.",
    mission: [
      {
        title: "Professional & Life Skills",
        description: "To facilitate students to develop professional and life skills to enhance employability.",
      },
      {
        title: "Technology in Teaching",
        description:
          "To promote the use of advanced technology for teaching as well as the learning process, and to serve society.",
      },
      {
        title: "Liberal & Progressive Education",
        description:
          "To promote education that is liberal and progressive and contributes new dimensions to education.",
      },
      {
        title: "Continual Improvement",
        description:
          "To provide comprehensive, cost-effective training and strive for continual improvement in performance for students' satisfaction.",
      },
    ],
    messages: [
      {
        name: "Mr. Ashok Parikh",
        role: "Chairman",
        quote:
          "Education goes beyond textbooks and examinations. It is a powerful tool for personal growth, social transformation, and global citizenship.",
        text: [
          "It is with great pride and immense pleasure that I welcome you to Nathdwara Institute of Biotechnology & Management — a center of excellence where knowledge meets purpose and education becomes a transformative journey. As chairman, I consider it a privilege to lead an institution that is committed to academic rigor and deeply dedicated to the holistic development of each student.",
          "Our curriculum is carefully designed to blend academic knowledge with practical application. We encourage interdisciplinary learning, collaborative projects, and real-world exposure through internships, fieldwork, and community engagement. One of our core strengths is our emphasis on character building and ethical responsibility — integrity, empathy, and resilience are as important as intelligence and technical skills.",
          "To all prospective students and parents, I extend a warm invitation to join our academic family. Let us move forward together, with knowledge as our foundation, values as our guide, and a shared commitment to creating a brighter tomorrow.",
        ],
      },
      {
        name: "Mr. Deepesh Parikh",
        role: "Managing Director",
        quote: "Join us and become part of a college that not only equips you with degrees but empowers you with direction.",
        text: [
          "Welcome to Nathdwara Institute of Biotechnology & Management — a place where potential meets purpose, and education is designed to empower, inspire, and transform. My role extends beyond administration; it is about ensuring that every student who walks through our doors receives an enriching, holistic, and future-oriented educational experience.",
          "Our academic framework is designed to balance foundational knowledge with real-world application. Whether it's through industry-linked projects, professional training, internships, or skill-development programs, we ensure that our students are not just knowledgeable — but also employable, adaptable, and entrepreneurial in spirit.",
          "One of the key priorities under my leadership is to foster a student-centric environment — one where every individual is seen, heard, and supported, from personalized academic support to career counselling.",
        ],
      },
      {
        name: "Dr. Ranjana Sharma",
        role: "Principal",
        quote:
          "Our mission is simple yet profound: to nurture capable, compassionate, and confident individuals who can make meaningful contributions to society.",
        text: [
          "It is with great pride and heartfelt warmth that I welcome you to Nathdwara Institute of Biotechnology & Management — a place where education is not only a process of learning but a celebration of discovery, growth, and purpose.",
          "Our dedicated faculty members are the backbone of our institution. Through innovative pedagogy, mentorship, and continuous support, they create a learning experience that is engaging, personalized, and impactful. We also emphasize the importance of values — honesty, responsibility, respect, and empathy.",
          "To all prospective students and their families, I invite you to become a part of the NIBM family — a community that believes in the power of education to uplift, inspire, and transform.",
        ],
      },
    ],
    feeNote: "Fee and seat intake as published by NIBM. University and state-government norms apply.",
    programmes: [
      {
        name: "BCA (Bachelor of Computer Applications)",
        duration: "3 years · 6 semesters",
        seats: "60",
        fee: "₹11,500 per semester",
        eligibility: "10+2 in Arts, Commerce or Science",
        admission: "Through the common entrance examination conducted by MLSU Udaipur, followed by personal interview",
        careers: [
          "MCA, MBA, M.Sc. (CS/IT)",
          "Software engineer or consultant",
          "Network engineer, database administrator",
          "Test engineer, system analyst, programmer",
          "Banking and civil services exams",
        ],
      },
      {
        name: "B.Sc. (PCM / BZC)",
        duration: "3 years · 6 semesters",
        seats: "70",
        fee: "₹11,000 per semester",
        eligibility: "10+2 with Science stream",
        subjects: ["Physics, Chemistry, Mathematics", "Botany, Zoology, Chemistry"],
      },
      {
        name: "ITEP B.Sc. B.Ed. (Secondary)",
        duration: "4 years · integrated",
        seats: "100 (2 units)",
        fee: "On enquiry",
        eligibility: "10+2 with Science from a recognised board, and qualify NCET conducted by NTA",
        admission: "Through the National Common Entrance Test (NCET); NCTE-recognised from session 2026-27",
        subjects: [
          "Group A: Physics, Chemistry, Mathematics",
          "Group B: Botany, Zoology, Chemistry",
          "Group C: Physics, Chemistry, Computer Science",
          "Group D: Physics, Mathematics, Computer Science",
        ],
      },
      {
        name: "B.Sc. B.Ed. (4-Year Integrated)",
        duration: "4 years",
        seats: "50",
        fee: "₹27,000 per year",
        eligibility: "10+2 with Science — 50% marks (45% for reserved categories)",
        admission: "Through PTET",
        subjects: ["Group A: Physics, Chemistry, Maths", "Group B: Botany, Zoology, Chemistry"],
      },
      {
        name: "B.A. B.Ed. (4-Year Integrated)",
        duration: "4 years",
        seats: "50",
        fee: "₹27,000 per year",
        eligibility: "10+2 — 50% marks (45% for reserved categories)",
        admission: "Through PTET",
        subjects: [
          "Choose three subjects, one per group:",
          "Economics or Sanskrit · Geography · Political Science",
          "History · Hindi Literature · English Literature",
        ],
      },
      {
        name: "M.Sc. Mathematics (CBCS)",
        duration: "2 years · 4 semesters",
        seats: "40",
        fee: "₹10,000 per semester",
        eligibility: "B.Sc.",
      },
      {
        name: "M.Sc. Physics (CBCS)",
        duration: "2 years · 4 semesters",
        seats: "40",
        fee: "₹12,000 per semester",
        eligibility: "B.Sc.",
      },
      {
        name: "M.Sc. Chemistry (CBCS)",
        duration: "2 years · 4 semesters",
        seats: "40",
        fee: "₹11,000 per semester",
        eligibility: "B.Sc.",
      },
      {
        name: "M.Sc. Zoology (CBCS)",
        duration: "2 years · 4 semesters",
        seats: "25",
        fee: "₹12,000 per year",
        eligibility: "B.Sc.",
      },
    ],
    admissionNotes: [
      "Free assistance with filling online forms, plus coaching and guidance for entrance examinations.",
      "Steps: application form → personal interview → final admission and registration.",
      "Five supernumerary seats in BCA and B.Sc. are available for foreign/NRI candidates, subject to university approval.",
    ],
    labs: [
      { name: "Computer Lab", summary: "Systems for BCA practicals and programming coursework." },
      { name: "Physics Lab", summary: "Experiments for B.Sc., M.Sc. and B.Sc. B.Ed. physics." },
      { name: "Chemistry Lab", summary: "Two dedicated chemistry laboratories (Lab I and Lab II)." },
      { name: "Botany Lab", summary: "Plant-science practicals for life-science students." },
      { name: "Zoology Lab", summary: "Specimens and equipment for zoology practicals." },
      { name: "Mathematics Lab", summary: "Geometry sets, geoboards, abacus, weights and measuring models." },
      { name: "Geography Lab", summary: "Barometer, hygrometer, rain gauge, cup anemometer and Rajasthan topo sheets." },
      { name: "Psychology Lab", summary: "Standardised tests — achievement motivation, emotional intelligence, creativity and more." },
      { name: "Art & Craft Lab", summary: "Materials for craft, fabric art and teaching-aid preparation." },
      { name: "Music Lab", summary: "Instruments and space for music in teacher education." },
      { name: "Activity & Resource Lab", summary: "Teaching resources for B.Ed. pedagogy and activities." },
    ],
    library: [
      { value: "14,456", label: "Total books" },
      { value: "12,751", label: "B.Ed. collection" },
      { value: "1,138", label: "Education titles" },
      { value: "5", label: "Journals subscribed" },
    ],
    libraryNotes: [
      "E-journals through DELNET, with remote login for networked library resources.",
      "Access to the National Digital Library of India (NDLI).",
      "Recent additions include encyclopedias of molecular biology, inorganic chemistry and teacher education.",
    ],
    documents: [
      { label: "MLSU Affiliation Order 2025-26", href: `${NIBM}/wp-content/uploads/2026/01/AFFILIATION-ORDER-2025-26_compressed.pdf` },
      { label: "NOC from State Government", href: `${NIBM}/wp-content/uploads/2026/01/NOC-FROM-STATE-GOVT..pdf` },
      { label: "NCTE Recognition — ITEP B.Sc. B.Ed. (from 2026-27)", href: `${NIBM}/wp-content/uploads/2026/07/NCTE-RECOGNITION-ORDER-FOR-ITEP-FROM-THE-SESSION-2026-2027.pdf` },
      { label: "NCTE Recognition — B.Sc. B.Ed. & B.A. B.Ed.", href: `${NIBM}/wp-content/uploads/2024/05/NCTE-Recognized-Letter-for-B.Sc_.-Bed.pdf` },
      { label: "NCTE Regulations 2014 — Clause 8(6)", href: `${NIBM}/wp-content/uploads/2026/01/86-4.pdf` },
      { label: "NCTE Regulations 2014 — Clause 8(14)", href: `${NIBM}/wp-content/uploads/2026/01/814_compressed.pdf` },
      { label: "NCTE Regulations 2014 — Clause 10(3): Audited Report FY 2024-25", href: `${NIBM}/wp-content/uploads/2026/01/Annual-Audited-Report-FY-2024-2025_compressed.pdf` },
      { label: "NCTE Regulations — Clause 7(14)(i)", href: `${NIBM}/?page_id=2892`, note: "Web page" },
      { label: "Non-Teaching Staff List", href: `${NIBM}/wp-content/uploads/2024/10/List-of-Non-Teaching-Staff.pdf` },
      { label: "Students Admitted 2025-26", href: `${NIBM}/wp-content/uploads/2026/04/Student-list-admitted-in-in-2025-26.pdf` },
      { label: "Building Completion Certificate", href: `${NGI}/nibm/wp-content/uploads/2024/08/NIBM-Building-Completion-Certificate-27-07-2022.pdf` },
      { label: "Academic Calendar 2026-27 (tentative)", href: `${NIBM}/wp-content/uploads/2026/08/Tentative-Calendar-of-session-2026-2027.pdf` },
      { label: "Application Form", href: `${NGI}/nibm/wp-content/uploads/2022/05/APPLICATION-FORM.pdf` },
    ],
    contacts: [
      { name: "NIBM Office", role: "Admissions & enquiries", phone: "+91 98292 34138" },
      { name: "Women Helpline", role: "Women Development Cell", phone: "+91 95713 45444" },
      { name: "Mr. S.D. Khan", role: "College transport & bus routes", phone: "+91 98280 89249" },
      { name: "Dr. Ranjana Sharma", role: "Principal" },
    ],
  },

  nlc: {
    tagline: "Step up towards justice",
    heroImage: "/institutions/nlc.jpg",
    sourceUrl: `${NGI}/nlc/`,
    welcome: [
      "Nathdwara Law College (NLC), affiliated to Dr. Bhimrao Ambedkar Law University, Jaipur, has been established with a commitment to bring legal education to the country and to provide object-oriented education, keeping in view the emerging industrial and business opportunities globally.",
      "The college seeks strategic alliances and academic collaboration with national and international law firms, providing further opportunities to acquire legal skills coupled with well-paid job offers. Special fee concessions and liberal scholarships are provided to meritorious and needy students without distinction of caste, creed or colour.",
    ],
    highlights: [
      "3-year LL.B. affiliated to Dr. Bhimrao Ambedkar Law University, Jaipur",
      "Bar Council of India approval and State Government NOC",
      "Library of about 10,000 books with DELNET and a book bank",
      "Anti-ragging, women-harassment grievance and student welfare committees",
      "Fee concessions and scholarships for meritorious and needy students",
      "Shared NGI hostels, canteen and college transport",
    ],
    courseMatch: ["NLC"],
    phone: "+91 95713 45444",
    vision:
      "Nathdwara Law College aims to develop dynamic legal professionals, capable of coping with emerging legal challenges in national and global contexts, with utmost importance to ethical values and an overriding emphasis on quality.",
    messages: [
      { ...CHAIRMAN_MESSAGE, role: "Chairman · Shrinathji Group of Institutions" },
      DIRECTOR_MESSAGE("NLC"),
    ],
    programmes: [
      {
        name: "LL.B. (Bachelor of Law)",
        duration: "3 years",
        seats: "On enquiry",
        fee: "On enquiry",
        eligibility:
          "Graduation in any discipline from a recognised university — 45% (General), 42% (OBC), 40% (SC/ST)",
        careers: ["Advocate", "Legal advisor", "Judicial services aspirant", "Corporate and government legal roles"],
      },
    ],
    library: [
      { value: "~10,000", label: "Books" },
      { value: "10 hrs", label: "Open daily" },
      { value: "24×7", label: "Internet workstation" },
    ],
    libraryNotes: [
      "Book bank: borrow the year's required books at the start of the session for a nominal charge.",
      "National and international journals, study and reference books, magazines and periodicals.",
      "Fully computerised with DELNET and ERP, bar-coded circulation and a digital library for e-journals.",
      "Separate reading halls for students and faculty; audio-visual and career-guidance sections.",
    ],
    documents: [
      { label: "BCI Approval Letter (Session 2023-24)", href: `${NGI}/nlc/wp-content/uploads/2024/09/BCI_Approval-Letter-for-the-Session-2023-2024.pdf` },
      { label: "Government NOC", href: `${NGI}/nlc/wp-content/uploads/2024/09/GOVT.-PNOC.pdf` },
      { label: "Affiliation Letter (29.12.2023)", href: `${NGI}/nlc/wp-content/uploads/2024/09/Nathdwara-Law-Clg.-Rajsamand-Affiliation-29.12.2023.pdf` },
      { label: "Building Map", href: `${NGI}/nlc/wp-content/uploads/2024/09/Building_MAP.pdf` },
      { label: "Teaching Staff", href: `${NGI}/nlc/wp-content/uploads/2024/09/Teaching-Staff.pdf` },
      { label: "Non-Teaching Staff", href: `${NGI}/nlc/wp-content/uploads/2024/09/Non-Teaching-Staff.pdf` },
      { label: "LL.B. Syllabus 2024-25 (Semester I)", href: `${NGI}/nlc/wp-content/uploads/2024/09/ALU_LLB_2024-25_Syllabus_29082024_FirstSem.pdf` },
      { label: "Time Table", href: `${NGI}/nlc/wp-content/uploads/2024/09/Time-table.pdf` },
      { label: "Women Harassment Grievance Committee", href: `${NGI}/nlc/wp-content/uploads/2024/09/Women-Harassment-Grievance-Committee.jpg` },
      { label: "Anti-Ragging Committee", href: `${NGI}/nlc/wp-content/uploads/2024/09/ANTI-%E2%80%93-RAGGING-COMMITTEE.jpg` },
      { label: "Student Welfare Council", href: `${NGI}/nlc/wp-content/uploads/2024/09/STUDENT-WELFARE-COUNCIL.jpg` },
    ],
    contacts: [
      { name: "Nathdwara Law College", role: "Office", phone: "+91 95713 45444" },
      { name: "Admissions & enquiries", role: "NGI office", phone: "+91 98292 34138" },
    ],
  },

  npiti: {
    tagline: "Skilled technicians for industry",
    heroImage: "/institutions/npiti.jpg",
    sourceUrl: `${NGI}/npiti/`,
    welcome: [
      "Nathdwara Pvt. ITI, Rajsamand has been set up with the sole objective of imparting vocational training to aspiring technicians — offering an environment where young minds can grow to their full potential and become disciplined and skilled technicians.",
      "The institute also strives to reduce unemployment among educated youth by equipping them with skills suited to the manufacturing and service sectors. Quality training and placement support are the key factors behind Nathdwara ITI's standing in Rajsamand.",
    ],
    highlights: [
      "NCVT-affiliated Electrician and Fitter trades — 2 years each",
      "Administered by the Directorate of Technical Education, Rajasthan",
      "Eligibility: Class 10 pass; age 14 to 40 years at admission",
      "Placement cell with campus interviews and industry linkage",
      "Industrial visits and expert lectures for every trade",
      "Reasoning, G.K. and spoken English as co-curricular subjects",
      "Grading certificate and NCVT affiliation on record",
    ],
    courseMatch: ["NPITI"],
    phone: "+91 95713 45444",
    vision:
      "To develop Nathdwara Pvt. ITI as a world-class vocational training institute and to serve as a valuable resource for industry and society.",
    mission: [
      {
        title: "Quality Vocational Training",
        description:
          "Imparting quality vocational training, equipping trainees with the knowledge and skill set suited to the manufacturing and service sectors in today's global industrial environment.",
      },
      {
        title: "Employability & Placement",
        description:
          "Executing programmes that improve the employability of trainees and supporting them with campus placement — contributing to the nation's goal of reducing unemployment among educated youth.",
      },
      {
        title: "Quality Policy",
        description:
          "The most important asset of our institute is our trainees. We are committed to quality vocational training through continual improvement of training procedures.",
      },
    ],
    messages: [{ ...DIRECTOR_MESSAGE("NPITI"), role: "Director, NPITI" }],
    programmes: [
      {
        name: "Electrician (NCVT)",
        duration: "2 years",
        seats: "On enquiry",
        fee: "On enquiry",
        eligibility: "Class 10 pass with Mathematics and Science from a recognised board",
      },
      {
        name: "Fitter (NCVT)",
        duration: "2 years",
        seats: "On enquiry",
        fee: "On enquiry",
        eligibility: "Class 10 pass (10+2 system) or equivalent",
      },
    ],
    admissionNotes: [
      "Age limit is generally 14 to 40 years at the time of admission.",
      "Documents: Class 10 mark sheet and certificate, proof of age, identity proof (Aadhaar, voter ID), passport photographs, and caste and domicile certificates if applicable.",
      "All trainees must register on the PMIS portal.",
    ],
    placementNotes: [
      "Personality development and employability skills",
      "Career counselling, mock interviews and career planning",
      "Industrial visits, educational tours and industry contacts",
      "Campus interviews with pre-placement talks, a 100-seat hall and interview rooms",
      "Alumni association activities and help with jobs and higher studies",
    ],
    documents: [
      { label: "Affiliation / Approval Letter", href: `${NGI}/npiti/wp-content/uploads/2025/02/Approval.pdf` },
      { label: "Grading Certificate", href: `${NGI}/npiti/wp-content/uploads/2025/04/Grading-Certificate.pdf` },
      { label: "Managing Committee", href: `${NGI}/npiti/wp-content/uploads/2025/04/Chaiman-Members-Comittee.pdf` },
    ],
    contacts: OFFICE_CONTACTS,
  },

  vdsms: {
    tagline: "Quality, ethical and professional medical-science education",
    heroImage: "/institutions/vdsms.jpg",
    sourceUrl: `${NGI}/vdsms1/`,
    welcome: [
      "Vallabh Darshan Society for Medical Science (VDSMS) is the medical sciences wing of the Nathdwara Group of Institutions at Upali Odan, Nathdwara. Education is not limited to bookish knowledge — it is a tool that gives direction, purpose and values to life, and VDSMS is committed to imparting quality, ethical and professional education with that principle in mind.",
      "VDSMS aims to equip students with a positive attitude, professional skills and social responsibility so they can build successful careers and contribute to the nation as responsible citizens. The institute also runs skill-development programmes under the PMKVY and RSLDC schemes.",
    ],
    highlights: [
      "Medical-science education on the NGI campus",
      "Skill-development programmes under PMKVY & RSLDC",
      "Shared NGI library, laboratories, hostels and transport",
      "Managed by a dedicated manager and the NGI secretary",
    ],
    courseMatch: ["VDSMS"],
    phone: "+91 96368 15142",
    vision: GROUP_VISION,
    mission: GROUP_MISSION,
    messages: [
      CHAIRMAN_MESSAGE,
      {
        name: "Mr. Deepesh Parikh",
        role: "Managing Director",
        text: [
          "Education is not limited to bookish knowledge but it is a tool that gives direction, purpose and values to life. Our institution, Vallabh Darshan Society for Medical Sciences, is committed to imparting quality, ethical and professional education keeping this core principle in mind.",
          "Our aim is to equip the students with a positive attitude, professional skills and social responsibility so that they can not only build a successful career but also contribute to the development of the nation as a responsible citizen. Let us join together and take this sacred endeavour of education to new heights.",
        ],
      },
    ],
    documents: [
      { label: "Management Committee", href: `${NGI}/niet/wp-content/uploads/2022/05/Management-Commitee.jpg` },
    ],
    contacts: [
      { name: "Dr. Pankaj Rathi", role: "Manager", phone: "+91 96368 15142", email: "infopankajrathi@gmail.com" },
      { name: "Mr. Deepesh Parikh", role: "Secretary", phone: "+91 98292 34138", email: "md@nathdwarainstitute.com" },
    ],
  },

  "ayurved-nursing": {
    tagline: "Nursing education rooted in Ayurveda",
    heroImage: "/institutions/ayurved-nursing.jpg",
    welcome: [
      "Nathdwara College of B.Sc. Ayurveda Nursing (NCAN) trains nursing professionals who combine modern patient care with the Ayurvedic tradition, on the Nathdwara Group campus at Upali Odan. The college is approved by the Government of Rajasthan and affiliated to Dr. Sarvepalli Radhakrishnan Rajasthan Ayurved University, Jodhpur.",
      "Students share the group's library, hostels, canteen and transport. Contact the admission desk to confirm current course availability, eligibility and the admission schedule.",
    ],
    highlights: [
      "B.Sc. Ayurveda Nursing programme",
      "Affiliated to Dr. S. R. Rajasthan Ayurved University, Jodhpur",
      "Separate girls' and boys' hostels on campus",
      "Shared NGI library, canteen and transport",
      "Scholarship support under state and NGI schemes",
    ],
    courseMatch: ["NCAN"],
    phone: "+91 95713 45444",
    vision: GROUP_VISION,
    mission: GROUP_MISSION,
    contacts: OFFICE_CONTACTS,
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
    site.courseMatch.some((keyword) => course.institution.toLowerCase().includes(keyword.toLowerCase())),
  );
}
