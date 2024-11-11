const Input = props => {
  return (
    <div className="relative flex justify-center w-full">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative w-full max-w-lg">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg 
            className="w-5 h-5 text-emerald-500" 
            aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 20 20"
          >
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          {...props}
          className="input pl-10 bg-gray-800/50 text-gray-100 placeholder:text-gray-500 
          placeholder:font-medium placeholder:text-sm border-gray-700 hover:border-gray-600
          focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />
      </div>
    </div>
  );
}

export default Input;
