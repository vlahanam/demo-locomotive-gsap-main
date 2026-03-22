"use client";
import Image from "next/image";
import { useEffect } from "react";
<<<<<<< HEAD
import StoryOne from "../components/StoryOne/Index";
=======
import StoryOne from "../components/StoryOne";
>>>>>>> 8721626e799ace89119bd55cea3b96c9af7226b0

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
