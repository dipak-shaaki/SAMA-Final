import React from 'react';

const stories = [
  {
    title: 'New Breakthrough in Cancer Treatment',
    category: 'Research',
    image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=800',
    date: 'Mar 15, 2024'
  },
  {
    title: 'Understanding Mental Health in the Digital Age',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    date: 'Mar 14, 2024'
  },
  {
    title: 'The Impact of Diet on Immune System',
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    date: 'Mar 13, 2024'
  }
];

export function TopStories() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Top Health Stories</h2>
          <p className="mt-4 text-lg text-gray-600">
            Stay informed with the latest health news and research
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => (
            <article key={index} className="relative group">
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <img
                  src={story.image}
                  alt={story.title}
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium text-teal-600">{story.category}</span>
                <p className="text-xs text-gray-500 mt-1">{story.date}</p>
                <h3 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-teal-600">
                  {story.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}