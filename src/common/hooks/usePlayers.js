import { useQuery } from "./useQuery"

export const usePlayers = id =>  useQuery(`teams/${id}/players`)