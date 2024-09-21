import { useReadContract } from "wagmi"

export const useNameAvailable = (name: string) => {
    const { data, refetch } = useReadContract({
        address: "0x4cCb0BB02FCABA27e82a56646E81d8c5bC4119a5",
        abi: [],
        functionName: "available",
        args: [name],
        query: {
            enabled: !!name,
        },
        scopeKey: "availability fetch"
    })
    return { data, refetch }
}