import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LucideIcon, Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Heading from "@/components/common/landing/Heading";
import CommonButton from "@/components/common/CommonButton";

export interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

export const contactData: ContactItem[] = [
  {
    icon: Phone,
    label: "Phone (IN)",
    value: "+91 97154 3274799",
    href: "tel:+91971543274799",
  },
  {
    icon: Mail,
    label: "Email",
    value: "slotfloe.booking@gmail.com",
    href: "mailto: slotflow.booking0@gmail.com",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Kerala, India",
  },
];

const Contact = () => {

  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: send to your API / form service
    setTimeout(() => setLoading(false), 800);
  }

  return (
     <section id="contact"  className="py-32 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 md:px-0">

        <Heading 
            heading="Connect With Us"
            headingDescription=""
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden py-16">

          <Card className="h-full" data-aos="fade-right" >
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>We’d love to hear from you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {contactData.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <InfoRow
                    key={idx}
                    icon={<Icon className="size-5" />}
                    label={item.label}
                    value={item.value}
                    href={item.href}
                  />
                );
              })}
            </CardContent>
          </Card>


          <Card className="h-full" data-aos="fade-left" >
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>We typically respond within one business day.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field id="firstName" label="First name">
                    <Input id="firstName" name="firstName" required />
                  </Field>
                  <Field id="lastName" label="Last name">
                    <Input id="lastName" name="lastName" required />
                  </Field>
                </div>

                <Field id="email" label="Email">
                  <Input id="email" type="email" name="email" required />
                </Field>

                <Field id="phone" label="Phone (optional)">
                  <Input id="phone" name="phone" />
                </Field>

                <Field id="subject" label="Subject">
                  <Input id="subject" name="subject" required />
                </Field>

                <Field id="message" label="Message">
                  <Textarea id="message" name="message" rows={5} required />
                </Field>

                <CommonButton text={loading ? "Sending..." : "Send message"}  type="submit" className="w-full sm:w-auto cursor-pointer"  />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Contact;

function Field({ id, label, children, className }: { id: string; label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

function InfoRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-3">
      <div className="rounded-md border p-2">{icon}</div>
      <div>
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:opacity-90 transition-opacity">{content}</a>
  ) : (
    content
  );
}
