/**
 * Campus-wide content for the Facilities, Committees and News pages.
 * Source: official pages on nibmedu.com and ngi.edu.in (hostel, canteen,
 * transport, games, committees, news & events), retrieved November 2026.
 */

export interface FacilityBlock {
  id: string;
  title: string;
  eyebrow: string;
  intro: string;
  stats: { value: string; label: string }[];
  points: string[];
}

export const FACILITIES: FacilityBlock[] = [
  {
    id: "hostel",
    title: "Hostels",
    eyebrow: "Residential life",
    intro:
      "To accommodate students coming from far-off places, the college provides separate air-cooled hostels for boys and girls within the campus, each wing looked after by a dedicated warden.",
    stats: [
      { value: "~1,000", label: "Student capacity" },
      { value: "750 KVA", label: "DG power backup" },
      { value: "24×7", label: "Medical consultation" },
    ],
    points: [
      "Well-furnished rooms; all furniture and fixtures provided by the management",
      "Round-the-clock water, electricity, food, laundry, telephone and internet",
      "Hot water from a central solar water heater",
      "Mess, common TV rooms and indoor games section",
      "Badminton, basketball, volleyball, cricket, chess, carrom and table tennis",
      "Gymnasium, with yoga and meditation classes organised daily",
      "Qualified doctors on call, plus a monthly health check-up for hostellers",
      "Guest house with five suites for visiting faculty, parents and officials",
    ],
  },
  {
    id: "canteen",
    title: "Canteen & Mess",
    eyebrow: "Food on campus",
    intro:
      "A large, air-cooled and well-ventilated canteen with separate sections for faculty and for male and female students, serving hot meals and snacks at reasonable rates.",
    stats: [
      { value: "1,000", label: "Seated at a time" },
      { value: "5 AM–11 PM", label: "Opening hours" },
      { value: "RO", label: "Purified cold water" },
    ],
    points: [
      "Fixed schedules for breakfast, lunch and dinner",
      "Gujarati, Rajasthani, South Indian, Chinese and continental menus",
      "Diet plans on request for individual requirements",
      "Separate counter for packed food, cold drinks and snacks",
      "Automatic cooking and storage facilities",
      "Get-togethers and parties arranged with management permission",
    ],
  },
  {
    id: "transport",
    title: "College Transport",
    eyebrow: "Getting to campus",
    intro:
      "Nathdwara Group of Institutions owns and operates a fleet of sixteen college buses that bring over 700 students to campus every day from destinations within a 50 km radius.",
    stats: [
      { value: "16", label: "College buses" },
      { value: "700+", label: "Students daily" },
      { value: "50 km", label: "Route radius" },
    ],
    points: [
      "Routes: Udaipur, Nathdwara, Rajnagar, Kankroli, Fatehnagar, Mavli and Relmagra",
      "Air-cooled interiors; speed governors fitted in every bus",
      "First-aid boxes, fire extinguishers and emergency exits",
      "Separate buses for faculty and staff",
      "Experienced drivers; regular servicing and annual mechanical audits",
      "Senior student bus captains help keep journeys safe",
    ],
  },
  {
    id: "sports",
    title: "Games & Sports",
    eyebrow: "Fitness",
    intro:
      "Indoor and outdoor games equipment is available to all students, alongside the hostel gymnasium and daily yoga sessions.",
    stats: [
      { value: "Indoor", label: "Chess, carrom, TT" },
      { value: "Outdoor", label: "Cricket, volleyball" },
      { value: "Athletics", label: "Javelin, hammer" },
    ],
    points: [
      "Cricket kits, volleyball, badminton and table tennis",
      "Kho-kho poles, javelin, hammer throw and stopwatches",
      "Chess boards and full-size carrom",
      "Yoga mats for daily yoga and meditation",
    ],
  },
];

export interface CommitteeMember {
  name: string;
  designation: string;
  role?: string;
}

export interface Committee {
  id: string;
  title: string;
  summary: string;
  points: string[];
  members?: CommitteeMember[];
  helpline?: string;
  link?: { label: string; href: string };
}

