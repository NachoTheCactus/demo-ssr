interface OpeningHours {
    [key: string]: string;
  }

export default function OpeningHours({className, days}:{className?:string, days:OpeningHours}) {

  return (
    <div className={`col-span-3 ${className}`}>
        <h2 className="text-2xl mb-4">Opening hours</h2>
        <div className="flex flex-col">
            {Object.entries(days).map(([day, hours],index) => (
                <div key={day+index} className="grid grid-cols-4">
                    <p className={`${index == 0 ? 'font-bold' : ''}`}>{day.charAt(0).toUpperCase() + day.slice(1)}</p>
                    <p className={`col-span-3 ${index == 0 ? 'font-bold' : ''}`}>{hours}</p>
                </div>
            ))}
        </div>
    </div>
  )
}
