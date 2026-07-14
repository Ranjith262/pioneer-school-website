import type { Program } from "@/types";

export const programs: Program[] = [
  {
    slug: "nursery",
    name: "Nursery",
    ageRange: "Ages 3–4",
    summary:
      "A joyful first step into school life, where play-based learning builds curiosity, confidence, and early social skills.",
    icon: "teddy",
    gradient: "gold",
    curriculum: [
      "Pre-literacy through rhymes, stories, and picture talk",
      "Pre-numeracy with shapes, colours, and sorting games",
      "Fine and gross motor skill development",
      "Circle time for language and social confidence",
    ],
    methodology: [
      "Play-way method with hands-on activity corners",
      "Theme-based weekly learning (family, animals, seasons)",
      "Gentle routines that build independence",
    ],
    outcomes: [
      "Comfortable, happy separation from home to school",
      "Recognition of letters, numbers, shapes, and colours",
      "Confident self-expression in a group",
    ],
    assessment:
      "No formal testing. Teachers maintain observation-based portfolios shared with parents each term.",
    activities: ["Sand & water play", "Story time", "Music & movement", "Art and craft"],
  },
  {
    slug: "lkg",
    name: "LKG",
    ageRange: "Ages 4–5",
    summary:
      "Lower Kindergarten strengthens early literacy and numeracy foundations through structured play and guided discovery.",
    icon: "palette",
    gradient: "sky",
    curriculum: [
      "Phonics-based letter sounds and early writing strokes",
      "Numbers 1–50, patterns, and comparison concepts",
      "Environmental awareness through themes",
      "Conversation and vocabulary building",
    ],
    methodology: [
      "Montessori-inspired learning stations",
      "Learning by doing — tracing, building, matching",
      "Daily read-alouds and show-and-tell",
    ],
    outcomes: [
      "Reads simple three-letter words with phonics",
      "Writes letters and numbers with correct formation",
      "Follows multi-step instructions independently",
    ],
    assessment:
      "Continuous, informal assessment through worksheets and activity observation, reported to parents twice a year.",
    activities: ["Show and tell", "Clay modelling", "Rhymes competitions", "Nature walks"],
  },
  {
    slug: "ukg",
    name: "UKG",
    ageRange: "Ages 5–6",
    summary:
      "Upper Kindergarten prepares children for Class 1 with reading fluency, number work, and growing independence.",
    icon: "books",
    gradient: "green",
    curriculum: [
      "Reading simple sentences and sight words",
      "Numbers to 100, addition and subtraction readiness",
      "General awareness and good habits",
      "Introduction to Kannada and Hindi sounds",
    ],
    methodology: [
      "Blended phonics and whole-language approach",
      "Activity books with guided independent work",
      "Buddy reading and group projects",
    ],
    outcomes: [
      "Reads and writes simple sentences confidently",
      "Performs basic addition and subtraction",
      "Ready for the structure of primary school",
    ],
    assessment:
      "Term-wise skill checklists covering literacy, numeracy, and social development — shared at parent-teacher meetings.",
    activities: ["Reading corner", "Mini science experiments", "Annual concert", "Sports day"],
  },
  {
    slug: "primary",
    name: "Primary (Classes 1–5)",
    ageRange: "Ages 6–11",
    summary:
      "The primary years build strong fundamentals in languages, mathematics, science, and values through engaging classrooms.",
    icon: "pencil",
    gradient: "blue",
    curriculum: [
      "English, Kannada, and Hindi language development",
      "Mathematics with concrete-to-abstract progression",
      "Environmental Science with project-based learning",
      "Computer basics, art, music, and physical education",
    ],
    methodology: [
      "Concept-first teaching with real-life examples",
      "Smart classroom aids for visual learning",
      "Regular reading periods in the school library",
    ],
    outcomes: [
      "Strong reading, writing, and arithmetic foundations",
      "Curiosity-driven approach to science and society",
      "Healthy study habits and classroom discipline",
    ],
    assessment:
      "Continuous and comprehensive evaluation: unit tests, term exams, and skill-based grading with detailed report cards.",
    activities: ["Elocution", "Spell Bee", "Science club", "Inter-house sports"],
  },
  {
    slug: "middle",
    name: "Middle School (Classes 6–8)",
    ageRange: "Ages 11–14",
    summary:
      "Middle school deepens subject knowledge, introduces laboratory work, and develops independent study skills.",
    icon: "microscope",
    gradient: "teal",
    curriculum: [
      "Mathematics, Science, and Social Science in depth",
      "Three-language formula: English, Kannada, Hindi",
      "Computer science with hands-on lab sessions",
      "Life skills, value education, and general knowledge",
    ],
    methodology: [
      "Laboratory experiments for science concepts",
      "Group projects, presentations, and debates",
      "Structured homework and self-study routines",
    ],
    outcomes: [
      "Analytical thinking and problem-solving skills",
      "Confidence in public speaking and teamwork",
      "Solid preparation for secondary board syllabus",
    ],
    assessment:
      "Periodic tests, half-yearly and annual examinations, plus project and lab work evaluation.",
    activities: ["Science fair", "Quiz competitions", "Educational trips", "Olympiads"],
  },
  {
    slug: "secondary",
    name: "Secondary (Classes 9–10)",
    ageRange: "Ages 14–16",
    summary:
      "Focused board-exam preparation with rigorous academics, mentoring, and career guidance for every student.",
    icon: "graduation",
    gradient: "violet",
    curriculum: [
      "Complete state board syllabus coverage with revision cycles",
      "Mathematics, Science, and Social Science intensives",
      "Language mastery for board examinations",
      "Career awareness and higher-study guidance",
    ],
    methodology: [
      "Concept mastery followed by extensive practice papers",
      "Weekly tests with individual feedback",
      "Remedial classes and mentoring for every student",
    ],
    outcomes: [
      "Consistently strong SSLC board results",
      "Exam confidence through mock examinations",
      "Clear direction for pre-university choices",
    ],
    assessment:
      "Weekly tests, three preparatory examinations, and board-pattern mock exams with detailed answer reviews.",
    activities: ["Career counselling", "Board exam workshops", "Student council", "Sports meets"],
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
