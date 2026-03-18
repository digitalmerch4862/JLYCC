import React from 'react';
import { Calendar, Clock, MapPin, Users, Info } from 'lucide-react';

const Events = () => {
  const weeklyEvents = [
    {
      id: 1,
      title: 'Sunday Service',
      time: '9:00 AM - 12:00 PM',
      day: 'Sunday',
      location: 'Main Sanctuary',
      audience: 'Everyone',
      description: 'Join us for our main worship service featuring powerful worship and an inspiring message.',
      color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      iconColor: 'text-pink-600 dark:text-pink-400'
    },
    {
      id: 2,
      title: 'KingdomKids',
      time: '10:00 AM - 12:00 PM',
      day: 'Sunday',
      location: 'Kids Hall',
      audience: 'Children',
      description: 'A fun, safe, and engaging environment where kids learn about Jesus at their level.',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 3,
      title: 'Leadtakers Youth',
      time: '2:00 PM - 4:00 PM',
      day: 'Sunday',
      location: 'Youth Center',
      audience: 'Youth / Teens',
      description: 'A dynamic gathering for young people to connect, worship, and grow in their faith.',
      color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
      iconColor: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      id: 4,
      title: 'Leadtakers Pro',
      time: '2:00 PM - 4:00 PM',
      day: '2nd & 3rd Sunday of the month',
      location: 'Conference Room',
      audience: 'Young Professionals',
      description: 'Equipping young professionals to lead and make an impact in their workplaces and communities.',
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      iconColor: 'text-amber-600 dark:text-amber-400'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-white tracking-tight flex items-center">
          <Calendar className="mr-3 text-pink-600 dark:text-pink-400" size={32} />
          News and Events
        </h1>
        <p className="mt-2 text-stone-500 dark:text-stone-400">
          Stay updated with our regular church gatherings and special events.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {weeklyEvents.map((event) => (
          <div 
            key={event.id} 
            className="bg-white dark:bg-stone-800 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className={`px-6 py-4 border-b border-stone-100 dark:border-stone-700 flex justify-between items-start`}>
              <div>
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-3 ${event.color}`}>
                  {event.day}
                </span>
                <h3 className="text-xl font-bold text-stone-900 dark:text-white">{event.title}</h3>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-start">
                <Clock className={`mt-0.5 mr-3 flex-shrink-0 ${event.iconColor}`} size={18} />
                <div>
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-200">Time</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">{event.time}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className={`mt-0.5 mr-3 flex-shrink-0 ${event.iconColor}`} size={18} />
                <div>
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-200">Location</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">{event.location}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Users className={`mt-0.5 mr-3 flex-shrink-0 ${event.iconColor}`} size={18} />
                <div>
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-200">For</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">{event.audience}</p>
                </div>
              </div>

              <div className="flex items-start pt-2 border-t border-stone-100 dark:border-stone-700">
                <Info className="mt-0.5 mr-3 flex-shrink-0 text-stone-400" size={18} />
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
