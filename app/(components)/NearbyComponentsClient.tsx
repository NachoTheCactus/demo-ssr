"use client"

import Link from "next/link";
import { useState } from "react";
import RandomImage from "./RandomImage";
import Image from "next/image";

export default function NearbyComponentsClient() {
    const [data, setData] = useState<any[]>([]);

    const fetchData = async () => {
        try {
            const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_APP_PORT}/api/nearby-companies`);
            const jsonData = await res.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching nearby companies:', error);
        }
    };
    return (
      <div className="p-12">
        <h1 onClick={fetchData} className="text-4xl pb-8 cursor-pointer">Nearby companies (click to load)</h1>
            <div className="grid grid-cols-2 gap-4">
                {data && data.map((company:any)=>{
                    return <Link href={`/company/${company.id}`} className={`p-4 flex gap-4 hover:bg-gray-100 bg-white transition-colors duration-200 border-l-8 ${company.open ? 'border-l-green-500': 'border-l-red-500'}`} key={company.id}>
                    <RandomImage imgId={company.id}/>
                    <div className='flex justify-between w-full'>
                        <div>
                        <p className="text-xl font-bold">{company.title}</p>
                        <p className={`${company.open ? "text-green-500": "text-red-500"}`}>{company.open ? "Currently open": "Currently closed"}</p>
                        <p className="flex gap-2"><svg className="w-3 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>{company.location}</p>
                        <p className='flex items-center gap-2 text-blue-500 hover:underline'><svg className='w-3 fill-blue-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>More details</p>
                        </div>
                        <div className='flex flex-col justify-between h-full'>
                        <p className='font-bold flex h-fit gap-2 justify-end items-center'>{company.review}<svg className='w-4 h-4 -mt-1 fill-yellow-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg></p>
                        {company.details.verified && <Image className='h-5 w-fit' src={"/img/verified.png"} width={286} height={40} alt='verified'/>}
                        </div>
                    </div>
                </Link>
                })}
            </div>
      </div>
    )
}
