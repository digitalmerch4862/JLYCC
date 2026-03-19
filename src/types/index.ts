export type Role = 'Admin' | 'Pastor' | 'Inner Core' | 'Ministry Leader' | 'HeartLink Leader' | 'ISU Leader' | 'Member' | 'Visitor';

export type JourneyStage = 
  | 'Welcome to JLYCC'
  | 'Complete your profile'
  | 'Attend your first Sunday service'
  | 'Attend again / become returning member'
  | 'Join a HeartLink group'
  | 'Start ISU / foundations'
  | 'Explore church ministries'
  | 'Select at least 3 ministry interests'
  | 'Meet or connect with a leader'
  | 'Begin serving or joining regularly'
  | 'Become an active regular member'
  | 'Grow toward leadership or deeper discipleship';

export interface User {
  id: string;
  email: string;
  role: Role;
  isActive: boolean;
}

export interface MemberProfile {
  id: string;
  userId: string;
  fullName: string;
  preferredName: string;
  displayName: string;
  shortDisplayName: string;
  gender: 'Male' | 'Female' | 'Other';
  birthday: string;
  age: number;
  mobileNumber: string;
  address: string;
  city?: string;
  occupationSchool: string;
  facebookProfile?: string;
  telegramUsername?: string;
  preferredContact?: string;
  emergencyContact: string;
  civilStatus?: string;
  currentChurchStatus: string;
  firstAttendedDate: string;
  invitedBy?: string;
  ministriesOfInterest: string[];
  assignedHeartLinkId?: string;
  assignedLeaderId?: string;
  profileCompleted: boolean;
  qrCodeValue: string;
  journeyStage: JourneyStage;
  preferredGroupVibe?: string;
  currentSeason?: string;
  activitiesHobbies?: string[];
  preferredDaysToMeet?: string[];
  vehicleManufacturer?: string;
  vehicleModel?: string;
  vehicleColor?: string;
  vehiclePlateNumber?: string;
  profilePhotoUrl?: string;
  faceDescriptor?: number[];
}

export interface Ministry {
  id: string;
  name: string;
  category: string;
  description: string;
  purpose: string;
  ageGroup: string;
  leaderId?: string;
  active: boolean;
}

export interface HeartLinkGroup {
  id: string;
  name: string;
  description: string;
  leaderId: string;
  assistantLeaderId?: string;
  schedule: string;
  location: string;
  active: boolean;
}

export interface ISUCourse {
  id: string;
  title: string;
  description: string;
  active: boolean;
}

export interface ISULesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  orderNumber: number;
}

export interface Event {
  id: string;
  title: string;
  eventType: 'Sunday Service' | 'Special Service' | 'Ministry Meeting' | 'HeartLink Gathering' | 'ISU Class' | 'Training' | 'Leadership Meeting' | 'Conference' | 'Outreach';
  relatedMinistryId?: string;
  relatedHeartLinkId?: string;
  location: string;
  startDatetime: string;
  endDatetime: string;
  active: boolean;
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  eventId: string;
  attendanceType: string;
  attendanceStatus: 'Present' | 'Absent' | 'Late' | 'Excused';
  checkinMethod: 'QR Scan' | 'Manual' | 'Override';
  checkinTime: string;
  recordedBy: string;
  notes?: string;
}
