import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { dummyUsers } from '../data/dummyUsers';
import { User, Role } from '../types/crm';
import { Phone, Mail, Search } from 'lucide-react';

const CRM = () => {
  const { currentUser } = useAppContext();
  const role = currentUser?.role || 'Member';
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = dummyUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleChange = (userId: string, newRole: Role) => {
    console.log(`Updating user ${userId} to role ${newRole}`);
  };

  const ContactActions = ({ user }: { user: User }) => (
    <div className="flex gap-2">
      <a href={`tel:${user.phone}`} className="p-2 bg-accent/10 text-accent rounded-full hover:bg-accent/20" title="Call">
        <Phone size={16} />
      </a>
      <a href={`mailto:${user.email}`} className="p-2 bg-accent/10 text-accent rounded-full hover:bg-accent/20" title="Email">
        <Mail size={16} />
      </a>
    </div>
  );

  const renderAdminView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin CRM: All Users</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search members..." 
            className="pl-10 pr-4 py-2 bg-surface rounded-lg border border-surface focus:ring-2 focus:ring-accent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="bg-surface rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-secondary">
            <tr className="border-b border-surface">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Contact</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b border-surface hover:bg-surface-secondary">
                <td className="p-4">{user.name}</td>
                <td className="p-4">
                  <select 
                    value={user.role} 
                    onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                    className="bg-surface border border-surface rounded p-1"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Inner Core">Inner Core</option>
                    <option value="Joshua Gen">Joshua Gen</option>
                    <option value="Member">Member</option>
                  </select>
                </td>
                <td className="p-4"><ContactActions user={user} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderLeaderView = () => {
    const leaderName = currentUser?.email.split('@')[0];
    const leader = dummyUsers.find(u => u.name === leaderName || u.role === 'Leader');
    const members = dummyUsers.filter(u => u.leaderId === leader?.id);
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">CRM Group View</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map(member => (
            <div key={member.id} className="bg-surface p-4 rounded-lg shadow flex flex-col justify-between">
              <div>
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-text-secondary">Member</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <ContactActions user={member} />
                <button className="text-accent text-sm hover:underline">View Progress</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMemberView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My CRM Profile</h2>
      <div className="bg-surface p-6 rounded-lg shadow">
        <p className="text-lg">Welcome, <span className="font-bold text-accent">{currentUser?.email}</span>.</p>
        <p className="mt-2">You are a regular member.</p>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {role === 'Admin' && renderAdminView()}
      {(role === 'Inner Core' || role === 'Joshua Gen') && renderLeaderView()}
      {role === 'Member' && renderMemberView()}
    </div>
  );
};

export default CRM;
