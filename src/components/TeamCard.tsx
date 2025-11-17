import { Card, CardContent } from "@/components/ui/card";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export default function TeamCard({ name, role, bio, image }: TeamCardProps) {
  return (
    <Card className="overflow-hidden hover-lift border-border bg-card">
      <CardContent className="p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative h-32 w-32 rounded-full overflow-hidden bg-muted ring-4 ring-primary/10">
            <img
              src={image}
              alt={`${name} - ${role}`}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={(e) => {
                // Fallback to a placeholder if image fails to load
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'%3E%3Crect fill='%23f3f4f6' width='128' height='128'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='48' fill='%239ca3af'%3E" + name.charAt(0) + "%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        </div>
        <h3 className="text-xl font-heading font-semibold mb-2 text-foreground">{name}</h3>
        <p className="text-sm font-semibold text-primary mb-4">{role}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{bio}</p>
      </CardContent>
    </Card>
  );
}
