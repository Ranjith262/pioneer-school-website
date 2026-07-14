import Link from "next/link";
import { site } from "@/content/site";
import { facilities } from "@/content/facilities";
import { galleryItems } from "@/content/gallery";
import { events, news } from "@/content/news";
import { galleryImages, img } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Photo } from "@/components/ui/Photo";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";
import { CountUp } from "@/components/motion/CountUp";
import { TiltCard } from "@/components/motion/TiltCard";
import { StatsOrbit3D } from "@/components/three/StatsOrbit3D";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { ParallaxBand } from "@/components/home/ParallaxBand";
import { Testimonials } from "@/components/home/Testimonials";
import { AchievementsSlider } from "@/components/home/AchievementsSlider";
import { AcademicCarousel } from "@/components/home/AcademicCarousel";
import { ValuesJourney } from "@/components/home/ValuesJourney";
import { T } from "@/components/i18n/T";
import { LocalDate } from "@/components/i18n/LocalDate";
import { SiteIcon } from "@/components/ui/SiteIcon";

const promises = [
  {
    number: "01",
    title: "Academic Excellence",
    description:
      "Concept-first teaching that turns marks into a by-product of genuine understanding — crowned by a 100% SSLC pass record.",
    icon: "books",
    back: "Every child learns differently. We teach that way — visual, kinesthetic, auditory. Results follow understanding.",
  },
  {
    number: "02",
    title: "Mentors, Not Just Teachers",
    description:
      "Twenty-plus educators who know every child by name, notice every quiet talent, and never let a question go unanswered.",
    icon: "mentor",
    back: "Parent-teacher meetings aren't formalities here. They're conversations about potential, not just percentages.",
  },
  {
    number: "03",
    title: "A Safe, Joyful Campus",
    description:
      "Supervised spaces, safe transport, and a culture of kindness — so the only thing children bring home is enthusiasm.",
    icon: "campus",
    back: "GPS-tracked buses, CCTV, trained staff at every gate. Safety isn't a feature — it's a foundation.",
  },
  {
    number: "04",
    title: "The Whole Child",
    description:
      "Yoga at sunrise, cricket at noon, music by dusk. Marks matter; character, curiosity, and courage matter more.",
    icon: "star",
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
                <T k="home.welcome.eyebrow" />
              </p>
              <h2 className="mt-5 font-heading text-4xl font-bold leading-tight text-ink sm:text-5xl">
                <T k="home.welcome.titleA" />{" "}
                <span className="font-display italic font-medium text-primary">
                  <T k="home.welcome.titleB" />
                </span>
              </h2>
              <div className="mt-7 space-y-5 text-lg leading-relaxed text-muted">
                <p><T k="home.welcome.p1" /></p>
                <p><T k="home.welcome.p2" /></p>
              </div>
              <p className="mt-7 font-display text-xl italic text-ink">
                <T k="home.welcome.quote" />
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-muted">
                <T k="home.welcome.principal" />
              </p>
              <ButtonLink href="/about" variant="ghost" className="mt-8">
                <T k="home.welcome.ourStory" /> <span className="arrow-bounce">→</span>
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
            eyebrow={<T k="home.promise.eyebrow" />}
            title={<T k="home.promise.title" />}
            description={<T k="home.promise.description" />}
          />
          <Stagger className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((promise, promiseIndex) => (
              <StaggerItem key={promise.number} className="h-full">
                {/* 3D depth card: the card tilts toward the pointer while the
                    icon, heading, and copy float at different Z-depths. */}
                <TiltCard
                  maxTilt={9}
                  className="group relative h-full rounded-card border border-primary-100 bg-white p-7 shadow-soft transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-lift"
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-accent/0 via-accent/0 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative" style={{ transformStyle: "preserve-3d" }}>
                    <div
                      className="flex items-center justify-between"
                      style={{ transform: "translateZ(46px)", transformStyle: "preserve-3d" }}
                    >
                      <p className="font-display text-5xl font-medium text-primary/20 transition-colors duration-300 group-hover:text-accent">
                        {promise.number}
                      </p>
                      <SiteIcon
                        name={promise.icon}
                        className="h-8 w-8 text-primary transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3
                      className="mt-4 font-heading text-lg font-semibold text-ink"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      <T k={`home.promise.items.${promiseIndex}.title`} />
                    </h3>
                    <p
                      className="mt-3 text-sm leading-relaxed text-muted"
                      style={{ transform: "translateZ(16px)" }}
                    >
                      <T k={`home.promise.items.${promiseIndex}.description`} />
                    </p>
                    {/* Reveal on hover */}
                    <div
                      className="mt-4 max-h-0 overflow-hidden text-xs italic leading-relaxed text-primary/80 transition-all duration-500 group-hover:max-h-24"
                      style={{ transform: "translateZ(10px)" }}
                    >
                      <T k={`home.promise.items.${promiseIndex}.back`} />
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <SectionDivider variant="wave" flip className="text-surface" />

      {/* ── Statistics ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink py-20 text-white">
        {/* Decorative geometric pattern */}
        <div aria-hidden="true" className="absolute inset-0 opacity-5">
          <div className="absolute left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border border-white" />
          <div className="absolute right-1/4 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full border border-white" />
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white" />
        </div>
        {/* 3D armillary globe with orbiting satellites (desktop only) */}
        <StatsOrbit3D />
        <Container className="relative">
          <dl className="grid grid-cols-2 gap-12 text-center lg:grid-cols-4">
            {stats.map((stat, statIndex) => (
              <div key={stat.label} className="group">
                <dd className="font-display text-5xl font-medium text-accent transition-all duration-300 group-hover:scale-110 sm:text-6xl">
                  <CountUp end={stat.end} suffix={stat.suffix} />
                </dd>
                <dt className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-white/70">
                  <T k={`home.stats.${statIndex}`} />
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
            eyebrow={<T k="home.academics.eyebrow" />}
            title={<T k="home.academics.title" />}
            description={<T k="home.academics.description" />}
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
              <T k="home.spirit.eyebrow" />
            </p>
            <h2 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-medium italic leading-tight sm:text-6xl">
              <T k="home.spirit.title1" />
              <br />
              <T k="home.spirit.title2" />
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg text-white/85">
              <T k="home.spirit.description" />
            </p>
          </FadeIn>
        </Container>
      </ParallaxBand>

      {/* ── Indian Values — Interactive ──────────────────────── */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow={<T k="home.values.eyebrow" />}
            title={<T k="home.values.title" />}
            description={<T k="home.values.description" />}
          />
          <FadeIn>
            <ValuesJourney />
          </FadeIn>
        </Container>
      </section>

      <SectionDivider variant="wave" className="text-surface" />

      {/* ── Facilities ───────────────────────────────────────── */}
      <section className="bg-surface py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow={<T k="home.facilities.eyebrow" />}
            title={<T k="home.facilities.title" />}
            description={<T k="home.facilities.description" />}
          />
          <Stagger className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {facilities.map((facility, facilityIndex) => (
              <StaggerItem key={facility.name} className="h-full">
                <TiltCard
                  maxTilt={12}
                  className="group relative h-full rounded-card border border-primary-100 bg-white p-6 text-center transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-glow"
                >
                  <div style={{ transformStyle: "preserve-3d" }}>
                    <SiteIcon
                      name={facility.icon}
                      className="inline-block h-10 w-10 text-primary"
                    />
                    <h3
                      className="mt-3 font-heading font-semibold text-ink transition-colors duration-300 group-hover:text-primary"
                      style={{ transform: "translateZ(20px)" }}
                    >
                      <T k={`home.facilities.items.${facilityIndex}.name`} />
                    </h3>
                    <p className="mt-2 hidden text-sm text-muted sm:block">
                      <T k={`home.facilities.items.${facilityIndex}.description`} />
                    </p>
                  </div>
                </TiltCard>
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
            eyebrow={<T k="home.studentLife.eyebrow" />}
            title={<T k="home.studentLife.title" />}
            description={<T k="home.studentLife.description" />}
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
                        <T k={`content.gallery.${item.id}`} />
                      </p>
                      <p className="text-xs text-white/70">
                        <T k={`content.categories.${item.category}`} /> · {item.year}
                      </p>
                    </div>
                    {/* Hover reveal: extra info */}
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <span className="rounded-full border-2 border-white px-5 py-2 text-sm font-semibold text-white">
                        <T k="home.studentLife.viewPhoto" />
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
          <FadeIn className="mt-12 text-center">
            <ButtonLink href="/gallery" variant="ghost">
              <T k="home.studentLife.viewGallery" /> <span className="arrow-bounce">→</span>
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
            eyebrow={<T k="home.achievements.eyebrow" />}
            title={<T k="home.achievements.title" />}
            description={<T k="home.achievements.description" />}
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
            eyebrow={<T k="home.testimonials.eyebrow" />}
            title={<T k="home.testimonials.title" />}
          />
          <FadeIn>
            <Testimonials />
          </FadeIn>
        </Container>
      </section>

      <SectionDivider variant="wave" className="text-surface" />

      {/* ── Latest news & upcoming events ────────────────────── */}
      <section className="bg-surface py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
                <T k="home.news.eyebrow" />
              </p>
              <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl"><T k="home.news.title" /></h2>
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
                        <T k={`content.categories.${item.category}`} />
                      </span>
                      <time dateTime={item.date} className="text-muted">
                        <LocalDate iso={item.date} />
                      </time>
                    </div>
                    <h3 className="mt-3 font-heading text-lg font-semibold text-ink group-hover:text-primary">
                      <T k={`content.news.${item.slug}.title`} />
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      <T k={`content.news.${item.slug}.excerpt`} />
                    </p>
                  </Link>
                </FadeIn>
              ))}
            </div>
            <FadeIn className="mt-8">
              <ButtonLink href="/news" variant="ghost">
                <T k="home.news.allNews" /> <span className="arrow-bounce">→</span>
              </ButtonLink>
            </FadeIn>
          </div>

          <div className="lg:col-span-2">
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
                <T k="home.events.eyebrow" />
              </p>
              <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
                <T k="home.events.title" />
              </h2>
            </FadeIn>
            <div className="mt-8 space-y-5">
              {upcomingEvents.map((event, i) => {
                const date = new Date(event.date + "T00:00:00");
                const eventIndex = events.indexOf(event);
                return (
                  <FadeIn key={event.title} delay={i * 0.08}>
                    <div className="flex gap-5 rounded-card border border-primary-100 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-soft">
                      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-secondary-700 text-white shadow-soft">
                        <span className="font-heading text-xl font-bold leading-none">
                          {date.getDate()}
                        </span>
                        <span className="mt-1 text-xs uppercase">
                          <LocalDate iso={event.date} format="monthShort" />
                        </span>
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-ink">
                          <T k={`content.events.${eventIndex}.title`} />
                        </h3>
                        <p className="mt-1 text-sm text-muted">
                          <T k={`content.events.${eventIndex}.time`} /> ·{" "}
                          <T k={`content.events.${eventIndex}.location`} />
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
              <T k="home.cta.eyebrow" />
            </p>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl font-medium italic leading-tight sm:text-5xl">
              <T k="home.cta.title1" />
              <br />
              <T k="home.cta.title2" />
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">
              <T k="home.cta.description" />
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/admissions#apply" variant="accent" size="lg">
                <T k="chrome.applyNow" /> <span className="arrow-bounce">→</span>
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="lg">
                <T k="home.cta.talkToUs" />
              </ButtonLink>
            </div>
          </FadeIn>
        </Container>
      </ParallaxBand>
    </>
  );
}
