import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDate, getNewsItem, news } from "@/content/news";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FadeIn } from "@/components/motion/FadeIn";
import { T } from "@/components/i18n/T";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsItem(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: `/news/${item.slug}` },
    openGraph: {
      type: "article",
      title: item.title,
      description: item.excerpt,
      publishedTime: item.date,
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getNewsItem(slug);
  if (!item) notFound();

  const related = news.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-14 sm:py-20">
        <Container>
          <Breadcrumbs
            items={[
              { label: <T k="pages.news.crumb" />, href: "/news" },
              { label: <T k={`content.news.${item.slug}.title`} /> },
            ]}
          />
          <FadeIn>
            <div className="mt-6 flex items-center gap-3 text-sm">
              <span className="rounded-full bg-primary px-3.5 py-1 text-xs font-semibold text-white">
                <T k={`content.categories.${item.category}`} />
              </span>
              <time dateTime={item.date} className="text-muted">
                {formatDate(item.date)}
              </time>
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold text-ink sm:text-4xl">
              <T k={`content.news.${item.slug}.title`} />
            </h1>
          </FadeIn>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <article className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-muted">
              {item.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </article>
          </FadeIn>

          {/* Related news */}
          <div className="mx-auto mt-16 max-w-3xl border-t border-primary-100 pt-10">
            <h2 className="text-xl font-bold text-ink">
              <T k="pages.newsDetail.moreNews" />
            </h2>
            <ul className="mt-5 space-y-4">
              {related.map((relatedItem) => (
                <li key={relatedItem.slug}>
                  <Link
                    href={`/news/${relatedItem.slug}`}
                    className="group flex items-baseline justify-between gap-4 rounded-xl px-2 py-1 hover:bg-surface"
                  >
                    <span className="font-medium text-ink group-hover:text-primary">
                      <T k={`content.news.${relatedItem.slug}.title`} />
                    </span>
                    <time dateTime={relatedItem.date} className="shrink-0 text-sm text-muted">
                      {formatDate(relatedItem.date)}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
