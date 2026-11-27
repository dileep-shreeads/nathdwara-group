/**
 * Contact details below are taken from the official institution websites
 * (ngi.edu.in and nibmedu.com). Do not add numbers or emails that are not
 * published there — applicants act on these.
 */
export const SITE_CONTACT = {
  address:
    "NGI Campus, Bhanasol–Gadwara Road, Upali Odan, Nathdwara, Dist. Rajsamand, Rajasthan 313301",
  shortAddress: "Upali Odan, Nathdwara, Rajsamand (Raj.)",
  admissionPhone: "+91 95713 45444",
  officePhone: "+91 98292 34138",
  whatsapp: "917014810591",
  email: "md@nathdwarainstitute.com",
  womenHelpline: "+91 95713 45444",
  antiRaggingHelpline: "1800-180-5522",
  transportContact: { name: "Mr. S.D. Khan", phone: "+91 98280 89249" },
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Nathdwara+Group+of+Institutions+Upali+Odan+Nathdwara",
};

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface NavGroup {
  label: string;
  /** Path prefixes that mark this group as active */
  match: string[];
  items: NavLink[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "About",
    match: ["/about", "/disclosures"],
    items: [
      { label: "Overview & Heritage", href: "/about", description: "History, vision and values" },
      { label: "Leadership Messages", href: "/about#leadership", description: "Chairman & Managing Director" },
      { label: "Approvals & Affiliations", href: "/about#approvals", description: "MLSU, NCTE, BCI, NCVT" },
      { label: "Mandatory Disclosures", href: "/disclosures", description: "Approval letters, NOCs, staff lists" },
    ],
  },
  {
    label: "Academics",
    match: ["/programs"],
    items: [
      { label: "All Programmes", href: "/programs", description: "UG, PG, integrated and ITI courses" },
      { label: "NIBM Fee & Seat Intake", href: "/nibm#fees", description: "Official fee and seats, 2025-26" },
      {
        label: "Academic Calendar 2026-27",
        href: "https://www.nibmedu.com/wp-content/uploads/2026/08/Tentative-Calendar-of-session-2026-2027.pdf",
        description: "Tentative session calendar (PDF)",
        external: true,
      },
    ],
  },
  {
    label: "Admissions",
    match: ["/admissions", "/register"],
    items: [
      { label: "Admission Process 2026-27", href: "/admissions", description: "Step-by-step guidance" },
      { label: "Eligibility", href: "/admissions#eligibility", description: "PTET, NCET, MLSU entrance" },
      { label: "Fee & Scholarships", href: "/admissions#scholarships", description: "Merit and government schemes" },
      { label: "Register Online", href: "/register", description: "Start your application" },
    ],
  },
  {
    label: "Campus",
    match: ["/campus-life", "/facilities", "/placements", "/committees"],
    items: [
      { label: "Campus Life", href: "/campus-life", description: "Clubs, events and student life" },
      { label: "Facilities", href: "/facilities", description: "Library, hostel, mess and transport" },
      { label: "Laboratories", href: "/facilities#labs", description: "11 science, computer and activity labs" },
      { label: "Placements", href: "/placements", description: "Training & placement cell" },
      { label: "Committees & Cells", href: "/committees", description: "Anti-ragging, ICC, grievance and more" },
    ],
  },
];
