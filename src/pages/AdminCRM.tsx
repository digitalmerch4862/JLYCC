import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { User, Search, Filter, AlertCircle } from 'lucide-react';

const AdminCRM = () => {
  const { profiles, users, ministries, attendance } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const getMinistryNames = (ministryIds: string[]) => {
    return ministryIds
      .map(id => ministries.find(m => m.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const getActivityCount = (userId: string) => {
    return attendance.filter(a => a.userId === userId).length;
  };

  const filteredProfiles = profiles.filter(profile => 
    profile.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto font-sans p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary tracking-tight flex items-center">
          <User className="mr-3 text-accent" size={32} />
          Member CRM
        </h1>
        <p className="mt-2 text-text-secondary">
          Manage and view all member profiles, roles, ministry involvement, and activity levels.
        </p>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-surface rounded-lg bg-surface text-text-primary focus:ring-accent focus:border-accent"
          />
        </div>
        <button className="flex items-center px-4 py-2 border border-surface rounded-lg text-sm font-medium text-text-secondary bg-surface hover:bg-surface/80">
          <Filter className="mr-2" size={18} />
          Filter
        </button>
      </div>

      <div className="bg-surface shadow-sm rounded-2xl border border-surface overflow-hidden">
        <table className="min-w-full divide-y divide-surface">
          <thead className="bg-bg">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Ministries</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Activities</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-surface">
            {filteredProfiles.map(profile => {
              const user = users.find(u => u.id === profile.userId);
              const role = user?.role || 'Member';
              const ministryNames = getMinistryNames(profile.ministriesOfInterest);
              const activityCount = getActivityCount(profile.userId);
              const needsGuidance = activityCount < 2;

              return (
                <tr key={profile.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-bg overflow-hidden mr-3">
                        {profile.profilePhotoUrl ? (
                          <img src={profile.profilePhotoUrl} alt={profile.fullName} className="h-full w-full object-cover" />
                        ) : (
                          <User className="h-full w-full p-2 text-text-secondary" />
                        )}
                      </div>
                      <div className="text-sm font-medium text-text-primary">{profile.fullName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      role.includes('Leader') || role === 'Admin' || role === 'Pastor' 
                        ? 'bg-accent/20 text-accent' 
                        : 'bg-bg text-text-secondary'
                    }`}>
                      {role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {ministryNames || 'None'}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {activityCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {needsGuidance ? (
                      <span className="flex items-center text-red-500 font-medium">
                        <AlertCircle size={16} className="mr-1" />
                        Needs Guidance
                      </span>
                    ) : (
                      <span className="text-emerald-500 font-medium">Active</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCRM;
