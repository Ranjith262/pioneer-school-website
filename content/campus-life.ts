import type { GradientVariant } from "@/types";

export interface CampusLifeSection {
  title: string;
  description: string;
  emoji: string;
  gradient: GradientVariant;
  highlights: string[];
}

export const campusLife: CampusLifeSection[] = [
  {
    title: "Sports & Games",
    description:
      "Daily physical education plus coaching in kabaddi, kho-kho, cricket, volleyball, and athletics on our spacious grounds.",
    emoji: "⚽",
    gradient: "green",
    highlights: ["Inter-house tournaments", "Annual sports meet", "Taluk & district participation"],
  },
  {
    title: "Arts & Craft",
    description:
      "A dedicated art room where students explore drawing, painting, and craft — with their best work displayed across campus.",
    emoji: "🎨",
    gradient: "gold",
    highlights: ["Weekly art periods", "Drawing competitions", "Craft exhibitions"],
  },
  {
    title: "Music & Dance",
    description:
      "Vocal, instrumental, and classical/folk dance training that culminates in stage performances through the year.",
    emoji: "🎵",
    gradient: "violet",
    highlights: ["Annual Day performances", "Music room sessions", "Folk dance troupe"],
  },
  {
    title: "Science & STEM",
    description:
      "Hands-on experiments, working models, and a school science club that feeds our award-winning science fair teams.",
    emoji: "🔬",
    gradient: "sky",
    highlights: ["Science club", "District fair winners", "Model-making workshops"],
  },
  {
    title: "Library & Reading",
    description:
      "A calm reading space with storybooks, encyclopaedias, and periodicals — plus dedicated library periods for every class.",
    emoji: "📚",
    gradient: "blue",
    highlights: ["Weekly library period", "Reading challenges", "Storytelling sessions"],
  },
  {
    title: "Clubs & Competitions",
    description:
      "Quiz, elocution, spell bee, and eco clubs give every child a platform to discover and sharpen their talents.",
    emoji: "🏅",
    gradient: "teal",
    highlights: ["Quiz club", "Elocution & debate", "Olympiad training"],
  },
  {
    title: "House System",
    description:
      "Every student belongs to one of four houses — Ruby, Sapphire, Emerald, and Topaz — competing all year for the house trophy.",
    emoji: "🏠",
    gradient: "gold",
    highlights: ["Four houses", "House captains & prefects", "Annual rolling trophy"],
  },
  {
    title: "Educational Tours",
    description:
      "Age-appropriate excursions — from local field visits for tiny tots to heritage and science-centre trips for seniors.",
    emoji: "🚌",
    gradient: "green",
    highlights: ["Hampi heritage trips", "Planetarium visits", "Local field studies"],
  },
  {
    title: "Celebrations & Annual Day",
    description:
      "Independence Day, Republic Day, festivals, and a grand Annual Day where every child gets a moment on stage.",
    emoji: "🎉",
    gradient: "violet",
    highlights: ["Annual Day", "National festivals", "Cultural assemblies"],
  },
];
