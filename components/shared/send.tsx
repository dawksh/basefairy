import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useState } from 'react'


export default function SendDialog({ name }: { name: string }) {
    const [duration, setDuration] = useState(1);
    const [address, setAddress] = useState("")
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
                    <Button type="submit">gift 🎁</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}