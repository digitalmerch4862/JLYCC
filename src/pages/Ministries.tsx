import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Users, CheckCircle, PlusCircle, Search } from 'lucide-react';

const Ministries = () => {
  const { ministries, currentProfile, addMinistryInterest } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    currentProfile?.ministriesOfInterest || []
  );

  if (!currentProfile) return <div>Loading...</div>;

  const filteredMinistries = ministries.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSaveInterests = () => {
    addMinistryInterest(selectedInterests);
    alert('Ministry interests saved!');
  };

  return (
    <div className="max-w-6xl mx-auto font-sans">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-white tracking-tight flex items-center">
            <Users className="mr-3 text-pink-600 dark:text-pink-400" size={32} />
            Ministries
          </h1>
          <p className="mt-2 text-stone-500 dark:text-stone-400">
            Discover places to serve and connect. Select at least 3 ministries you are interested in.
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm font-medium text-stone-600 dark:text-stone-300">
            Selected: <span className="text-pink-600 dark:text-pink-400 font-bold">{selectedInterests.length}</span> / 3+
          </div>
          <button
            onClick={handleSaveInterests}
            disabled={selectedInterests.length === 0}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 transition-colors"
          >
            Save Interests
          </button>
        </div>
      </div>

      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-stone-400" />
        </div>
        <input
          type="text"
          placeholder="Search ministries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-stone-300 dark:border-stone-600 rounded-xl leading-5 bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm transition-colors shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMinistries.map(ministry => {
          const isSelected = selectedInterests.includes(ministry.id);
          return (
            <div 
              key={ministry.id} 
              className={`relative bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-sm border transition-all duration-200 cursor-pointer ${
                isSelected 
                  ? 'border-pink-500 ring-1 ring-pink-500 dark:bg-stone-800/80' 
                  : 'border-stone-200 dark:border-stone-700 hover:border-pink-300 dark:hover:border-pink-700'
              }`}
              onClick={() => toggleInterest(ministry.id)}
            >
              <div className="absolute top-4 right-4">
                {isSelected ? (
                  <CheckCircle className="h-6 w-6 text-pink-500" />
                ) : (
                  <PlusCircle className="h-6 w-6 text-stone-300 dark:text-stone-600" />
                )}
              </div>
              
              <div className="mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 dark:bg-stone-700 text-stone-800 dark:text-stone-200">
                  {ministry.category}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2 tracking-tight">
                {ministry.name}
              </h3>
              
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-4 line-clamp-2">
                {ministry.description}
              </p>
              
              <div className="mt-auto pt-4 border-t border-stone-100 dark:border-stone-700">
                <p className="text-xs font-medium text-stone-900 dark:text-white">Purpose:</p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{ministry.purpose}</p>
                
                <div className="mt-3 flex items-center text-xs text-stone-500 dark:text-stone-400">
                  <span className="font-medium text-stone-700 dark:text-stone-300 mr-1">For:</span> {ministry.ageGroup}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredMinistries.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
          <Users className="mx-auto h-12 w-12 text-stone-300 dark:text-stone-600" />
          <h3 className="mt-2 text-sm font-medium text-stone-900 dark:text-white">No ministries found</h3>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">Try adjusting your search term.</p>
        </div>
      )}
    </div>
  );
};

export default Ministries;
