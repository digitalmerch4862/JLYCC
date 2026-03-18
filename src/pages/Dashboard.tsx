import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { 
  User, QrCode, Map, Users, Heart, BookOpen, 
  CalendarCheck, Shield, ArrowRight, CheckCircle 
} from 'lucide-react';

const Dashboard = () => {
  const { currentUser, currentProfile, attendance, events } = useAppContext();

  if (!currentUser || !currentProfile) return <div>Loading...</div>;

  const myAttendance = attendance.filter(a => a.memberId === currentProfile.id);
  const recentAttendance = myAttendance.slice(-3).reverse();

  const getEventName = (eventId: string) => {
    return events.find(e => e.id === eventId)?.title || 'Unknown Event';
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Welcome Banner */}
      <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-700 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
            Welcome home, {currentProfile.preferredName}!
          </h2>
          <p className="text-stone-500 dark:text-stone-400 mt-1">
            We're glad you're here. You are currently a <span className="font-semibold text-pink-600 dark:text-pink-400">{currentProfile.currentChurchStatus}</span>.
          </p>
        </div>
        {!currentProfile.profileCompleted && (
          <div className="mt-4 md:mt-0">
            <Link to="/profile" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors">
              Complete Profile
              <ArrowRight className="ml-2 -mr-1 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-700 col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-4 flex items-center">
            <Map className="mr-2 text-pink-500" size={20} />
            Your Next Steps
          </h3>
          <div className="space-y-4">
            <div className="flex items-start p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl border border-stone-100 dark:border-stone-600">
              <div className="flex-shrink-0">
                {currentProfile.profileCompleted ? (
                  <CheckCircle className="h-6 w-6 text-emerald-500" />
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-pink-500 flex items-center justify-center text-xs font-bold text-pink-500">1</div>
                )}
              </div>
              <div className="ml-3 w-full">
                <h4 className="text-sm font-medium text-stone-900 dark:text-white">Complete your profile</h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Add your details to generate your QR ID.</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl border border-stone-100 dark:border-stone-600">
              <div className="flex-shrink-0">
                {currentProfile.assignedHeartLinkId ? (
                  <CheckCircle className="h-6 w-6 text-emerald-500" />
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-pink-500 flex items-center justify-center text-xs font-bold text-pink-500">2</div>
                )}
              </div>
              <div className="ml-3 w-full">
                <h4 className="text-sm font-medium text-stone-900 dark:text-white">Join a HeartLink</h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Connect with a small group for discipleship.</p>
                {!currentProfile.assignedHeartLinkId && (
                  <Link to="/heartlink" className="mt-2 inline-flex text-xs font-medium text-pink-600 dark:text-pink-400 hover:text-pink-500">
                    Find a group &rarr;
                  </Link>
                )}
              </div>
            </div>

            <div className="flex items-start p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl border border-stone-100 dark:border-stone-600">
              <div className="flex-shrink-0">
                {currentProfile.ministriesOfInterest.length >= 3 ? (
                  <CheckCircle className="h-6 w-6 text-emerald-500" />
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-pink-500 flex items-center justify-center text-xs font-bold text-pink-500">3</div>
                )}
              </div>
              <div className="ml-3 w-full">
                <h4 className="text-sm font-medium text-stone-900 dark:text-white">Explore Ministries</h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Select at least 3 ministries you're interested in.</p>
                {currentProfile.ministriesOfInterest.length < 3 && (
                  <Link to="/ministries" className="mt-2 inline-flex text-xs font-medium text-pink-600 dark:text-pink-400 hover:text-pink-500">
                    Browse ministries &rarr;
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* QR Code Widget */}
          <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-700 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center mb-3 text-pink-600 dark:text-pink-400">
              <QrCode size={24} />
            </div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-white">Your QR ID</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 mb-4">Use this for fast check-ins.</p>
            <Link to="/qr" className="w-full inline-flex justify-center items-center px-4 py-2 border border-stone-300 dark:border-stone-600 shadow-sm text-sm font-medium rounded-lg text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-700 hover:bg-stone-50 dark:hover:bg-stone-600 transition-colors">
              View QR Code
            </Link>
          </div>

          {/* Recent Attendance */}
          <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-700">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-white mb-4 flex items-center">
              <CalendarCheck className="mr-2 text-pink-500" size={16} />
              Recent Attendance
            </h3>
            {recentAttendance.length > 0 ? (
              <ul className="space-y-3">
                {recentAttendance.map(record => (
                  <li key={record.id} className="text-sm">
                    <div className="font-medium text-stone-800 dark:text-stone-200">{getEventName(record.eventId)}</div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      {new Date(record.checkinTime).toLocaleDateString()} • {record.attendanceStatus}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-stone-500 dark:text-stone-400 text-center py-4">No recent attendance records.</p>
            )}
            <Link to="/attendance" className="mt-4 block text-center text-xs font-medium text-pink-600 dark:text-pink-400 hover:text-pink-500">
              View all history &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
