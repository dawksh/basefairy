import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const name = searchParams.get('name')
    const url = "https://www.dakshk.xyz/api/ens"
    const { data } = await axios.get<Response>(url, {
        params: {
            name: name
        }
    })
    return NextResponse.json(data, { status: 200 });
}
