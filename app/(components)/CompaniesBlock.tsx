"use client"

import Link from 'next/link'
import Image from 'next/image';
import RandomImage from './RandomImage';
import { useEffect, useState } from 'react';

export default function CompaniesBlock() {

  const [pagesData, setPagesData] = useState<any[]>([]);
  const [companiesLength, setCompaniesLength] = useState(0);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;

  const fetchData = async (pageNr: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/companies?page=${pageNr}&limit=${itemsPerPage}`);
      const jsonData = await res.json();
      setLoading(false);
      setPagesData(prevState => {
        const newData = [...prevState];
        newData[pageNr - 1] = jsonData;
        return newData;
      });
    } catch (error) {
      console.error('Error fetching nearby companies:', error);
    }
  };

  const fetchLength = async () => {
    try {
      const res = await fetch(`/api/companiesl`);
      const jsonData = await res.json();
      setCompaniesLength(jsonData);
    } catch (error) {
      console.error('Error fetching nearby companies:', error);
    }
  };

  useEffect(() => {
    fetchData(1);
    fetchLength();
  }, []);

  const [page, setPage] = useState(1);

  const totalItems = companiesLength;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      
      if (!pagesData[page]) {
        fetchData(page + 1);
      }
      setPage(page + 1);
    }
  };

  const pagesNumbersRender = ()=> {

    let elements = []
    let handleClick = (i:number)=>{
      if (!pagesData[page]) {
        fetchData(i);
      }
      setPage(i);
    }

    for(let i = 1; i <= totalPages; i++){
      elements.push(<button key={i} className={`${i == page ? 'bg-pink-600 text-white px-3 rounded-md' : 'px-3'}`} onClick={()=>{handleClick(i)}}>{i}</button>)
    }
    return elements;
  }

  const currentPageData = pagesData[page - 1] || [];

  let loadingElements = () => {
    let arr = []

    for(let i = 0; i < itemsPerPage; i++){
      arr.push(
        <div key={i} className='flex w-full'>
          <div className='w-2 h-full animate-pulse bg-gray-500'></div>
          <div className={`p-4 flex gap-4 hover:bg-gray-100 w-full bg-white transition-colors duration-200`}>
            <div className='w-[120px] h-[120px] bg-gray-500 rounded-md shrink-0 animate-pulse'></div>
            <div className='flex justify-between w-full'>
              <div className='flex flex-col gap-4'>
                <div className='w-[250px] h-4 bg-gray-500 rounded-md animate-pulse'></div>
                <div className='w-[200px] h-4 bg-gray-500 rounded-md animate-pulse'></div>
                <div className='w-[160px] h-4 bg-gray-500 rounded-md animate-pulse'></div>
                <div className='w-[140px] h-4 bg-gray-500 rounded-md animate-pulse'></div>
              </div>
              <div className='flex flex-col justify-between h-full items-end'>
              <div className='w-12 h-4 bg-gray-500 rounded-md animate-pulse'></div>
                <div className='w-[100px] h-4 bg-gray-500 rounded-md animate-pulse'></div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return arr;
  }

  let loadingButtons = ()=>{
    let arr = [];

    for(let i = 0; i < itemsPerPage + 1; i++){
      if(i == 0 || i == itemsPerPage + 1-1){
        arr.push(<div key={i} className="bg-gray-500 animate-pulse px-5 py-3 rounded-md"></div>)
      }else{
        arr.push(<div key={i} className="bg-gray-500 animate-pulse px-4 py-3 rounded-md"></div>)
      }
    }

    return <div className="flex justify-center items-center space-x-4 mt-4 col-span-1 lg:col-span-2">{arr}</div>
  }

  return (
    <div className="container p-4 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
      {!loading && currentPageData.map((company: any, i:any) => (
        <Link key={company.title + i} className={`p-4 flex gap-4 hover:bg-gray-100 bg-white transition-colors duration-200 border-l-8 ${company.open ? 'border-l-green-500' : 'border-l-red-500'}`} href={`/company/${company.id}`}>
          <RandomImage imgId={company.id} />
          <div className='flex justify-between w-full'>
            <div>
              <p className="text-xl font-bold">{company.title}</p>
              <p className={`${company.open ? "text-green-500" : "text-red-500"}`}>{company.open ? "Currently open" : "Currently closed"}</p>
              <p className="flex gap-2"><svg className="w-3 fill-black shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>{company.location}</p>
              <p className='flex items-center gap-2 text-blue-500 hover:underline'><svg className='w-3 fill-blue-500 shrink-0' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>More details</p>
            </div>
            <div className='flex flex-col justify-between h-full'>
              <p className='font-bold flex h-fit gap-2 items-center justify-end'>{company.review}<svg className='w-4 h-4 -mt-1 fill-yellow-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg></p>
              {company.details.verified && <Image className='h-5 w-fit shrink-0 object-contain' src={"/img/verified.png"} width={286} height={40} alt='verified'/>}
            </div>
          </div>
        </Link>
      ))}
      {loading && loadingElements()}
      {!loading &&
        <div className="flex justify-center items-center space-x-4 mt-4 col-span-1 lg:col-span-2">
          <button
            aria-label='previous'
            onClick={handlePrevPage}
            disabled={page === 1}
            className="btn-fo !py-1"
          >
            <svg className='fill-white w-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"/></svg>
          </button>
          {pagesNumbersRender()}
          <button
            aria-label='next'
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="btn-fo !py-1"
          >
            <svg className='w-2 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
          </button>
        </div>
      }
      {loading &&
        loadingButtons()
      }
    </div>
  );
}