import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";

interface NewsCardProps {
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export default function NewsCard({ title, date, excerpt, content }: NewsCardProps) {
  const formattedDate = format(new Date(date), "MMMM dd, yyyy");

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Calendar className="mr-2 h-4 w-4 text-primary" />
          {formattedDate}
        </div>
        <h3 className="text-xl font-heading font-semibold">{title}</h3>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground">{excerpt}</p>
        <p className="text-sm text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );
}
