import React from "react"
import { useQuery } from "@apollo/react-hooks/lib/index"
import { query } from "./query"

export const useOnIceLive = () => {
  const { loading, error, data } = useQuery(query, {
    pollInterval: 1000
  })
  return [loading, error, data]
}

export default useOnIceLive
