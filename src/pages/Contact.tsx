import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),

  phone: z.string()
    .trim()
    .min(7, { message: "Phone number must be at least 7 digits" })
    .max(20, { message: "Phone number is too long" })
    .optional(),

  subject: z.string().trim().min(3, { message: "Subject must be at least 3 characters" }).max(200),
  message: z.string().trim().min(10, { message: "Message must be at least 10 characters" }).max(2000),
});


type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission (frontend only for now)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Form submitted:", data);
    toast.success("Thank you for your message! We'll get back to you soon.");
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <>
      <SEOHead
        title="Contact Us"
        description="Get in touch with Limbach Samaj. Contact us for membership inquiries, event information, or general questions about our community organization."
        path="/contact"
      />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-primary text-white py-20">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              We'd love to hear from you. Reach out with questions, suggestions, or inquiries
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-spacing">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-heading font-bold mb-6">Send Us a Message</h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* NOTE: Phone Number field added on Feb-2025 for improved contact info */}
<FormField
  control={form.control}
  name="phone"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Phone Number (optional)</FormLabel>
      <FormControl>
        <Input
          type="tel"
          placeholder="123-456-7890"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="What is this regarding?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-heading font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  You can also reach us through the following channels:
                </p>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                            <Mail className="h-6 w-6" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-heading font-semibold mb-2">Email</h3>
                          <a href="mailto:info@limbachsamaj.ca" className="text-primary hover:underline">
                            info@limbachsamaj.ca
                          </a>
                          <p className="text-sm text-muted-foreground mt-1">
                            We typically respond within 24-48 hours
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 text-secondary">
                            <Phone className="h-6 w-6" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-heading font-semibold mb-2">Phone</h3>
                          <a href="tel:+14165550123" className="text-primary hover:underline">
                            +1 (416) 555-0123
                          </a>
                          <p className="text-sm text-muted-foreground mt-1">
                            Monday - Friday, 9:00 AM - 5:00 PM EST
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent">
                            <MapPin className="h-6 w-6" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-heading font-semibold mb-2">Location</h3>
                          <p className="text-muted-foreground">
                            Serving Limbach families and community members across Canada
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>

                <div className="mt-8 p-6 bg-muted/50 rounded-lg">
                  <h3 className="font-heading font-semibold mb-3">Office Hours</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 5:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday - Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Limbach Samaj",
          "url": "https://limbachsamaj.ca",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-416-555-0123",
            "contactType": "Customer Service",
            "email": "info@limbachsamaj.ca",
            "areaServed": "CA",
            "availableLanguage": "English"
          }
        })}
      </script>
    </>
  );
}
