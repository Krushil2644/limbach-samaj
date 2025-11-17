import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  upcoming: boolean;
}

export default function EventCard({ title, date, location, description, imageUrl, upcoming }: EventCardProps) {
  const formattedDate = format(new Date(date), "MMMM dd, yyyy");

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant={upcoming ? "default" : "secondary"}>
            {upcoming ? "Upcoming" : "Past Event"}
          </Badge>
        </div>
        <h3 className="text-xl font-heading font-semibold line-clamp-2">{title}</h3>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4 text-primary" />
          {formattedDate}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4 text-primary" />
          {location}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter>
        {upcoming && (
          <p className="text-xs text-muted-foreground">
            More details coming soon
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
