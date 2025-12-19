import SEOHead from "@/components/SEOHead";

export default function Sponsorship() {
  return (
    <>
      <SEOHead
        title="Sponsorship"
        description="Partner with Limbach Samaj through sponsorship."
        path="/sponsorship"
      />
      <main className="section-spacing">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Sponsorship</h1>
          <p className="text-lg text-muted-foreground">
            Thanks for your interest in sponsoring Limbach Samaj. Sponsorship
            details will be available here soon.
          </p>
        </div>
      </main>
    </>
  );
}
