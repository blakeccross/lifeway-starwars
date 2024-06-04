import Link from "next/link";
import { Bell, CircleUser, Home, LineChart, Menu, Package, Package2, Rocket, Search, Ship, ShoppingCart, Star, Stars, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "./mode-toggle";

export function MainNav() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <div className="flex flex-1 flex-row gap-4 justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Stars className="h-4 w-4" />
          <span className="star-jedi">Life Way Star Wars Challenge</span>
        </Link>

        <ModeToggle />
      </div>
    </header>
  );
}
