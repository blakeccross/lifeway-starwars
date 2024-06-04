import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { parseIdFromString } from "@/lib/utils";

async function getFilmInfo(id: string) {
  const res = await fetch(`https://swapi.dev/api/films/${id}`);
  return res.json();
}

export default async function FilmInfo({ id }: { id: string }) {
  const filmsData: Film = await getFilmInfo(id);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{filmsData.title}</CardTitle>
        <CardDescription>{filmsData.release_date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Directed by: </strong>
          {filmsData.director}
        </p>
      </CardContent>
    </Card>
  );
}
