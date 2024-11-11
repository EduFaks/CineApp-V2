const Article = ({ title, text, tags, image }) => {
  return ( 
  <div 
  className="p-5 bg-gray-200 dark:bg-dark-200 sm:rounded-xl sm:shadow-xl sm:dark:shadow-gray-900 sm:dark:hover:shadow-gray-800 sm:hover:shadow-2xl flex flex-col items-center gap-2">
    { image ? <div className="relative max-w-xl mx-auto mt-5">
      <img className="h-64 w-full object-cover rounded-md" src={image} alt={title}/>
      <div className="absolute inset-0 bg-black opacity-60 rounded-md"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white text-center text-xl font-bold">{title}</h2>
      </div>
    </div>
    :
    <h2 className="text-black text-center text-xl font-bold">{title}</h2>}
    
    <div className="w-full pr-5 flex gap-2 justify-center mt-3">
      {
        tags.map(tag => 
        <span 
        key={tag} 
        className="px-4 py-1 cursor-default bg-brand-100 sm:hover:scale-110 hover:bg-brand-200 dark:bg-dark-100 rounded-full text-gray-200 text-xs font-bold uppercase">
        {tag}
        </span>)
      }
    </div>
    <div className="flex flex-col gap-1">
      {
        text.map((content, index) => 
        <span 
        key={index} 
        className="dark:text-gray-400">
        {content}
        </span>)
      }
    </div>
  </div>
)}

export default Article