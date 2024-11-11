const Article = ({ title, text, tags, image }) => {
  return ( 
    <div className="card group overflow-hidden">
      {image ? (
        <div className="relative h-64 overflow-hidden">
          <img 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
            src={image} 
            alt={title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent">
            <div className="absolute bottom-0 p-6">
              <h2 className="text-white text-xl font-bold text-shadow">
                {title}
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <h2 className="text-xl font-bold text-emerald-400">
            {title}
          </h2>
        </div>
      )}
      
      <div className="p-6 pt-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1 text-xs font-medium rounded-full 
              bg-emerald-500/10 text-emerald-400 
              transition-all duration-200 hover:bg-emerald-500/20"
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          {text.map((content, index) => (
            <p 
              key={index} 
              className="text-gray-300 leading-relaxed"
            >
              {content}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Article;
