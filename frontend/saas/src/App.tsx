import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import createProductsQueryOptions from './queries/productsQueryOptions';

export default function App() {
  // const products = use(productsPromise)

  const queryClient = useQueryClient()

  const [{data: plans}] = useQueries(
    {queries: [createProductsQueryOptions()]}
  )

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
      {plans?.map((plan) => (
        <div key={plan.id}>
          <p>{plan.name}</p>
          <p>{plan.description}</p>
          <p>{plan.price}</p>
        </div>
      ))}
    </>
  )
}