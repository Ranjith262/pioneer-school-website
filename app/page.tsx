import Link from "next/link";
import { site } from "@/content/site";
import { facilities } from "@/content/facilities";
import { galleryItems } from "@/content/gallery";
import { events, formatDate, news } from "@/content/news";
import { galleryImages, img } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Photo } from "@/components/ui/Photo";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";
import { CountUp } from "@/components/motion/CountUp";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { ParallaxBand } from "@/components/home/ParallaxBand";
import { Testimonials } from "@/components/home/Testimonials";
import { AchievementsSlider } from "@/components/home/AchievementsSlider";
import { AcademicCarousel } from "@/components/home/AcademicCarousel";
import { ValuesJourney } from "@/components/home/ValuesJourney";

const promises = [
  {
    number: "01",
    title: "Academic Excellence",
    description:
      "Concept-first teaching that turns marks into a by-product of genuine understanding — crowned by a 100% SSLC pass record.",
    icon: "📚",
    back: "Every child learns differently. We teach that way — visual, kinesthetic, auditory. Results follow understanding.",
  },
  {
    number: "02",
    title: "Mentors, Not Just Teachers",
    description:
      "Twenty-plus educators who know every child by name, notice every quiet talent, and never let a question go unanswered.",
    icon: "🧑‍🏫",
    back: "Parent-teacher meetings aren't formalities here. They're conversations about potential, not just percentages.",
  },
  {
    number: "03",
    title: "A Safe, Joyful Campus",
    description:
      "Supervised spaces, safe transport, and a culture of kindness — so the only thing children bring home is enthusiasm.",
    icon: "🏫",
    back: "GPS-tracked buses, CCTV, trained staff at every gate. Safety isn't a feature — it's a foundation.",
  },
  {
    number: "04",
    title: "The Whole Child",
    description:
      "Yoga at sunrise, cricket at noon, music by dusk. Marks matter; character, curiosity, and courage matter more.",
    icon: "🌟",
    back: "Sports, arts, community service, leadership roles — the parts of school that children remember at fifty.",
  },
];

const stats = [
  { label: "Founded with a dream", end: 2015, suffix: "" },
  { label: "Young pioneers", end: 300, suffix: "+" },
  { label: "Dedicated educators", end: 20, suffix: "+" },
  { label: "Grades, one journey", end: 14, suffix: "" },
];