export const COMMITTEES: Committee[] = [
  {
    id: "anti-ragging",
    title: "Anti-Ragging Committee",
    summary:
      "The University Grants Commission prohibits ragging in institutions of higher education. All students are instructed to refrain completely from any form of ragging within the college premises.",
    points: [
      "Cancellation of admission",
      "Suspension from lectures and practicals",
      "Withholding of scholarships, fellowships and other benefits",
      "Barring from internal or semester-end examinations, or withholding of results",
      "Ban on representing the college in any meet, tournament or festival",
      "Rustication for 1 to 4 semesters, or expulsion with a bar on admission elsewhere",
    ],
    helpline: "1800-180-5522",
    members: [
      { name: "Dr. Ranjana Sharma", designation: "Head of Institution", role: "Chairman" },
      { name: "Dr. Mukesh Sharma", designation: "HoD, Department of Education", role: "Convener" },
      { name: "Dr. Lokendra Kumawat", designation: "HoD, Department of Mathematics", role: "Member" },
      { name: "Dr. Vijay Maurya", designation: "HoD, Department of Physics", role: "Member" },
    ],
  },
  {
    id: "icc",
    title: "Internal Complaints Committee",
    summary:
      "Constituted under Section 4 of the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, to keep the co-educational campus safe and respectful.",
    points: [
      "Prevent sexual harassment at the workplace",
      "Prevent discrimination and promote gender equality among students and employees",
      "Conduct periodic programmes on women empowerment",
      "Provide a conducive and congenial environment for women",
    ],
    members: [
      { name: "Dr. Ranjana Sharma", designation: "Head of Institution", role: "Presiding Officer" },
      { name: "Dr. Lokendra Kumawat", designation: "HoD, Department of Mathematics", role: "Member" },
      { name: "Dr. Vijay Maurya", designation: "HoD, Department of Physics", role: "Member" },
      { name: "Dr. Jabber Singh Jasawat", designation: "Assistant Professor (Hindi)", role: "Member" },
      { name: "Dr. Arvind Singh Chauhan", designation: "Assistant Professor (Geography)", role: "Member" },
      { name: "Ms. Priya Sharma", designation: "Assistant Professor (Sociology)", role: "Member" },
    ],
  },
  {
    id: "grievance",
    title: "Grievance Redressal Cell",
    summary:
      "Constituted as per the UGC (Grievance Redressal) Regulations, 2018 to resolve academic and non-academic grievances of students and staff within a stipulated time frame.",
    points: [
      "Submit grievances online or through the grievance/suggestion box",
      "Each complaint is assessed on merit and acted on promptly",
      "The cell may mediate between the complainant and the respondent",
      "Cases are reported to the appropriate authority, with guidance sought where needed",
    ],
    members: [
      { name: "Dr. Mukesh Sharma", designation: "HoD, Department of Education" },
      { name: "Dr. Sudha Shrimali", designation: "Assistant Professor, Department of Education" },
      { name: "Mr. Kailash Kumar Purbia", designation: "HoD, Department of BCA" },
      { name: "Ms. Kavita Sharma", designation: "Assistant Professor, Department of Botany" },
    ],
    link: { label: "Lodge a grievance on the NIBM site", href: "https://www.nibmedu.com/?page_id=1618" },
  },
  {
    id: "women-cell",
    title: "Women Development Cell",
    summary:
      "Established in July 2020 to promote the well-being of girl students and women staff, with a separate Internal Complaints Committee handling harassment complaints.",
    points: [
      "Awareness about health and hygiene among girl students",
      "Lectures, workshops and seminars on gender discrimination",
      "Skill-development workshops that encourage self-reliance",
      "Legal awareness about women's welfare laws",
    ],
    helpline: "+91 95713 45444",
  },
  {
    id: "sc-st",
    title: "SC/ST Cell",
    summary:
      "Supports Scheduled Caste and Scheduled Tribe students with counselling, guidance and help accessing government financial assistance, as per the SC/ST (Prevention of Atrocities) Act, 1989.",
    points: [
      "Procedures to address and rectify grievances",
      "Protection and reservation as provided in the Constitution",
      "Information on State Government and UGC scholarships and jobs",
      "Remedial coaching, career guidance and emotional counselling",
    ],
    members: [
      { name: "Dr. Arvind Singh Chauhan", designation: "Assistant Professor, Department of Education", role: "Chairman" },
      { name: "Dr. Sanjay Kumar", designation: "Faculty", role: "Secretary" },
      { name: "Mr. Chandra Bhan Singh", designation: "Assistant Professor (Physics)", role: "Member" },
    ],
  },
  {
    id: "obc",
    title: "OBC Cell",
    summary:
      "Ensures compliance with reservation orders for Other Backward Classes and addresses the grievances of OBC and minority students and staff.",
    points: [
      "Implement, monitor and evaluate the reservation policy",
      "Inform students and staff about government facilities and schemes",
      "Collect and analyse admission and appointment data against quotas",
    ],
    members: [
      { name: "Dr. Lokendra Kumawat", designation: "HoD, Department of Mathematics", role: "Chairman" },
      { name: "Dr. Vijay Maurya", designation: "HoD, Department of Physics", role: "Member Secretary" },
      { name: "Mr. Nawab Ali", designation: "Faculty", role: "Member" },
    ],
  },
  {
    id: "ses-rec",
    title: "Social Entrepreneurship, Swachhta & Rural Engagement Cell",
    summary:
      "Constituted in August 2020 at the request of the Mahatma Gandhi National Council of Rural Education, with student teams working on five themes.",
    points: ["Sanitation and hygiene", "Waste management", "Water management", "Energy management", "Greenery"],
    members: [
      { name: "Dr. Ranjana Sharma", designation: "Chairman, SAP Club" },
      { name: "Dr. Sudha Sharma", designation: "Faculty" },
      { name: "Dr. Lokendra Kumawat", designation: "Faculty" },
      { name: "Dr. Mukesh Sharma", designation: "Faculty" },
    ],
  },
];

