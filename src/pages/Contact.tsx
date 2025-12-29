import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { siteConfig } from '@/site-config';

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),

  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),

  phone: z
    .string()
    .trim()
    .min(7, { message: "Phone number must be at least 7 digits" })
    .max(20, { message: "Phone number is too long" }),

  address: z
    .string()
    .trim()
    .min(5, { message: "Address must be at least 5 characters" })
    .max(200, { message: "Address must be less than 200 characters" }),

  subject: z
    .string()
    .trim()
    .min(3, { message: "Subject must be at least 3 characters" })
    .max(200, { message: "Subject must be less than 200 characters" }),

  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message must be less than 2000 characters" }),
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
      address: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phoneNumber: data.phone, // API expects phoneNumber
          address: data.address,
          subject: data.subject,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        toast.success(result.message || "Thank you for your message! We'll get back to you soon.");
        form.reset();
      } else {
        // Handle validation errors
        if (result.details && Array.isArray(result.details)) {
          result.details.forEach((error: string) => {
            toast.error(error);
          });
        } else {
          toast.error(result.error || "Failed to send message. Please try again.");
        }
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
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
        <Hero
          title="Get In Touch"
          subtitle="We'd love to hear from you. Reach out with questions, suggestions, or inquiries about our community."
          compact
        />

        {/* Contact Section */}
        <section className="relative section-spacing overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

          <div className="container-custom relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                {/* Contact Info Sidebar */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Section Header */}
                  <div className="mb-8">
                    <div className="inline-block mb-4">
                      <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">
                        Contact Info
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                      Let's Connect
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Have questions or want to learn more about our community? We're here to help.
                    </p>
                  </div>

                  {/* Contact Cards */}
                  <div className="space-y-4">
                    {/* Email Card */}
                    <div className="group relative bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Mail className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-muted-foreground mb-1">Email Us</h3>
                          <a
                            href={`mailto:${siteConfig.email}`}
                            className="text-base font-medium text-foreground hover:text-primary transition-colors"
                          >
                            {siteConfig.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Phone Card */}
                    <div className="group relative bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 p-6 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Phone className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-muted-foreground mb-1">Call Us</h3>
                          <p className="text-base font-medium text-foreground">
                            Available via email
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Location Card */}
                    <div className="group relative bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 p-6 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-muted-foreground mb-1">Location</h3>
                          <p className="text-base font-medium text-foreground">
                            Canada-wide community
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="relative bg-primary/5 border border-primary/20 rounded-2xl p-6 mt-8">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-foreground">Response Time:</span> We typically respond to inquiries within 24-48 hours during business days.
                    </p>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-3">
                  <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 p-8 md:p-10 lg:p-12 shadow-xl">
                    {/* Decorative gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50 rounded-3xl" />

                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent rounded-t-3xl" />

                    <div className="relative z-10">
                      <div className="mb-8">
                        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3">
                          Send Us a Message
                        </h3>
                        <p className="text-base text-muted-foreground">
                          Fill out the form below and we'll get back to you as soon as possible.
                        </p>
                      </div>

                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your full name" {...field} className="h-12" />
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
                                  <FormLabel>Email *</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="email"
                                      placeholder="your.email@example.com"
                                      {...field}
                                      className="h-12"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number *</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="tel"
                                      placeholder="437-123-5555"
                                      {...field}
                                      className="h-12"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Address *</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      placeholder="Enter your full address"
                                      {...field}
                                      className="h-12"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subject *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="What is this regarding?"
                                    {...field}
                                    className="h-12"
                                  />
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
                                <FormLabel>Message *</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Your message..."
                                    className="min-h-[180px] resize-none"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button
                            type="submit"
                            size="lg"
                            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <span className="mr-2">Sending...</span>
                                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              </>
                            ) : (
                              <>
                                Send Message
                                <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                              </>
                            )}
                          </Button>
                        </form>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Structured Data – email only */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Limbach Samaj",
          url: "https://limbachsamaj.ca",
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "Customer Service",
            email: "info@limbachsamaj.ca",
            areaServed: "CA",
            availableLanguage: "English",
          },
        })}
      </script>
    </>
  );
}