export default function HomePage() {
  const latestNews = news.slice(0, 3);
  const upcomingEvents = events.slice(0, 4);
  const studentLife = galleryItems.slice(0, 6);

  return (
    <>
      {/* ── Cinematic hero ───────────────────────────────────── */}
      <Hero />

      {/* ── Values ticker ────────────────────────────────────── */}
      <Marquee />

      {/* ── Welcome — editorial statement ────────────────────── */}
      <section className="py-24 sm:py-32">
        <Container className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <FadeIn direction="right">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
                Namaste &amp; Welcome
              </p>
              <h2 className="mt-5 font-heading text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Some schools teach lessons.{" "}
                <span className="font-display italic font-medium text-primary">
                  We shape childhoods.
                </span>
              </h2>
              <div className="mt-7 space-y-5 text-lg leading-relaxed text-muted">
                <p>
                  Since {site.established}, Pioneer Public School has stood for a simple
                  belief: the children of Koppal deserve an education as ambitious as
                  any in the world — and as rooted as the banyan tree in our courtyard.
                </p>
                <p>
                  Here, a child learns to solve equations and touch elders&apos; feet, to
                  code and to sing, to compete fiercely and to share freely. That is
                  the Pioneer way.
                </p>
              </div>
              <p className="mt-7 font-display text-xl italic text-ink">
                &ldquo;Every child carries a spark. Our job is to give it wind.&rdquo;
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-muted">
                — The Principal
              </p>
              <ButtonLink href="/about" variant="ghost" className="mt-8">
                Our Story <span className="arrow-bounce">→</span>
              </ButtonLink>
            </FadeIn>
          </div>

          {/* Layered photographs */}
          <div className="relative lg:col-span-6">
            <FadeIn direction="left">
              <Photo
                src={img.indianClassroom.src}
                alt={img.indianClassroom.alt}
                className="aspect-[4/3] w-[88%] rounded-card shadow-lift"
                sizes="(max-width: 1024px) 88vw, 44vw"
              />
            </FadeIn>
            <FadeIn direction="up" delay={0.2} className="absolute -bottom-12 right-0 w-[52%]">
              <Photo
                src={img.girlReading.src}
                alt={img.girlReading.alt}
                className="aspect-[3/4] rounded-card border-8 border-white shadow-lift"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </FadeIn>
            <div
              aria-hidden="true"
              className="absolute -left-6 -top-6 -z-10 h-40 w-40 animate-float rounded-card bg-accent/20"
            />
            <div
              aria-hidden="true"
              className="absolute -right-4 top-1/2 -z-10 h-24 w-24 animate-float rounded-full bg-secondary/15 [animation-delay:2s]"
            />
          </div>
        </Container>
      </section>

      {/* ── Wavy divider into Promise section ────────────────── */}
      <SectionDivider variant="wave" className="text-surface" />

      {/* ── The Pioneer Promise ──────────────────────────────── */}
      <section className="bg-surface py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="The Pioneer Promise"
            title="Four promises. Zero fine print."
            description="What every family can hold us to, from the first bell of Nursery to the last exam of Class 10."
          />
          <Stagger className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((promise) => (
              <StaggerItem key={promise.number}>
                <div className="group relative h-full overflow-hidden rounded-card border border-primary-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-lift">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-accent/0 via-accent/0 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <p className="font-display text-5xl font-medium text-primary/20 transition-colors duration-300 group-hover:text-accent">
                        {promise.number}
                      </p>
                      <span
                        aria-hidden="true"
                        className="text-3xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                      >
                        {promise.icon}
                      </span>
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                      {promise.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {promise.description}
                    </p>
                    {/* Reveal on hover */}
                    <div className="mt-4 max-h-0 overflow-hidden text-xs italic leading-relaxed text-primary/80 transition-all duration-500 group-hover:max-h-24">
                      {promise.back}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <SectionDivider variant="slope" flip className="text-surface" />

      {/* ── Statistics ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink py-20 text-white">
        {/* Decorative geometric pattern */}
        <div aria-hidden="true" className="absolute inset-0 opacity-5">
          <div className="absolute left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border border-white" />
          <div className="absolute right-1/4 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full border border-white" />
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white" />
        </div>
        <Container className="relative">
          <dl className="grid grid-cols-2 gap-12 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="group">
                <dd className="font-display text-5xl font-medium text-accent transition-all duration-300 group-hover:scale-110 sm:text-6xl">
                  <CountUp end={stat.end} suffix={stat.suffix} />
                </dd>
                <dt className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-white/70">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── Academic programs — Interactive Carousel ─────────── */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Academics"
            title="One journey, six chapters."
            description="From finger paints to board exams — each stage designed to hand the child confidently to the next."
          />
          <FadeIn>
            <AcademicCarousel />
          </FadeIn>
        </Container>
      </section>

      {/* ── India parallax statement ─────────────────────────── */}
      <ParallaxBand image={img.holiColours}>
        <Container className="py-32 text-center sm:py-44">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
              The Pioneer Spirit
            </p>
            <h2 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-medium italic leading-tight sm:text-6xl">
              Rooted in India.
              <br />
              Ready for the world.
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg text-white/85">
              Shlokas and science. Kannada and code. Festivals and physics. Our
              children grow up fluent in both their heritage and their future.
            </p>
          </FadeIn>
        </Container>
      </ParallaxBand>

      {/* ── Indian Values — Interactive ──────────────────────── */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Indian Values"
            title="Six pillars. One culture."
            description="Ancient wisdom woven into modern education — tap each value to discover how it lives at Pioneer."
          />
          <FadeIn>
            <ValuesJourney />
          </FadeIn>
        </Container>
      </section>

      <SectionDivider variant="curve" className="text-surface" />

      {/* ── Facilities ───────────────────────────────────────── */}
      <section className="bg-surface py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Our Campus"
            title="Built for curious minds."
            description="Every corner of our campus is a classroom in disguise."
          />
          <Stagger className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {facilities.map((facility) => (
              <StaggerItem key={facility.name}>
                <div className="group h-full rounded-card border border-primary-100 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-glow">
                  <span
                    aria-hidden="true"
                    className="inline-block text-4xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6"
                  >
                    {facility.emoji}
                  </span>
                  <h3 className="mt-3 font-heading font-semibold text-ink transition-colors duration-300 group-hover:text-primary">
                    {facility.name}
                  </h3>
                  <p className="mt-2 hidden text-sm text-muted sm:block">
                    {facility.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <SectionDivider variant="wave" flip className="text-surface" />

      {/* ── Student life mosaic ──────────────────────────────── */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Student Life"
            title="Life between the bells."
            description="Sports days and science fairs, Holi colours and heritage trips — the moments children remember at fifty."
          />
          <Stagger className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {studentLife.map((item, index) => {
              const photo = galleryImages[item.id] ?? img.kidsOutdoors;
              const tall = index === 0 || index === 3;
              return (
                <StaggerItem
                  key={item.id}
                  className={tall ? "row-span-2" : undefined}
                >
                  <div className="group relative h-full overflow-hidden rounded-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <Photo
                      src={photo.src}
                      alt={photo.alt}
                      className={`h-full w-full ${tall ? "min-h-[420px]" : "aspect-[4/3]"}`}
                      sizes="(max-width: 640px) 50vw, 25vw"
                      imgClassName="transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay that slides up on hover */}
                    <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-5 pt-20 transition-all duration-300">
                      <p className="font-heading text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="text-xs text-white/70">
                        {item.category} · {item.year}
                      </p>
                    </div>
                    {/* Hover reveal: extra info */}
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <span className="rounded-full border-2 border-white px-5 py-2 text-sm font-semibold text-white">
                        View Photo
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
          <FadeIn className="mt-12 text-center">
            <ButtonLink href="/gallery" variant="ghost">
              View the Full Gallery <span className="arrow-bounce">→</span>
            </ButtonLink>
          </FadeIn>
        </Container>
      </section>

      {/* ── Achievements ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent-50 via-white to-primary-50 py-24 sm:py-32">
        {/* Subtle decorative element */}
        <div aria-hidden="true" className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div aria-hidden="true" className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Achievements"
            title="Small town. Big trophies."
            description="Our students compete with the best — and more often than not, come home smiling."
          />
          <FadeIn>
            <AchievementsSlider />
          </FadeIn>
        </Container>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Voices of Pioneer"
            title="Don&rsquo;t take our word for it."
          />
          <FadeIn>
            <Testimonials />
          </FadeIn>
        </Container>
      </section>

      <SectionDivider variant="slope" className="text-surface" />

      {/* ── Latest news & upcoming events ────────────────────── */}
      <section className="bg-surface py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
                Newsroom
              </p>
              <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">Latest News</h2>
            </FadeIn>
            <div className="mt-8 space-y-5">
              {latestNews.map((item, i) => (
                <FadeIn key={item.slug} delay={i * 0.08}>
                  <Link
                    href={`/news/${item.slug}`}
                    className="group block rounded-card border border-primary-100 bg-white p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lift"
                  >
                    <div className="flex items-center gap-3 text-xs">
                      <span className="rounded-full bg-primary-50 px-3 py-1 font-semibold text-primary">
                        {item.category}
                      </span>
                      <time dateTime={item.date} className="text-muted">
                        {formatDate(item.date)}
                      </time>
                    </div>
                    <h3 className="mt-3 font-heading text-lg font-semibold text-ink group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{item.excerpt}</p>
                  </Link>
                </FadeIn>
              ))}
            </div>
            <FadeIn className="mt-8">
              <ButtonLink href="/news" variant="ghost">
                All News <span className="arrow-bounce">→</span>
              </ButtonLink>
            </FadeIn>
          </div>

          <div className="lg:col-span-2">
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
                Mark the Date
              </p>
              <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
                Upcoming Events
              </h2>
            </FadeIn>
            <div className="mt-8 space-y-5">
              {upcomingEvents.map((event, i) => {
                const date = new Date(event.date + "T00:00:00");
                return (
                  <FadeIn key={event.title} delay={i * 0.08}>
                    <div className="flex gap-5 rounded-card border border-primary-100 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-soft">
                      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-secondary-700 text-white shadow-soft">
                        <span className="font-heading text-xl font-bold leading-none">
                          {date.getDate()}
                        </span>
                        <span className="mt-1 text-xs uppercase">
                          {date.toLocaleDateString("en-IN", { month: "short" })}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-ink">
                          {event.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted">
                          {event.time} · {event.location}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider variant="wave" flip className="text-surface" />

      {/* ── Admissions CTA ───────────────────────────────────── */}
      <ParallaxBand image={img.kidsWriting}>
        <Container className="py-28 text-center sm:py-36">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
              Admissions Open 2026–27
            </p>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl font-medium italic leading-tight sm:text-5xl">
              The best time to plant a tree was twenty years ago.
              <br />
              The best time to enrol is today.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">
              Seats are limited across Nursery to Class 10. Begin your child&apos;s
              Pioneer journey with a single click — or a single visit.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/admissions#apply" variant="accent" size="lg">
                Apply Now <span className="arrow-bounce">→</span>
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="lg">
                Talk to Us
              </ButtonLink>
            </div>
          </FadeIn>
        </Container>
      </ParallaxBand>
    </>
  );
}
