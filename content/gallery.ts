import type { GalleryItem } from "@/types";

export const galleryItems: GalleryItem[] = [
  { id: 1, title: "Annual Day Group Dance", category: "Annual Day", year: "2026", emoji: "💃", gradient: "violet" },
  { id: 2, title: "Kabaddi Championship Match", category: "Sports", year: "2026", emoji: "🤼", gradient: "green" },
  { id: 3, title: "Rainwater Harvesting Model", category: "Science Fair", year: "2026", emoji: "💧", gradient: "sky" },
  { id: 4, title: "Independence Day March-Past", category: "Events", year: "2025", emoji: "🇮🇳", gradient: "gold" },
  { id: 5, title: "Smart Classroom Session", category: "Classrooms", year: "2026", emoji: "🖥️", gradient: "blue" },
  { id: 6, title: "Trip to Hampi Heritage Site", category: "Trips", year: "2025", emoji: "🏛️", gradient: "teal" },
  { id: 7, title: "Sports Day 100m Finals", category: "Sports", year: "2025", emoji: "🏃", gradient: "green" },
  { id: 8, title: "Annual Day Prize Distribution", category: "Annual Day", year: "2025", emoji: "🏆", gradient: "gold" },
  { id: 9, title: "Chemistry Lab Experiments", category: "Science Fair", year: "2025", emoji: "🧪", gradient: "violet" },
  { id: 10, title: "Yoga Day Celebration", category: "Events", year: "2026", emoji: "🧘", gradient: "sky" },
  { id: 11, title: "Library Reading Hour", category: "Classrooms", year: "2025", emoji: "📚", gradient: "blue" },
  { id: 12, title: "Educational Trip — Planetarium", category: "Trips", year: "2026", emoji: "🔭", gradient: "teal" },
];

export const galleryCategories = ["All", "Sports", "Events", "Science Fair", "Annual Day", "Classrooms", "Trips"] as const;
export const galleryYears = ["All", "2026", "2025"] as const;
