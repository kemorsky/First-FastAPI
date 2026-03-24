import { useState } from 'react'
import './App.css'
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import plansQueryOptions from './queries/plansQueryOptions';
import { userQueryOptions, userSubscriptionQueryOptions } from './queries/userQueryOptions';
import { signIn } from './api/api';
import { Header } from './ui/blocks/shared/header';
import { Hero } from './ui/blocks/home/hero';
import { Features } from './ui/blocks/home/features';
import { HowToUse } from './ui/blocks/home/how-to-use';
import { Testimonials } from './ui/blocks/home/testimonials';
import { FAQ } from './ui/blocks/home/faq';
import { ReadyToJoin } from './ui/blocks/home/ready-to-join';
import { Footer } from './ui/blocks/shared/footer';

export default function App() {
  const queryClient = useQueryClient()

  const [{data: plans}, {data: user}, {data: user_subscription}] = useQueries(
    {queries: [plansQueryOptions(), userQueryOptions(), userSubscriptionQueryOptions()]}
  );

  const handleSignIn = async () => {
    await signIn()
  };

  console.log(user);
  console.log(user_subscription); // TODO - figure out the 422 error (user_id is thought of as string instead of integer)

  return (
    <main className="max-w-360 w-full min-h-screen h-full bg-orange-200 flex flex-col justify-start items-center">
      <Header />
      <Hero />
      <Features />
      <HowToUse />
      <Testimonials />
      <FAQ />
      <ReadyToJoin />
      <Footer />
      <div>
        {user?.full_name}
        {user?.email}
      </div>
      {/* <div>
        {user_subscription?.id}
      </div> */}
      <button onClick={() => handleSignIn()}>Sign In</button>
    </main>
  )
}