import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Heart, Calendar, MapPin, Users } from 'lucide-react';

const HeartLink = () => {
  const { currentProfile, heartLinks, users } = useAppContext();

  if (!currentProfile) return <div>Loading...</div>;

  const myGroup = heartLinks.find(g => g.id === currentProfile.assignedHeartLinkId);
  const leader = myGroup ? users.find(u => u.id === myGroup.leaderId) : null;

  return (
    <div className="max-w-4xl mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-white tracking-tight flex items-center">
          <Heart className="mr-3 text-pink-600 dark:text-pink-400" size={32} />
          HeartLink
        </h1>
        <p className="mt-2 text-stone-500 dark:text-stone-400">
          Your small group for discipleship, connection, and spiritual growth.
        </p>
      </div>

      {myGroup ? (
        <div className="bg-white dark:bg-stone-800 shadow-sm rounded-2xl border border-stone-100 dark:border-stone-700 overflow-hidden">
          <div className="p-6 sm:p-8 bg-pink-50 dark:bg-pink-900/20 border-b border-pink-100 dark:border-pink-900/50">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">{myGroup.name}</h2>
            <p className="text-stone-600 dark:text-stone-300">{myGroup.description}</p>
          </div>
          
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">Group Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-pink-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-stone-900 dark:text-white">Schedule</p>
                      <p className="text-sm text-stone-600 dark:text-stone-300">{myGroup.schedule}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-pink-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-stone-900 dark:text-white">Location</p>
                      <p className="text-sm text-stone-600 dark:text-stone-300">{myGroup.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-pink-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-stone-900 dark:text-white">Leader</p>
                      <p className="text-sm text-stone-600 dark:text-stone-300">{leader?.email || 'Assigned Leader'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-stone-50 dark:bg-stone-700/50 rounded-xl p-6 border border-stone-100 dark:border-stone-600">
              <h3 className="text-sm font-medium text-stone-900 dark:text-white mb-4">Recent Activity</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 italic">No recent activity to show.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-stone-800 shadow-sm rounded-2xl border border-stone-100 dark:border-stone-700 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center mb-4 text-pink-600 dark:text-pink-400">
            <Heart size={32} />
          </div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-2">Not Assigned Yet</h2>
          <p className="text-stone-500 dark:text-stone-400 max-w-md mx-auto mb-6">
            You haven't been assigned to a HeartLink group yet. A leader will reach out to connect you soon!
          </p>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors">
            Request to Join a Group
          </button>
        </div>
      )}
    </div>
  );
};

export default HeartLink;
