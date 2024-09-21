import axios from "axios"
import { useQuery } from "@tanstack/react-query"

export type DataResponse = {
    address: string,
    balance: number
}

export const useNameOrAddress = (addressOrName: string) => {
    const fetchNameOrAddress = async (): Promise<DataResponse> => {
        const url = "/name"
        const { data } = await axios.get<DataResponse>(url, {
            params: {
                name: addressOrName
            }
        })
        return data
    }
    return useQuery({
        queryKey: ["addressOrName", addressOrName],
        queryFn: fetchNameOrAddress,
    })
}