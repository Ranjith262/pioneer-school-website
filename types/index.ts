export interface Program {
  slug: string;
  name: string;
  ageRange: string;
  summary: string;
  emoji: string;
  gradient: GradientVariant;
  curriculum: string[];
  methodology: string[];
  outcomes: string[];
  assessment: string;
  activities: string[];
}

export interface Facility {
  name: string;
  description: string;
  emoji: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: "Parent" | "Student" | "Alumni";
}

export interface NewsItem {
  slug: string;
  title: string;
  date: string; // ISO date
  category: "Announcement" | "Event" | "Achievement" | "Circular";
  excerpt: string;
  body: string[];
}

export interface SchoolEvent {
  title: string;
  date: string; // ISO date
  time: string;
  location: string;
  description: string;
}

export interface Achievement {
  title: string;
  year: string;
  category: string;
  description: string;
  emoji: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: "Sports" | "Events" | "Science Fair" | "Annual Day" | "Classrooms" | "Trips";
  year: string;
  emoji: string;
  gradient: GradientVariant;
}

export interface Faq {
  question: string;
  answer: string;
}

export type GradientVariant =
  | "blue"
  | "green"
  | "gold"
  | "sky"
  | "teal"
  | "violet";
