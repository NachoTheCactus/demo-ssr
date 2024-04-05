import Image from "next/image"

export default function Navbar() {
  return (
    <nav id="navbar" className="box-content py-2 h-14 z-50 md:h-14 bg-white fixed w-full border-b border-white-300 md:border-0 md:shadow-lg">
        <div className="h-full lg:container lg:mx-auto md:mx-0 flex flex-col items-center md:flex-row md:justify-between">
            <div className="w-full h-14 md:py-0 flex justify-between">
            <a className="w-auto min-w-[170px]" href="/">
                <Image priority className="shrink-0 h-full p-3 w-fit block" src="/img/logo.webp" alt="logo" width="220" height="48"/>
            </a>
            <div className="flex">
                <svg data-target="#sidebar" data-display-type="block" data-close="#header-search-block" className="toggle-element-button w-5 fill-gray-fo px-4 shrink-0 box-content md:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/>
                </svg>
                <svg data-target="#header-search-block" data-display-type="flex" className="toggle-element-button w-5 fill-gray-fo px-4 shrink-0 box-content md:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"></path>
                </svg>
            </div>
            </div>
            <form id="header-search-block" className="fixed md:static bg-white flex-col md:flex-row shadow-lg md:shadow-none mt-16 md:mt-0 h-fit px-8 md:px-0 pb-6 max-w-full md:max-w-xl w-full lg:max-w-5xl md:mr-3 lg:mr-0 hidden md:flex md:py-3 gap-2 lg:gap-4 justify-center items-center" action="/search" method="get">
                <div className="relative w-full md:w-2/5 transition-all duration-200 flex gap-2 border border-white-300 group rounded px-3 py-1.5 shadow focus-within:shadow-around focus-within:shadow-blue-100 focus-within:border-white">
                <input className="order-2 text-black-fo w-full md:w-auto md:max-w-[85%] lg:max-w-[88%] focus:outline-0 placeholder-gray-400 peer" placeholder="What" type="text" id="edit-what" name="what" size={30} maxLength={128} data-original-title="" title="" data-what-error="{{ 'what_input_error_message' | trans}}"/>
                    <svg className="order-1 shrink-0 w-4 fill-gray-400 peer-focus:fill-black-fo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M147.8 192H480V144C480 117.5 458.5 96 432 96h-160l-64-64h-160C21.49 32 0 53.49 0 80v328.4l90.54-181.1C101.4 205.6 123.4 192 147.8 192zM543.1 224H147.8C135.7 224 124.6 230.8 119.2 241.7L0 480h447.1c12.12 0 23.2-6.852 28.62-17.69l96-192C583.2 249 567.7 224 543.1 224z"/>
                    </svg>
                </div>
                <div className="relative w-full md:w-2/5 transition-all duration-200 flex gap-2 border border-white-300 rounded px-3 py-1.5 shadow focus-within:shadow-around focus-within:shadow-blue-100 focus-within:border-white">
                <input className="order-2 relative text-black-fo w-full md:w-auto md:max-w-[85%] lg:max-w-[88%] focus:outline-0 pr-[15px] placeholder-gray-400 peer" placeholder="Where" aria-label="{{ 'search.form.placeholder.where' | trans}}" type="text" id="edit-where" name="where" size={30} maxLength={128} data-sa-theme="cylex_autocomplete" />
                <div id="autocomplete-dropdown-style" className="hidden" data-style="absolute top-9 left-0 z-40 w-full rounded bg-white border border-white-300 shadow-lg">
                    <div id="dropdown-result-style" className="hidden" data-style="italic p-2 border-b border-white-300"></div>
                    <div id="dropdown-result-focus-style" className="hidden" data-style="bg-white-200"></div>
                    <div id="botttom-div-style" className="hidden" data-style="p-2 break-words"></div>
                </div>
                    <svg className="order-1 shrink-0 w-3 fill-gray-400 peer-focus:fill-black-fo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"/>
                    </svg>
                    <button id='toggle-target-x' aria-label="Your location button" className="absolute right-0 top-0 w-8 h-full group get-browser-location">
                        <svg id="btn-target" className="hidden w-4 mx-auto fill-white-300 group-hover:fill-black-fo shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 0c17.7 0 32 14.3 32 32V66.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H445.3C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.3C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H66.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256c0 70.7 57.3 128 128 128s128-57.3 128-128s-57.3-128-128-128s-128 57.3-128 128zm128 80c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80z"/>
                        </svg>
                        <svg id="btn-clear" className="hidden w-4 mx-auto fill-white-300 group-hover:fill-black-fo  shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
                        </svg>
                    </button>
                    <input type="hidden" id="geo-input"/>
                    <input type="hidden" id="radius-input"/>
                </div>
                <button id='edit-submit-search' className="btn-fo flex gap-2 justify-center items-center w-full">
                    <svg className="shrink-0 w-4 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/>
                    </svg>
                    <span>Search</span>
                </button>
            </form>
        </div>
    </nav>
  )
}
