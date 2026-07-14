export const img = {
  heroClassroom: {
    src: "/images/hero-classroom.jpg",
    alt: "Indian students in blue uniforms learning in a bright classroom with teacher in saree",
  },
  indianClassroom: {
    src: "/images/indian-classroom.jpg",
    alt: "Sunlit Indian classroom with rows of green writing boards",
  },
  girlReading: {
    src: "/images/girl-reading.jpg",
    alt: "Joyful young Indian girl laughing in a bright green field",
  },
  kidsWriting: {
    src: "/images/kids-writing.jpg",
    alt: "Indian boys in blue uniforms writing at their desks in a classroom",
  },
  teacherBlackboard: {
    src: "/images/teacher-blackboard.jpg",
    alt: "Smiling Indian school boys in light blue uniforms",
  },
  kidsOutdoors: {
    src: "/images/kids-outdoors.jpg",
    alt: "Happy Indian school children in blue uniforms smiling together outdoors",
  },
  toddlersPlaying: {
    src: "/images/kids-outdoors.jpg",
    alt: "Happy Indian school children in blue uniforms smiling together outdoors",
  },
  crayonArt: {
    src: "/images/crayon-art.jpg",
    alt: "Small hands colouring with bright crayons",
  },
  onlineLearning: {
    src: "/images/online-learning.jpg",
    alt: "Indian students learning in a smart classroom session",
  },
  mathBoard: {
    src: "/images/math-board.jpg",
    alt: "Mathematics formulas chalked on a blackboard",
  },
  graduationCaps: {
    src: "/images/graduation-caps.jpg",
    alt: "Graduation caps thrown high in celebration",
  },
  scienceLab: {
    src: "/images/science-lab.jpg",
    alt: "Colourful chemistry flasks in a science laboratory",
  },
  computerLab: {
    src: "/images/computer-lab.jpg",
    alt: "Student coding on a laptop in a computer lab",
  },
  library: {
    src: "/images/library.jpg",
    alt: "Open books stacked in a warm library",
  },
  runningTrack: {
    src: "/images/running-track.jpg",
    alt: "Athletes sprinting on a red running track",
  },
  basketball: {
    src: "/images/basketball.jpg",
    alt: "Basketball players mid-game under bright lights",
  },
  schoolBus: {
    src: "/images/school-bus.jpg",
    alt: "School bus ready for the morning route",
  },
  music: {
    src: "/images/music.jpg",
    alt: "Hands playing a melody on piano keys",
  },
  artBrushes: {
    src: "/images/art-brushes.jpg",
    alt: "Paint brushes and vivid colour palettes in the art room",
  },
  yoga: {
    src: "/images/yoga.jpg",
    alt: "Peaceful yoga practice at sunrise",
  },
  holiColours: {
    src: "/images/holi-colours.jpg",
    alt: "The Golden Temple of Amritsar glowing over water at dusk",
  },
  tajMahal: {
    src: "/images/taj-mahal.jpg",
    alt: "The Taj Mahal glowing at dawn — Indian heritage",
  },
  hampiTemple: {
    src: "/images/hampi-temple.jpg",
    alt: "Ancient Hampi temple ruins in Karnataka — a UNESCO World Heritage Site",
  },
  stageLights: {
    src: "/images/stage-lights.jpg",
    alt: "Stage lights over a lively cultural performance",
  },
  groupStudy: {
    src: "/images/group-study.jpg",
    alt: "Indian girls in blue uniforms studying together at a classroom desk",
  },
  kidsInLine: {
    src: "/images/teacher-blackboard.jpg",
    alt: "Cheerful Indian school children in light blue uniforms waving",
  },
  chalkNotes: {
    src: "/images/chalk-notes.jpg",
    alt: "Notebooks and learning materials on a study desk",
  },
  indianKidStudying: {
    src: "/images/indian-kid-studying.jpg",
    alt: "Young Indian child practising writing at home",
  },
  indianKids: {
    src: "/images/indian-kids.jpg",
    alt: "Smiling Indian school children together",
  },
  indianSchoolRoom: {
    src: "/images/indian-school-room.jpg",
    alt: "Indian school children in blue uniforms at their desks in a bright classroom",
  },
  cricket: {
    src: "/images/cricket.jpg",
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
