import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { CalendarCheck, QrCode, Search, Filter, Users, Activity } from 'lucide-react';

const Attendance = () => {
  const { currentProfile, attendance, events, ministries } = useAppContext();
  const [filter, setFilter] = useState('All');

  if (!currentProfile) return <div>Loading...</div>;

  const myAttendance = attendance.filter(a => a.memberId === currentProfile.id);
  
  const filteredAttendance = filter === 'All' 
    ? myAttendance 
    : myAttendance.filter(a => events.find(e => e.id === a.eventId)?.eventType === filter);

  const getEventDetails = (eventId: string) => {
    return events.find(e => e.id === eventId);
  };

  const myMinistries = ministries.filter(m => currentProfile.ministriesOfInterest?.includes(m.id));

  return (
    <div className="max-w-6xl mx-auto font-sans">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-white tracking-tight flex items-center">
            <Activity className="mr-3 text-pink-600 dark:text-pink-400" size={32} />
            My Analytics
          </h1>
          <p className="mt-2 text-stone-500 dark:text-stone-400">
            View your attended events and ministry involvement.
          </p>
        </div>
      </div>

      {/* Ministries Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-4 flex items-center">
          <Users className="mr-2 text-pink-500" size={24} />
          Ministries Involved In
        </h2>
        {myMinistries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myMinistries.map(ministry => (
              <div key={ministry.id} className="bg-white dark:bg-stone-800 p-4 rounded-xl shadow-sm border border-stone-100 dark:border-stone-700 flex items-center">
                <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400 mr-4 shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 dark:text-white">{ministry.name}</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-1">{ministry.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-stone-800 p-6 rounded-xl shadow-sm border border-stone-100 dark:border-stone-700 text-center">
            <p className="text-stone-500 dark:text-stone-400">You are not currently involved in any ministries.</p>
          </div>
        )}
      </div>

      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center">
          <CalendarCheck className="mr-2 text-pink-500" size={24} />
          Events Attended
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-stone-300 dark:border-stone-600 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-lg bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm transition-colors"
            >
              <option value="All">All Events</option>
              <option value="Sunday Service">Sunday Service</option>
              <option value="HeartLink Gathering">HeartLink</option>
              <option value="ISU Class">ISU Class</option>
              <option value="Ministry Meeting">Ministry</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-stone-800 shadow-sm rounded-2xl border border-stone-100 dark:border-stone-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-200 dark:divide-stone-700">
            <thead className="bg-stone-50 dark:bg-stone-900/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Event
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Method
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-stone-800 divide-y divide-stone-200 dark:divide-stone-700">
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((record) => {
                  const event = getEventDetails(record.eventId);
                  return (
                    <tr key={record.id} className="hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900 dark:text-white">
                        {new Date(record.checkinTime).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900 dark:text-white">
                        {event?.title || 'Unknown Event'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 dark:text-stone-400">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 dark:bg-stone-700 text-stone-800 dark:text-stone-200">
                          {event?.eventType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          record.attendanceStatus === 'Present' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                          record.attendanceStatus === 'Late' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {record.attendanceStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 dark:text-stone-400 flex items-center">
                        {record.checkinMethod === 'QR Scan' ? (
                          <QrCode className="h-4 w-4 mr-1 text-pink-500" />
                        ) : null}
                        {record.checkinMethod}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-stone-500 dark:text-stone-400">
                    <CalendarCheck className="mx-auto h-12 w-12 text-stone-300 dark:text-stone-600 mb-3" />
                    No attendance records found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
