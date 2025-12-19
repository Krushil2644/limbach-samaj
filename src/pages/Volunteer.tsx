import SEOHead from "@/components/SEOHead";

export default function Volunteer() {
  return (
    <>
      <SEOHead
        title="Volunteer"
        description="Volunteer with Limbach Samaj to support our community."
        path="/volunteer"
      />
      <main className="section-spacing">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Volunteer</h1>
          <p className="text-lg text-muted-foreground">
            Thanks for your interest in volunteering with Limbach Samaj.
            Opportunities and sign-up details will be available here soon.
          </p>
        </div>
      </main>
    </>
  );
}
