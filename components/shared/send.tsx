import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useState } from 'react'
import { useWriteContract } from 'wagmi'
import { baseRegistrar, L2Resolver } from '@/lib/abis'
import { toast } from '@/hooks/use-toast'
import { ToastAction } from '../ui/toast'
import { encodeFunctionData, namehash, parseEther, } from 'viem'
import { useNameOrAddress } from '@/hooks/useNameOrAddress'
import { useDebounce } from 'use-debounce'

const COST = (length: number) => {
    if (length == 3) {
        return 0.1
    }
    if (length == 4) {
        return 0.01
    } else {
        return 0.001
    }
}

export default function SendDialog({ name }: { name: string }) {
    const [duration, setDuration] = useState(1);
    const [address, setAddress] = useState("")
    const { writeContractAsync } = useWriteContract()
    const [debouncedAddress] = useDebounce(address, 1000)
    const { data: nameOrAddress, isSuccess } = useNameOrAddress(debouncedAddress)
    const onSubmit = async () => {
        const ownerAddress = nameOrAddress?.address
        const addressData = encodeFunctionData({
            abi: L2Resolver.abi,
            functionName: 'setAddr',
            args: [namehash(name + ".base.eth"), debouncedAddress],
        });

        const nameData = encodeFunctionData({
            abi: L2Resolver.abi,
            functionName: 'setName',
            args: [namehash(name + ".base.eth"), name + ".base.eth"],
        });
        const hash = await writeContractAsync({
            address: baseRegistrar.address as `0x${string}`,
            abi: baseRegistrar.abi,
            functionName: 'register',
            args: [[name, ownerAddress, duration * 31557600, baseRegistrar.resolver, [addressData, nameData], false]],
            value: parseEther(COST(String(name).length).toString())
        })
        toast({
            title: "tranaction sent!",
            action: <ToastAction onClick={() => window.open(`https://basescan.org/tx/${hash}`)} altText='showTxn'>goto txn</ToastAction>
        })
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>confirm send</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>gift {name}.base.eth</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">

                            <Label htmlFor="name" className="text-right">
                                wallet address
                            </Label>
                            <Input
                                id="address"
                                className="col-span-3"
                                placeholder='vitalik.eth'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />

                            <Label htmlFor="duration" className="text-right">
                                duration
                            </Label>
                            <Select onValueChange={(v) => setDuration(parseInt(v))}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="1 year" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="1">1 year</SelectItem>
                                        <SelectItem value="2">2 year</SelectItem>
                                        <SelectItem value="3">3 year</SelectItem>
                                        <SelectItem value="4">4 year</SelectItem>
                                        <SelectItem value="5">5 year</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Label htmlFor="duration" className="text-left">
                        cost: <span>{(duration * COST(String(name).length)).toFixed(5)} ETH</span>
                    </Label>
                    <Button type="submit" onClick={onSubmit} disabled={!isSuccess} >gift 🎁</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}