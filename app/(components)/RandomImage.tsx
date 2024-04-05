"use client"

import { useState, useEffect } from "react";
import Image from "next/image";

export default function RandomImage({imgId, className}:{imgId:number, className?:string}) {

  const [dataURI, setDataURI] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataURI = async () => {
      try {
        const response = await fetch(`/api/random-image/${imgId+250}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data URI');
        }
        const data = await response.json();
        setDataURI(data.dataURI);
      } catch (error:any) {
        setError(error.message);
      }
    };

    fetchDataURI();
  }, []);

  return (
    <>
      {error ? (
        <Image className={`w-[120px] h-[120px] ${className}`} src={"/img/company-default.webp"} width={200} height={200} alt="default"/>
      ) : dataURI ? (
        <Image priority className={`w-[120px] h-[120px] ${className}`} src={dataURI} width={200} height={200} alt="Random Image" />
      ) : (
        <Image priority className={`w-[120px] h-[120px] ${className}`} src={"/img/company-default.webp"} width={200} height={200} alt="default"/>
      )}
    </>
  )
}
