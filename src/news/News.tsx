import React, { useEffect, useState } from "react";

interface Article {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source_id: string;
  image_url: string;
}

const News: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch("/mockNews.json");
      const data = await response.json();
      setArticles(data.results || []);
    } catch (err) {
      console.error("Error loading news:", err);
    } finally {
      setLoading(false);
    }
  };

  const showMore = () => {
    setVisibleCount(9);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-12">
      <h1 className="text-4xl font-bold mb-10 text-center text-black-700 dark:text-black-400">
        Top Health News from Nepal
      </h1>

      {loading ? (
        <p className="text-center text-lg">Loading news...</p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, visibleCount).map((article, index) => (
              <a
                key={index}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg border border-gray-100 hover:border-gray-300 transition duration-300"
              >
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://source.unsplash.com/400x200/?health,nepal";
                  }}
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="mt-4 text-xs text-gray-400 flex justify-between items-center">
                    <span>{article.source_id}</span>
                    <span>{new Date(article.pubDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {visibleCount < 9 && articles.length > 6 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={showMore}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
              >
                Show More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default News;
