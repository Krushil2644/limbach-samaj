import SEOHead from "@/components/SEOHead";
import NewsCard from "@/components/NewsCard";
import newsData from "@/content/news.json";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { siteConfig } from '@/site-config';

export default function News() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!siteConfig.navLinks.news.visible) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <SEOHead
        title="News & Announcements"
        description="Stay updated with the latest news, announcements, and updates from Limbach Samaj. Read about community initiatives, upcoming events, and organizational news."
        path="/news"
      />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-primary text-white py-20">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              News & Announcements
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Stay informed about community updates, initiatives, and important announcements
            </p>
          </div>
        </section>

        {/* News Grid */}
        <section className="section-spacing">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {newsData.map((news) => (
                <NewsCard key={news.id} {...news} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="section-spacing bg-muted/30">
          <div className="container-custom max-w-3xl text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Stay Connected
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Want to receive the latest news and updates directly? We're working on a newsletter
              subscription system to keep our community informed.
            </p>
            <p className="text-muted-foreground mb-8">
              In the meantime, check back here regularly for the latest announcements, or follow us
              on social media to stay updated on community news and events.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
