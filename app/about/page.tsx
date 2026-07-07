import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { img } from "@/lib/images";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Pioneer Public School's history, vision, mission, values, faculty, and infrastructure — serving Koppal since 2015.",
  alternates: { canonical: "/about" },
};

const values = [
  { name: "Integrity", description: "Doing the right thing, even when no one is watching.", emoji: "🤝" },
  { name: "Excellence", description: "Giving our best in academics, sports, and character.", emoji: "⭐" },
  { name: "Respect", description: "Valuing every person, culture, and point of view.", emoji: "🙏" },
  { name: "Curiosity", description: "Asking questions and never stopping to learn.", emoji: "💡" },
  { name: "Responsibility", description: "Caring for our community and our environment.", emoji: "🌍" },
  { name: "Compassion", description: "Leading with kindness inside and outside school.", emoji: "❤️" },
];

const milestones = [
  { year: "2015", event: "Pioneer Public School founded in Bhagyanagar, Koppal with Nursery to Class 5." },
  { year: "2017", event: "Extended to Middle School (Classes 6–8); science and computer labs inaugurated." },
  { year: "2019", event: "First batch of Class 10; secondary section fully established." },
  { year: "2021", event: "Smart classrooms introduced across all grades." },
  { year: "2023", event: "Awarded Best School in Koppal Taluk for holistic education." },
  { year: "2025", event: "100% SSLC pass rate with 40% distinctions; 300+ students strong." },
];

const faculty = [
  { name: "The Principal", role: "School Leadership", emoji: "👩‍💼", note: "20+ years in school education and administration." },
  { name: "Primary Wing Team", role: "Nursery – Class 5", emoji: "👩‍🏫", note: "Specialists in early childhood and foundational learning." },
  { name: "Middle School Team", role: "Classes 6 – 8", emoji: "👨‍🏫", note: "Subject experts in science, mathematics, and languages." },
  { name: "Secondary Team", role: "Classes 9 – 10", emoji: "🧑‍🏫", note: "Board-exam mentors with consistently strong results." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Pioneer Public School"
        description="A decade of nurturing confident, compassionate learners in the heart of Koppal."
        crumbs={[{ label: "About" }]}
      />

      {/* History */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn direction="right">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Our Story
            </p>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Rooted in Koppal, Reaching for the World
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                Pioneer Public School was established in {site.established} with a simple
                conviction: the children of Koppal deserve a school that matches the best
                anywhere — in teaching quality, in values, and in opportunity.
              </p>
              <p>
                What began as a small primary school in Pragati Nagar has grown into a
                vibrant community of {site.studentCount} students and {site.staffCount} dedicated
                staff, offering a complete education from Nursery to Class 10.
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="left">
            <Photo
              src={img.indianSchoolRoom.src}
              alt={img.indianSchoolRoom.alt}
              className="aspect-[4/3] rounded-card shadow-lift"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </FadeIn>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="bg-surface py-16 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <div className="h-full rounded-card bg-white p-10 shadow-soft">
              <span aria-hidden="true" className="text-4xl">🔭</span>
              <h2 className="mt-4 text-2xl font-bold text-ink">Our Vision</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                To be the most trusted school in the region — a place where every child
                discovers their strengths, builds strong character, and leaves prepared
                to lead in a changing world.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="h-full rounded-card bg-white p-10 shadow-soft">
              <span aria-hidden="true" className="text-4xl">🎯</span>
              <h2 className="mt-4 text-2xl font-bold text-ink">Our Mission</h2>
              <ul className="mt-4 space-y-3 text-lg leading-relaxed text-muted">
                <li>• Deliver concept-first, joyful learning in every classroom.</li>
                <li>• Give equal weight to academics, arts, sports, and values.</li>
                <li>• Partner closely with parents in every child&apos;s journey.</li>
                <li>• Keep quality education accessible to our community.</li>
              </ul>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Principal's message */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn direction="right" className="order-2 lg:order-1">
            <Photo
              src={img.teacherBlackboard.src}
              alt={img.teacherBlackboard.alt}
              className="aspect-[4/3] rounded-card shadow-lift"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </FadeIn>
          <FadeIn direction="left" className="order-1 lg:order-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Principal&apos;s Message
            </p>
            <h2 className="mt-3 text-3xl font-bold text-ink">
              Every Child Carries a Spark
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                “Education is not only about marks — it is about awakening. Our teachers
                work every day to help children fall in love with learning, stand up
                with confidence, and treat others with kindness.
              </p>
              <p>
                When you walk through our corridors, you will hear questions, laughter,
                and music. That is the sound of childhood being honoured. I invite you
                to visit us and see it for yourself.”
              </p>
            </div>
            <p className="mt-5 font-heading font-semibold text-ink">
              — The Principal, Pioneer Public School
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Milestones */}
      <section className="bg-surface py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our Journey"
            title="A Decade of Milestones"
          />
          <ol className="relative mx-auto max-w-3xl space-y-8 border-l-2 border-primary-100 pl-8">
            {milestones.map((milestone, i) => (
              <FadeIn key={milestone.year} delay={i * 0.05}>
                <li className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-white bg-primary shadow-soft"
                  />
                  <p className="font-heading text-lg font-bold text-primary">
                    {milestone.year}
                  </p>
                  <p className="mt-1 text-muted">{milestone.event}</p>
                </li>
              </FadeIn>
            ))}
          </ol>
        </Container>
      </section>

      {/* Faculty & management */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our People"
            title="Management & Faculty"
            description="A dedicated team of educators and administrators committed to every child's growth."
          />
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {faculty.map((member) => (
              <StaggerItem key={member.name}>
                <div className="h-full rounded-card bg-white p-7 text-center shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-lift">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-4xl"
                  >
                    {member.emoji}
                  </span>
                  <h3 className="mt-4 font-heading font-semibold text-ink">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-secondary">{member.role}</p>
                  <p className="mt-2 text-sm text-muted">{member.note}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-surface py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="School Values"
            title="The Pioneer Way"
            description="Six values woven into assemblies, classrooms, and playgrounds every day."
          />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <StaggerItem key={value.name}>
                <div className="flex h-full gap-4 rounded-card bg-white p-6 shadow-soft">
                  <span aria-hidden="true" className="text-3xl">{value.emoji}</span>
                  <div>
                    <h3 className="font-heading font-semibold text-ink">{value.name}</h3>
                    <p className="mt-1 text-sm text-muted">{value.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Recognition & disclosure */}
      <section className="py-16 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <div className="h-full rounded-card border border-primary-100 bg-white p-10 shadow-soft">
              <h2 className="text-2xl font-bold text-ink">Recognition</h2>
              <p className="mt-4 text-muted">
                Pioneer Public School is recognised by the Department of Public
                Instruction, Government of Karnataka, and follows the Karnataka State
                Board syllabus with English as the medium of instruction.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="h-full rounded-card border border-primary-100 bg-white p-10 shadow-soft">
              <h2 className="text-2xl font-bold text-ink">Mandatory Disclosure</h2>
              <p className="mt-4 text-muted">
                Statutory documents — recognition certificates, building safety, fire
                safety, and staff details — are available for inspection at the school
                office and will be published in the Parents section as downloads.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-800 to-primary py-16 text-white">
        <Container className="text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold">Come See Pioneer for Yourself</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              The best way to know a school is to walk through it. Book a campus tour today.
            </p>
            <div className="mt-8">
              <ButtonLink href="/admissions#visit" variant="accent" size="lg">
                Book a Campus Tour
              </ButtonLink>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
