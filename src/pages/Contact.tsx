import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowRight, Send } from "lucide-react";
import { toast } from "sonner";
import { siteConfig } from "@/site-config";

/**
 * Mirrors api/contact/index.ts. Phone and address are optional there, and
 * the subject minimum is 5 — an earlier schema required both fields and
 * allowed 3-character subjects, so the form demanded a home address it did
 * not need and let submissions through that the server then rejected.
 */
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
    .max(20, { message: "Phone number is too long" })
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .trim()
    .max(200, { message: "Address must be less than 200 characters" })
    .optional()
    .or(z.literal("")),

  subject: z
    .string()
    .trim()
    .min(5, { message: "Subject must be at least 5 characters" })
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        toast.success(
          result.message ||
            "Thank you for your message. We'll get back to you soon.",
        );
        form.reset();
      } else if (result.details && Array.isArray(result.details)) {
        result.details.forEach((error: string) => toast.error(error));
      } else {
        toast.error(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Us"
        description="Get in touch with Limbach Samaj of Canada for event registration, sponsorship, or general enquiries about our community organization."
        path="/contact"
      />

      <main>
        <Hero
          title="Get in touch"
          subtitle="Questions, suggestions, or anything you'd like to ask the Samaj."
          compact
        />

        <section className="pb-20 pt-4 md:pb-28 md:pt-6">
          <div className="container-custom">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Ways to reach us */}
              <div className="lg:col-span-4">
                <h2 className="reveal display-md font-heading font-bold text-foreground">
                  Reach us directly
                </h2>

                <dl className="reveal mt-8 space-y-7">
                  <div>
                    <dt className="text-sm text-muted-foreground">Email</dt>
                    <dd className="mt-1.5">
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="link-underline break-words text-lg font-medium text-foreground"
                      >
                        {siteConfig.email}
                      </a>
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm text-muted-foreground">Based in</dt>
                    <dd className="mt-1.5 text-lg font-medium text-foreground">
                      {siteConfig.location}
                    </dd>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Events are held across the Greater Toronto Area.
                    </p>
                  </div>
                </dl>

                {/* Most enquiries are event registrations, which do not go
                    through this form at all — point people at the real path
                    before they write a message that only gets a reply
                    telling them to e-transfer. */}
                <div className="reveal mt-10 border-t border-border pt-7">
                  <h3 className="font-heading text-base font-bold text-foreground">
                    Registering for an event?
                  </h3>
                  <p className="measure-tight mt-2 text-base leading-relaxed text-muted-foreground">
                    Registration is by e-transfer, followed by a WhatsApp
                    message to the event contact. The steps and deadlines for
                    each event are on the events page.
                  </p>
                  <Link
                    to="/events"
                    className="link-underline group mt-4 inline-flex items-center gap-2 text-base font-semibold text-primary-ink"
                  >
                    See upcoming events
                    <ArrowRight className="nudge h-4 w-4" aria-hidden />
                  </Link>
                </div>

                <div className="reveal mt-8 border-t border-border pt-7">
                  <h3 className="font-heading text-base font-bold text-foreground">
                    Already answered?
                  </h3>
                  <p className="measure-tight mt-2 text-base leading-relaxed text-muted-foreground">
                    Ticket prices, deadlines, sponsorship and donations are
                    covered on the FAQ.
                  </p>
                  <Link
                    to="/faq"
                    className="link-underline group mt-4 inline-flex items-center gap-2 text-base font-semibold text-primary-ink"
                  >
                    Read the FAQ
                    <ArrowRight className="nudge h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>

              {/* Message form */}
              <div className="lg:col-span-8">
                <div className="reveal rounded-2xl border border-border bg-card p-6 md:p-9">
                  <h2 className="display-md font-heading font-bold text-foreground">
                    Send a message
                  </h2>
                  <p className="measure mt-3 text-base text-muted-foreground">
                    We typically reply within a couple of days.
                  </p>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="mt-8 space-y-6"
                      noValidate
                    >
                      <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your full name"
                                  autoComplete="name"
                                  className="h-12"
                                  {...field}
                                />
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
                                <Input
                                  type="email"
                                  inputMode="email"
                                  autoComplete="email"
                                  placeholder="you@example.com"
                                  className="h-12"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  inputMode="tel"
                                  autoComplete="tel"
                                  placeholder="647-555-0123"
                                  className="h-12"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>Optional</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  autoComplete="address-level2"
                                  placeholder="Mississauga, ON"
                                  className="h-12"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>Optional</FormDescription>
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
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="What is this regarding?"
                                className="h-12"
                                {...field}
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
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="How can we help?"
                                className="min-h-[11rem] resize-y"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="press group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                      >
                        {isSubmitting ? (
                          <>
                            Sending
                            <span
                              aria-hidden
                              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                            />
                          </>
                        ) : (
                          <>
                            Send message
                            <Send className="nudge h-4 w-4" aria-hidden />
                          </>
                        )}
                      </button>

                      {/* Announced to screen readers; the toast is visual. */}
                      <p aria-live="polite" className="sr-only">
                        {isSubmitting ? "Sending your message" : ""}
                      </p>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
