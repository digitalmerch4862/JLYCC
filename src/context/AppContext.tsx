import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, MemberProfile, Ministry, HeartLinkGroup, ISUCourse, ISULesson, Event, AttendanceRecord } from '../types';
import { MOCK_USERS, MOCK_PROFILES, MOCK_MINISTRIES, MOCK_HEARTLINKS, MOCK_ISU_COURSES, MOCK_ISU_LESSONS, MOCK_EVENTS, MOCK_ATTENDANCE } from '../data/mockData';

interface AppState {
  currentUser: User | null;
  currentProfile: MemberProfile | null;
  users: User[];
  profiles: MemberProfile[];
  ministries: Ministry[];
  heartLinks: HeartLinkGroup[];
  isuCourses: ISUCourse[];
  isuLessons: ISULesson[];
  events: Event[];
  attendance: AttendanceRecord[];
}

interface AppContextType extends AppState {
  login: (email: string) => void;
  logout: () => void;
  updateProfile: (profile: Partial<MemberProfile>) => void;
  addAttendance: (record: Omit<AttendanceRecord, 'id'>) => void;
  addMinistryInterest: (ministryIds: string[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    currentUser: null,
    currentProfile: null,
    users: MOCK_USERS,
    profiles: MOCK_PROFILES,
    ministries: MOCK_MINISTRIES,
    heartLinks: MOCK_HEARTLINKS,
    isuCourses: MOCK_ISU_COURSES,
    isuLessons: MOCK_ISU_LESSONS,
    events: MOCK_EVENTS,
    attendance: MOCK_ATTENDANCE,
  });

  const login = (email: string) => {
    const user = state.users.find((u) => u.email === email);
    if (user) {
      const profile = state.profiles.find((p) => p.userId === user.id) || null;
      setState((prev) => ({ ...prev, currentUser: user, currentProfile: profile }));
    } else {
      alert('User not found. Try admin@jlycc.org or member1@gmail.com');
    }
  };

  const logout = () => {
    setState((prev) => ({ ...prev, currentUser: null, currentProfile: null }));
  };

  const updateProfile = (updatedData: Partial<MemberProfile>) => {
    if (!state.currentProfile) return;
    
    const newProfile = { ...state.currentProfile, ...updatedData };
    
    // Auto-generate short name if not exists and profile is being completed
    if (updatedData.fullName && !newProfile.shortDisplayName) {
      const parts = newProfile.fullName.split(' ');
      if (parts.length > 1) {
        newProfile.shortDisplayName = `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
      } else {
        newProfile.shortDisplayName = newProfile.fullName;
      }
    }

    // Auto-generate QR code if profile is completed
    if (newProfile.profileCompleted && !newProfile.qrCodeValue) {
      newProfile.qrCodeValue = `QR_${newProfile.userId}_${Date.now()}`;
    }

    setState((prev) => ({
      ...prev,
      currentProfile: newProfile,
      profiles: prev.profiles.map((p) => (p.id === newProfile.id ? newProfile : p)),
    }));
  };

  const addAttendance = (record: Omit<AttendanceRecord, 'id'>) => {
    const newRecord: AttendanceRecord = { ...record, id: `a${Date.now()}` };
    setState((prev) => ({
      ...prev,
      attendance: [...prev.attendance, newRecord],
    }));
  };

  const addMinistryInterest = (ministryIds: string[]) => {
    if (!state.currentProfile) return;
    const newProfile = { ...state.currentProfile, ministriesOfInterest: ministryIds };
    setState((prev) => ({
      ...prev,
      currentProfile: newProfile,
      profiles: prev.profiles.map((p) => (p.id === newProfile.id ? newProfile : p)),
    }));
  };

  return (
    <AppContext.Provider value={{ ...state, login, logout, updateProfile, addAttendance, addMinistryInterest }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
