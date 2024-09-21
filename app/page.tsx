"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Marquee from "@/components/ui/marquee";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState<string>("")
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Marquee items={["🪄 BASEFAIRY", "🪄 BASEFAIRY", "🪄 BASEFAIRY", "🪄 BASEFAIRY", "🪄 BASEFAIRY"]} />
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="enter basename" className="w-2/5 h-16" />
      <Button>check availability</Button>
    </div>
  );
}
