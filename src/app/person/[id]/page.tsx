import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { parseIdFromString } from "@/lib/utils";
import FilmInfo from "./components/film-details";
import StarshipInfo from "./components/starship-details";
import Image from "next/image";
import BackgroundImage from "../../../../public/starwars.jpeg";

async function getProfile(id: string) {
  const res = await fetch(`https:/swapi.dev/api/people/${id}`);
  return res.json();
}

async function getSpeciesInfo(id: string) {
  const res = await fetch(`https:/swapi.dev/api/species/${id}`);
  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const profileData: Profile = await getProfile(params.id);

  async function SpeciesInfo({ id }: { id: string | null }) {
    if (id === null)
      return (
        <Card>
          <CardHeader>
            <CardTitle>Species</CardTitle>
          </CardHeader>
          <CardContent>No info available on this species</CardContent>
        </Card>
      );
    else {
      const speciesData: Species = await getSpeciesInfo(id);
      return (
        <Card>
          <CardHeader>
            <CardTitle>Species</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Name: </strong>
              {speciesData.name}
            </p>
            <p>
              <strong>Classification: </strong>
              {speciesData.classification}
            </p>
            <p>
              <strong>Language: </strong>
              {speciesData.language}
            </p>
            <p>
              <strong>Avg. Lifespan: </strong>
              {speciesData.average_lifespan}
            </p>
          </CardContent>
        </Card>
      );
    }
  }

  return (
    <div className="w-full">
      <header>
        <div className="relative w-full">
          <Image className="h-80 w-full object-cover" src={BackgroundImage} alt="Random image" />
          <div className="absolute inset-0 bg-gray-700 opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-3xl font-bold jaba">{profileData.name}</h2>
          </div>
        </div>
      </header>
      <Tabs defaultValue="About Me">
        <TabsList className="flex h-16">
          <TabsTrigger value="About Me" className="text-lg">
            👤 About Me
          </TabsTrigger>
          <TabsTrigger value="Films" className="text-lg">
            🎬 Films
          </TabsTrigger>
          <TabsTrigger value="Starships" className="text-lg">
            🚀 Starships
          </TabsTrigger>
        </TabsList>
        <TabsContent value="About Me" className="py-8 px-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
                <CardDescription>Some details about {profileData.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Height: </strong>
                  {profileData.height}cm
                </p>
                <p>
                  <strong>Weight: </strong>
                  {profileData.mass}klg
                </p>
                <p>
                  <strong>Hair Color: </strong>
                  {profileData.hair_color}
                </p>
                <p>
                  <strong>Date of Birth: </strong>
                  {profileData.birth_year}
                </p>
              </CardContent>
            </Card>
            {profileData.species.length !== 0 && profileData.species.map((type) => <SpeciesInfo id={parseIdFromString(type)} />)}
          </div>
        </TabsContent>
        <TabsContent value="Films" className="py-8 px-6">
          <div className="grid gap-6">
            {profileData.films.length !== 0 ? (
              profileData.films.map((film) => <FilmInfo id={parseIdFromString(film)} key={film} />)
            ) : (
              <div className="flex justify-center">
                <h3 className=" text-xl font-bold text-gray-500">No Films</h3>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="Starships" className="py-8 px-6">
          <div className="space-y-6">
            {profileData.starships.length !== 0 ? (
              profileData.starships.map((ship) => <StarshipInfo id={parseIdFromString(ship)} key={ship} />)
            ) : (
              <div className="flex justify-center">
                <h3 className=" text-xl font-bold text-gray-500">No Starships</h3>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
