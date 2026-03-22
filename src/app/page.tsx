"use client";
import Image from "next/image";
import { useEffect } from "react";
import StoryOne from "../components/StoryOne";

export default function Home() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);
  return (
    <main>
      <StoryOne />
    </main>
  );
}
