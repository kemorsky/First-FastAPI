import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import createProductsQueryOptions from './queries/plansQueryOptions';
import { userQueryOptions, userSubscriptionQueryOptions } from './queries/userQueryOptions';
import { signIn } from './api/api';

export default function App() {
  const queryClient = useQueryClient()

  const [{data: plans}, {data: user}, {data: user_subscription}] = useQueries(
    {queries: [createProductsQueryOptions(), userQueryOptions(), userSubscriptionQueryOptions()]}
  );

  const handleSignIn = async () => {
    await signIn()
  };

  console.log(user);
  console.log(user_subscription); // TODO - figure out the 422 error (user_id is thought of as string instead of integer)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Fetching Test</h1>
      <div>
        {user?.full_name}
        {user?.email}
      </div>
      {/* <div>
        {user_subscription?.id}
      </div> */}
      {plans?.map((plan) => (
        <div key={plan.id}>
          <p>{plan.name}</p>
          <p>{plan.description}</p>
          <p>{plan.price}</p>
        </div>
      ))}
      <button onClick={() => handleSignIn()}>Sign In</button>
    </>
  )
}