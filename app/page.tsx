"use client"

import { Input } from "@/components/ui/input";
import Marquee from "@/components/ui/marquee";
import { toast } from "@/hooks/use-toast";
import { baseRegistrar } from "@/lib/abis";
import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { useDebounce } from 'use-debounce';
import SendDialog from "@/components/shared/send";

export default function Home() {
  const [name, setName] = useState<string>("")
  const [debouncedName] = useDebounce(name, 1000)

  const { data: availability } = useReadContract({
    address: baseRegistrar.address as `0x${string}`,
    abi: baseRegistrar.abi,
    functionName: "available",
    args: [debouncedName],
    query: {
      enabled: !(debouncedName == ""),
    },
    scopeKey: "availability"
  })

  useEffect(() => {
    if (debouncedName != "") {
      if (availability) {
        toast({
          title: "Available",
          duration: 3000,
          variant: "default"
        })
      } else {
        toast({
          title: "Not Available",
          duration: 3000,
          variant: "destructive"
        })
      }
    }
  }, [availability])

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Marquee items={["🪄 basefairy", "🪄 basefairy", "🪄 basefairy", "🪄 basefairy", "🪄 basefairy"]} />
      <div className="w-2/5 h-16">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="enter basename (without .base.eth)" className="h-full" />
        <p className="text-sm italic my-2">start typing to check basename availability</p>
      </div>
      {Boolean(availability) && <SendDialog name={name} />}
    </div>
  );

}
