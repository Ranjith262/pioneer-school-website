export const site = {
  name: "Pioneer Public School",
  tagline: "Learning Today. Leading Tomorrow.",
  subTagline:
    "Nurturing young minds from Nursery to Class 10 through academic excellence, values, and holistic development.",
  established: 2015,
  studentCount: "300+",
  staffCount: "20+",
  grades: "Nursery – Class 10",
  url: "https://www.pioneerpublicschool.in",
  address: {
    line1: "Pragati Nagar, Ojanahalli Road",
    line2: "Bhagyanagar, Koppal",
    state: "Karnataka",
    pincode: "583238",
    country: "India",
  },
  phone: "+91 94824 66882",
  admissionsPhone: "+91 94824 66882",
  email: "pioneerpublic15@gmaomail.com",
  admissionsEmail: "pioneerpublic15@gmaomail.com",
  hours: "Monday – Saturday, 9:00 AM – 4:30 PM",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Bhagyanagar,+Koppal,+Karnataka+583238&output=embed",
  social: {
    facebook: "https://facebook.com/pioneerpublicschool",
    instagram: "https://instagram.com/pioneerpublicschool",
    youtube: "https://youtube.com/@pioneerpublicschool",
  },
  announcement: {
    text: "Admissions open for Academic Year 2026–27 — Nursery to Class 10.",
    href: "/admissions",
    cta: "Apply Now",
  },
} as const;

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Campus Life", href: "/campus-life" },
  { label: "Gallery", href: "/gallery" },
  { label: "Achievements", href: "/achievements" },
  { label: "News", href: "/news" },
  { label: "Parents", href: "/parents" },
  { label: "Contact", href: "/contact" },
] as const;
