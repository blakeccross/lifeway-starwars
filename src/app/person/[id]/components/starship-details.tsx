import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { parseIdFromString } from "@/lib/utils";

async function getStarShipInfo(id: string) {
  const res = await fetch(`https://swapi.dev/api/starships/${id}`);
  return res.json();
}

export default async function StarshipInfo({ id }: { id: string }) {
  const starshipData: StarShip = await getStarShipInfo(id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{starshipData.name}</CardTitle>
        <CardDescription>{starshipData.model}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Hyperdrive Rating: </strong>
          {starshipData.hyperdrive_rating}
        </p>
        <p>
          <strong># of Passengers: </strong>
          {starshipData.passengers}
        </p>
      </CardContent>
    </Card>
  );
}
