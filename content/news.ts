import type { NewsItem, SchoolEvent } from "@/types";

export const news: NewsItem[] = [
  {
    slug: "admissions-open-2026-27",
    title: "Admissions Open for Academic Year 2026–27",
    date: "2026-06-15",
    category: "Announcement",
    excerpt:
      "Applications are now open for Nursery to Class 10. Limited seats available — apply early to secure your child's place.",
    body: [
      "Pioneer Public School is delighted to announce that admissions for the academic year 2026–27 are now open for all classes from Nursery to Class 10.",
      "Parents can apply online through our admissions page or visit the school office between 9:00 AM and 4:00 PM on working days. Our admissions team will guide you through the process, eligibility, and required documents.",
      "We encourage early applications as seats in Nursery, LKG, and Class 1 fill quickly. Campus tours are available by appointment — we would love to show you around.",
    ],
  },
  {
    slug: "sslc-results-2025",
    title: "Outstanding SSLC Results: 100% Pass with 40% Distinctions",
    date: "2026-05-10",
    category: "Achievement",
    excerpt:
      "Our Class 10 students have once again made the school proud with a 100% pass rate in the SSLC board examinations.",
    body: [
      "We are proud to announce that all our Class 10 students cleared the SSLC board examination, with 40% securing distinction and 75% scoring first class.",
      "This result reflects the dedication of our students, the tireless effort of our teachers, and the constant support of parents. Special congratulations to our school toppers.",
      "The school conducted extra coaching classes, three preparatory examinations, and one-on-one mentoring throughout the year — an approach we will continue for the current batch.",
    ],
  },
  {
    slug: "annual-day-2026",
    title: "Annual Day Celebration — 'Roots and Wings'",
    date: "2026-02-20",
    category: "Event",
    excerpt:
      "A spectacular evening of dance, drama, and music as students showcased their talents to a packed audience.",
    body: [
      "Our Annual Day celebration, themed 'Roots and Wings', was a grand success with over 200 students participating in cultural performances.",
      "The chief guest praised the confidence of our young performers, and prizes were distributed to academic and co-curricular achievers of the year.",
      "We thank all parents for their enthusiastic presence and support in making the evening memorable.",
    ],
  },
  {
    slug: "science-fair-district-winners",
    title: "Pioneer Students Win District Science Fair",
    date: "2026-01-12",
    category: "Achievement",
    excerpt:
      "Our Class 8 team's water-conservation model won first prize at the district-level science exhibition.",
    body: [
      "A team of Class 8 students won first place at the district science exhibition for their working model on rainwater harvesting and water conservation.",
      "The project was developed over six weeks in our science lab under the guidance of our science faculty.",
      "The team now advances to the state-level exhibition. We wish them the very best!",
    ],
  },
  {
    slug: "summer-vacation-circular",
    title: "Circular: Summer Vacation and Reopening Dates",
    date: "2026-04-05",
    category: "Circular",
    excerpt:
      "The school will remain closed for summer vacation from April 10. Classes resume on May 29 for the new academic year.",
    body: [
      "This is to inform all parents that summer vacation begins on April 10, 2026. The school will reopen for the new academic year on May 29, 2026.",
      "The school office will remain open on working days from 9:30 AM to 1:00 PM during the vacation for admissions and administrative work.",
      "Holiday homework has been shared with students. We wish all families a safe and joyful summer break.",
    ],
  },
  {
    slug: "independence-day-2025",
    title: "Independence Day Celebrated with Patriotic Fervour",
    date: "2025-08-15",
    category: "Event",
    excerpt:
      "Flag hoisting, cultural programmes, and a march-past marked the 79th Independence Day at our campus.",
    body: [
      "The 79th Independence Day was celebrated with great enthusiasm at Pioneer Public School.",
      "The celebration began with flag hoisting, followed by the national anthem, a march-past by student houses, and patriotic songs and speeches by students.",
      "Sweets were distributed to all students, and the best march-past house was awarded the rolling trophy.",
    ],
  },
];

export const events: SchoolEvent[] = [
  {
    title: "Campus Tour Day for New Parents",
    date: "2026-07-12",
    time: "10:00 AM – 1:00 PM",
    location: "School Campus",
    description: "Guided tours of classrooms, labs, and grounds with the admissions team.",
  },
  {
    title: "Parent–Teacher Meeting (All Classes)",
    date: "2026-07-19",
    time: "9:30 AM – 12:30 PM",
    location: "Respective Classrooms",
    description: "First-term progress discussion with class teachers.",
  },
  {
    title: "Inter-House Sports Meet",
    date: "2026-08-08",
    time: "8:30 AM – 4:00 PM",
    location: "School Sports Ground",
    description: "Track and field events, kabaddi, and kho-kho across all four houses.",
  },
  {
    title: "Independence Day Celebration",
    date: "2026-08-15",
    time: "8:00 AM – 10:30 AM",
    location: "School Assembly Ground",
    description: "Flag hoisting, march-past, and cultural programme. Parents welcome.",
  },
  {
    title: "Science Exhibition",
    date: "2026-09-05",
    time: "10:00 AM – 3:00 PM",
    location: "Science Lab & Hall",
    description: "Student projects and working models on display for parents and visitors.",
  },
];

export function getNewsItem(slug: string): NewsItem | undefined {
  return news.find((n) => n.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
