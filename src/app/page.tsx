"use client";
import Link from "next/link";
import { Bell, CircleUser, Home, LineChart, Menu, Package, Package2, Search, ShoppingCart, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/spinner";
import { parseIdFromString } from "@/lib/utils";
import "./home-style.css";

async function search(query: string) {
  const res = await fetch(`https://swapi.dev/api/people/?search=${query}`);
  return res.json();
}

async function searchAll() {
  const res = await fetch(`https://swapi.dev/api/people/`);
  return res.json();
}

export default function Dashboard() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [isPendingResponse, setIsPendingResponse] = useState(false);
  const [searchResultData, setSearchResultData] = useState<PeopleResponse>();
  const [isMounted, setIsMounted] = useState(false);

  async function handleSearch() {
    setIsPendingResponse(true);
    try {
      const searchResults = await search(searchInput);
      setSearchResultData(searchResults);
    } finally {
      setIsPendingResponse(false);
    }
  }

  async function getAllPeopleResults() {
    setIsPendingResponse(true);
    try {
      const searchResults = await searchAll();
      setSearchResultData(searchResults);
    } finally {
      setIsPendingResponse(false);
    }
  }

  useEffect(() => {
    getAllPeopleResults();
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Stars Effect
    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.className = "star m-0";
      star.style.animation = `twinkle ${Math.random() * 5 + 5}s linear ${Math.random() * 1 + 1}s infinite`;
      star.style.top = `${Math.random() * window.innerHeight}px`;
      star.style.left = `${Math.random() * window.innerWidth}px`;
      document.querySelector(".homescreen")?.appendChild(star);
    }
  }, []);

  return (
    <main className="homescreen flex flex-1 flex-col gap-4 p-4">
      <section className="mx-auto max-w-screen-xl w-full">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl jaba">Search for a Character</h1>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2 my-4">
          <Input type="text" placeholder="Search" onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
          <Button type="submit" onClick={handleSearch}>
            Search
          </Button>
        </div>
        {isPendingResponse ? (
          <div className="flex w-full items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <Table>
            <TableCaption>Search Results</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Birth Year</TableHead>
                <TableHead>Film Appearances</TableHead>
                <TableHead>Mass</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchResultData &&
                searchResultData.results.map((person) => (
                  <TableRow key={person.url} onClick={() => router.push("/person/" + parseIdFromString(person.url))} className=" cursor-pointer">
                    <TableCell className="font-medium">{person.name}</TableCell>
                    <TableCell>
                      <Badge>{person.gender}</Badge>
                    </TableCell>
                    <TableCell>{person.birth_year}</TableCell>
                    <TableCell>{person.films.length}</TableCell>
                    <TableCell>{person.mass}kg</TableCell>
                    <TableCell className="flex justify-end">
                      <Button>Profile</Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </section>
    </main>
  );
}
