import './App.css'
import { useState } from 'react';
import { Header } from './ui/blocks/shared/header';
import { Hero } from './ui/blocks/home/hero';
import { Features } from './ui/blocks/home/features';
import { HowToUse } from './ui/blocks/home/how-to-use';
import { Testimonials } from './ui/blocks/home/testimonials';
import { FAQ } from './ui/blocks/home/faq';
import { ReadyToJoin } from './ui/blocks/home/ready-to-join';
import { Footer } from './ui/blocks/shared/footer';

export default function App() {

  const [isDark, setIsDark] = useState(false);
  return (
    <main className="w-full bg-bg min-h-screen h-full flex flex-col justify-start items-center">
      <Header />
      <div id="scroll-trigger" className="h-22.5" />
      <Hero />
      <button onClick={() => {
          setIsDark(!isDark);
          document.documentElement.classList.toggle("light");
        }}>
          {isDark ? "Light" : "Dark"}
      </button>
      <Features />
      <HowToUse />
      <Testimonials />
      <FAQ />
      <ReadyToJoin />
      <Footer />
    </main>
  )
}