export interface NewsItem {
  date: string;
  isoDate: string;
  title: string;
  category: "Event" | "Notice" | "Academic";
  institution: string;
  summary: string;
  href?: string;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    date: "Session 2026-27",
    isoDate: "2026-08-01",
    title: "Tentative academic calendar for session 2026-27 published",
    category: "Academic",
    institution: "NIBM",
    summary: "The tentative calendar of the 2026-27 session is available for download.",
    href: "https://www.nibmedu.com/wp-content/uploads/2026/08/Tentative-Calendar-of-session-2026-2027.pdf",
  },
  {
    date: "Session 2026-27",
    isoDate: "2026-07-01",
    title: "NCTE recognises ITEP B.Sc. B.Ed. (Secondary) with 100 seats",
    category: "Academic",
    institution: "NIBM",
    summary:
      "The four-year Integrated Teacher Education Programme is recognised from the 2026-27 session, with admission through NCET.",
    href: "https://www.nibmedu.com/wp-content/uploads/2026/07/NCTE-RECOGNITION-ORDER-FOR-ITEP-FROM-THE-SESSION-2026-2027.pdf",
  },
  {
    date: "10 Feb 2025",
    isoDate: "2025-02-10",
    title: "Trainees to attend 'Pariksha Pe Charcha'",
    category: "Notice",
    institution: "NPITI",
    summary: "All trainees were required to attend Pariksha Pe Charcha on 10 February 2025 at 11:00 AM.",
  },
  {
    date: "2025",
    isoDate: "2025-01-15",
    title: "Compulsory PMIS portal registration for all trainees",
    category: "Notice",
    institution: "NPITI",
    summary: "All ITI trainees must register on the PMIS portal; photo attendance at the institute is mandatory.",
  },
  {
    date: "17 Sep – 2 Oct 2024",
    isoDate: "2024-09-17",
    title: "Swachhata Hi Sewa campaign",
    category: "Event",
    institution: "NIBM",
    summary: "Students and staff took part in the national cleanliness campaign over two weeks.",
    href: "https://ngi.edu.in/nibm/?page_id=2990",
  },
  {
    date: "12 Jul 2024",
    isoDate: "2024-07-12",
    title: "Tree plantation drive",
    category: "Event",
    institution: "NIBM",
    summary: "A campus tree plantation drive organised as part of the greenery initiative.",
    href: "https://ngi.edu.in/nibm/?page_id=2981",
  },
  {
    date: "21 Jun 2024",
    isoDate: "2024-06-21",
    title: "International Yoga Day",
    category: "Event",
    institution: "NIBM",
    summary: "Yoga session for students and faculty on International Yoga Day.",
    href: "https://ngi.edu.in/nibm/?page_id=2978",
  },
  {
    date: "5 Jun 2024",
    isoDate: "2024-06-05",
    title: "World Environment Day",
    category: "Event",
    institution: "NIBM",
    summary: "Awareness programme marking World Environment Day.",
    href: "https://ngi.edu.in/nibm/?page_id=2967",
  },
  {
    date: "25 May 2024",
    isoDate: "2024-05-25",
    title: "CPR training workshop",
    category: "Event",
    institution: "NIBM",
    summary: "Hands-on cardiopulmonary resuscitation (CPR) training for students.",
    href: "https://ngi.edu.in/nibm/?page_id=2958",
  },
  {
    date: "17 May 2024",
    isoDate: "2024-05-17",
    title: "International Hypertension Day",
    category: "Event",
    institution: "NIBM",
    summary: "Health awareness session on hypertension.",
    href: "https://ngi.edu.in/nibm/?page_id=2955",
  },
  {
    date: "7 May 2024",
    isoDate: "2024-05-07",
    title: "Rabindranath Tagore Jayanti and World Asthma Day",
    category: "Event",
    institution: "NIBM",
    summary: "Tribute to Gurudev Tagore along with asthma awareness.",
    href: "https://ngi.edu.in/nibm/?page_id=2940",
  },
];
