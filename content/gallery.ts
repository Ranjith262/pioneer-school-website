import type { GalleryItem } from "@/types";

export const galleryItems: GalleryItem[] = [
  { id: 1, title: "Annual Day Group Dance", category: "Annual Day", year: "2026", icon: "dance", gradient: "violet" },
  { id: 2, title: "Kabaddi Championship Match", category: "Sports", year: "2026", icon: "wrestling", gradient: "green" },
  { id: 3, title: "Rainwater Harvesting Model", category: "Science Fair", year: "2026", icon: "water", gradient: "sky" },
  { id: 4, title: "Independence Day March-Past", category: "Events", year: "2025", icon: "flag", gradient: "gold" },
  { id: 5, title: "Smart Classroom Session", category: "Classrooms", year: "2026", icon: "smart-classroom", gradient: "blue" },
  { id: 6, title: "Trip to Hampi Heritage Site", category: "Trips", year: "2025", icon: "temple", gradient: "teal" },
  { id: 7, title: "Sports Day 100m Finals", category: "Sports", year: "2025", icon: "runner", gradient: "green" },
  { id: 8, title: "Annual Day Prize Distribution", category: "Annual Day", year: "2025", icon: "trophy", gradient: "gold" },
  { id: 9, title: "Chemistry Lab Experiments", category: "Science Fair", year: "2025", icon: "flask", gradient: "violet" },
  { id: 10, title: "Yoga Day Celebration", category: "Events", year: "2026", icon: "yoga", gradient: "sky" },
  { id: 11, title: "Library Reading Hour", category: "Classrooms", year: "2025", icon: "books", gradient: "blue" },
  { id: 12, title: "Educational Trip — Planetarium", category: "Trips", year: "2026", icon: "telescope", gradient: "teal" },
];

export const galleryCategories = ["All", "Sports", "Events", "Science Fair", "Annual Day", "Classrooms", "Trips"] as const;
export const galleryYears = ["All", "2026", "2025"] as const;
