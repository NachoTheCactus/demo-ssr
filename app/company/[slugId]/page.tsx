import React from 'react'
import NearbyComponentsClient from '@/app/(components)/NearbyComponentsClient';
import Image from 'next/image';
import RandomImage from '@/app/(components)/RandomImage';
import OpeningHours from '@/app/(components)/OpeningHours';
import ReviewForm from '@/app/(components)/ReviewForm';
import CompaniesBlock from '@/app/(components)/CompaniesBlock';

export default async function CompanyPage({ params }: { params: { slugId: string } }) {

  function getLastWord(str:string) {
    str = str.trim();
    const words = str.split(/\s+/);
    return words[words.length - 1];
  }

  const res = await fetch(`/api/company/${params.slugId}`);
  const data = await res.json();

  return (
    <div className="bg-gray-200 pt-[72px]">
        <Image className='w-full object-contain' priority src="/img/staticmap.png" width={1905} height={200} alt="map"/>
        <div className="container p-12 relative -mt-12 grid grid-cols-4 mx-auto gap-4 bg-white">
          <div className='col-span-3 col-start-2'>
            <div className='grid grid-cols-6 gap-4'>
              <RandomImage className='' imgId={data.id}/>
              <div className='col-span-5'>
                <h1 className='text-3xl'>{data.title} in <strong>{getLastWord(data.location)}</strong></h1>
                <p className={`text-lg ${data.open ? "text-green-500": "text-red-500"}`}>{data.open ? "Currently open": "Currently closed"}</p>
                <p className='text-xs flex items-center gap-2'><Image src={"/img/check.webp"} width={23} height={22} alt='check'/> Verified Listing. Updated on February 13, 2024</p>
              </div>
              <OpeningHours days={data.opening_hours}/>
              <div className="col-span-3">
                <h2 className="text-2xl mb-4">Contact Details</h2>
                <p className="flex gap-2"><svg className="w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                  {data.location}
                </p>
                <a className='flex gap-2' href={`tel:${data.details.phone}`}><svg className='w-3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>{data.details.phone}</a>
                <a className='flex gap-2' href={data.details.website}><svg className="w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M51.7 295.1l31.7 6.3c7.9 1.6 16-.9 21.7-6.6l15.4-15.4c11.6-11.6 31.1-8.4 38.4 6.2l9.3 18.5c4.8 9.6 14.6 15.7 25.4 15.7c15.2 0 26.1-14.6 21.7-29.2l-6-19.9c-4.6-15.4 6.9-30.9 23-30.9h2.3c13.4 0 25.9-6.7 33.3-17.8l10.7-16.1c5.6-8.5 5.3-19.6-.8-27.7l-16.1-21.5c-10.3-13.7-3.3-33.5 13.4-37.7l17-4.3c7.5-1.9 13.6-7.2 16.5-14.4l16.4-40.9C303.4 52.1 280.2 48 256 48C141.1 48 48 141.1 48 256c0 13.4 1.3 26.5 3.7 39.1zm407.7 4.6c-3-.3-6-.1-9 .8l-15.8 4.4c-6.7 1.9-13.8-.9-17.5-6.7l-2-3.1c-6-9.4-16.4-15.1-27.6-15.1s-21.6 5.7-27.6 15.1l-6.1 9.5c-1.4 2.2-3.4 4.1-5.7 5.3L312 330.1c-18.1 10.1-25.5 32.4-17 51.3l5.5 12.4c8.6 19.2 30.7 28.5 50.5 21.1l2.6-1c10-3.7 21.3-2.2 29.9 4.1l1.5 1.1c37.2-29.5 64.1-71.4 74.4-119.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm144.5 92.1c-2.1 8.6 3.1 17.3 11.6 19.4l32 8c8.6 2.1 17.3-3.1 19.4-11.6s-3.1-17.3-11.6-19.4l-32-8c-8.6-2.1-17.3 3.1-19.4 11.6zm92-20c-2.1 8.6 3.1 17.3 11.6 19.4s17.3-3.1 19.4-11.6l8-32c2.1-8.6-3.1-17.3-11.6-19.4s-17.3 3.1-19.4 11.6l-8 32zM343.2 113.7c-7.9-4-17.5-.7-21.5 7.2l-16 32c-4 7.9-.7 17.5 7.2 21.5s17.5 .7 21.5-7.2l16-32c4-7.9 .7-17.5-7.2-21.5z"/></svg>View company website</a>
                <a className='flex gap-2 text-blue-500' href={data.details.cylex_url}><svg className='w-3 fill-blue-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>Find more info on Cylex</a>
                <p className='flex gap-2 text-red-500'><svg className='w-3 fill-red-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>Report incorrect information</p>
              </div>
            </div>
          </div>
          <ReviewForm/>
        </div>
        <div className="container mx-auto flex flex-col justify-center pb-16 pt-16">
          <h2 className='p-4 text-2xl font-bold'>Nearby Companies</h2>
          <CompaniesBlock/>
        </div>
    </div>
  )
}
