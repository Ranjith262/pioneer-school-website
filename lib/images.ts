/**
 * Curated, verified Unsplash photography (India / school themed).
 * Every ID here was checked to return HTTP 200. Swap these for authentic
 * school photos before launch — keep the same alt-text discipline.
 */
const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const img = {
  heroClassroom: {
    src: unsplash("1709290749293-c6152a187b14", 1920),
    alt: "Indian students in blue uniforms learning in a bright classroom with teacher in saree",
  },
  indianClassroom: {
    src: unsplash("1580582932707-520aed937b7b", 1200),
    alt: "Sunlit Indian classroom with rows of green writing boards",
  },
  girlReading: {
    src: unsplash("1630864972901-052dfdc7fba4", 900),
    alt: "Joyful young Indian girl laughing in a bright green field",
  },
  kidsWriting: {
    src: unsplash("1692269725827-699e04a11cdf", 1600),
    alt: "Indian boys in blue uniforms writing at their desks in a classroom",
  },
  teacherBlackboard: {
    src: unsplash("1524069290683-0457abfe42c3", 1200),
    alt: "Smiling Indian school boys in light blue uniforms",
  },
  kidsOutdoors: {
    src: unsplash("1569173675610-42c361a86e37", 1600),
    alt: "Happy Indian school children in blue uniforms smiling together outdoors",
  },
  toddlersPlaying: {
    src: unsplash("1569173675610-42c361a86e37", 900),
    alt: "Happy Indian school children in blue uniforms smiling together outdoors",
  },
  crayonArt: {
    src: unsplash("1560421683-6856ea585c78", 900),
    alt: "Small hands colouring with bright crayons",
  },
  onlineLearning: {
    src: unsplash("1629306262232-1f854b4b0b13", 900),
    alt: "Indian students learning in a smart classroom session",
  },
  mathBoard: {
    src: unsplash("1509228468518-180dd4864904", 900),
    alt: "Mathematics formulas chalked on a blackboard",
  },
  graduationCaps: {
    src: unsplash("1523580846011-d3a5bc25702b", 900),
    alt: "Graduation caps thrown high in celebration",
  },
  scienceLab: {
    src: unsplash("1532094349884-543bc11b234d", 900),
    alt: "Colourful chemistry flasks in a science laboratory",
  },
  computerLab: {
    src: unsplash("1517694712202-14dd9538aa97", 900),
    alt: "Student coding on a laptop in a computer lab",
  },
  library: {
    src: unsplash("1524995997946-a1c2e315a42f", 900),
    alt: "Open books stacked in a warm library",
  },
  runningTrack: {
    src: unsplash("1461896836934-ffe607ba8211", 1200),
    alt: "Athletes sprinting on a red running track",
  },
  basketball: {
    src: unsplash("1540747913346-19e32dc3e97e", 900),
    alt: "Basketball players mid-game under bright lights",
  },
  schoolBus: {
    src: unsplash("1557223562-6c77ef16210f", 900),
    alt: "School bus ready for the morning route",
  },
  music: {
    src: unsplash("1511671782779-c97d3d27a1d4", 900),
    alt: "Hands playing a melody on piano keys",
  },
  artBrushes: {
    src: unsplash("1513364776144-60967b0f800f", 900),
    alt: "Paint brushes and vivid colour palettes in the art room",
  },
  yoga: {
    src: unsplash("1544367567-0f2fcb009e0b", 900),
    alt: "Peaceful yoga practice at sunrise",
  },
  holiColours: {
    src: unsplash("1514222134-b57cbb8ce073", 1600),
    alt: "The Golden Temple of Amritsar glowing over water at dusk",
  },
  tajMahal: {
    src: unsplash("1564507592333-c60657eea523", 1200),
    alt: "The Taj Mahal glowing at dawn — Indian heritage",
  },
  hampiTemple: {
    src: unsplash("1689946727963-be60e05fe278", 1200),
    alt: "Ancient Hampi temple ruins in Karnataka — a UNESCO World Heritage Site",
  },
  stageLights: {
    src: unsplash("1514525253161-7a46d19cd819", 1200),
    alt: "Stage lights over a lively cultural performance",
  },
  groupStudy: {
    src: unsplash("1692269725911-87697c558be1", 900),
    alt: "Indian girls in blue uniforms studying together at a classroom desk",
  },
  kidsInLine: {
    src: unsplash("1524069290683-0457abfe42c3", 900),
    alt: "Cheerful Indian school children in light blue uniforms waving",
  },
  chalkNotes: {
    src: unsplash("1503676260728-1c00da094a0b", 1200),
    alt: "Notebooks and learning materials on a study desk",
  },
  indianKidStudying: {
    src: unsplash("1596495578065-6e0763fa1178", 900),
    alt: "Young Indian child practising writing at home",
  },
  indianKids: {
    src: unsplash("1610484826967-09c5720778c7", 900),
    alt: "Smiling Indian school children together",
  },
  indianSchoolRoom: {
    src: unsplash("1692269725836-fbd72e98883f", 1200),
    alt: "Indian school children in blue uniforms at their desks in a bright classroom",
  },
  cricket: {
    src: unsplash("1531415074968-036ba1b575da", 1200),
    alt: "Cricket match in full swing — India's favourite game",
  },
} as const;

export type SiteImage = { src: string; alt: string };

/** Program slug → photography. */
export const programImages: Record<string, SiteImage> = {
  nursery: img.toddlersPlaying,
  lkg: img.crayonArt,
  ukg: img.girlReading,
  primary: img.kidsWriting,
  middle: img.mathBoard,
  secondary: img.graduationCaps,
};

/** Campus-life section title → photography. */
export const campusLifeImages: Record<string, SiteImage> = {
  "Sports & Games": img.runningTrack,
  "Arts & Craft": img.artBrushes,
  "Music & Dance": img.music,
  "Science & STEM": img.scienceLab,
  "Library & Reading": img.library,
  "Clubs & Competitions": img.groupStudy,
  "House System": img.basketball,
  "Educational Tours": img.hampiTemple,
  "Celebrations & Annual Day": img.stageLights,
};

/** Gallery item id → photography. */
export const galleryImages: Record<number, SiteImage> = {
  1: img.stageLights,
  2: img.cricket,
  3: img.scienceLab,
  4: img.kidsInLine,
  5: img.onlineLearning,
  6: img.hampiTemple,
  7: img.runningTrack,
  8: img.graduationCaps,
  9: img.computerLab,
  10: img.yoga,
  11: img.library,
  12: img.chalkNotes,
};
