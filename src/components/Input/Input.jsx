const Input = props => {
  return (
 


<>   
    <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative flex justify-center">
        <div class="absolute inset-y-0 start-96 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input className="block ps-10 py-1 pl-5 dark:bg-dark-200 rounded-full w-full max-w-lg text-dark-100 dark:text-gray-200 placeholder:text-gray-500 placeholder:font-bold placeholder:text-xs placeholder:uppercase focus:border-brand-200 focus:border-2 dark:focus:border-brand-100 outline-gray-600" {...props} />
    </div>
</>

)}

export default Input

 {/* <input 
  className="py-1 pl-5 dark:bg-dark-200 rounded-full w-full max-w-lg outline-none text-dark-100 dark:text-gray-200 placeholder:text-gray-500 placeholder:font-bold placeholder:text-xs placeholder:uppercase focus:border-brand-200 focus:border-2 dark:focus:border-brand-100" {...props} /> */}