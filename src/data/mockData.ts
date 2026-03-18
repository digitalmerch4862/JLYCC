import { User, MemberProfile, Ministry, HeartLinkGroup, ISUCourse, ISULesson, Event, AttendanceRecord } from '../types';

export const MOCK_USERS: User[] = [
  { id: 'u1', email: 'admin@jlycc.org', role: 'Admin', isActive: true },
  { id: 'u2', email: 'pastor@jlycc.org', role: 'Pastor', isActive: true },
  { id: 'u3', email: 'leader1@jlycc.org', role: 'Ministry Leader', isActive: true },
  { id: 'u4', email: 'hl_leader1@jlycc.org', role: 'HeartLink Leader', isActive: true },
  { id: 'u5', email: 'member1@gmail.com', role: 'Member', isActive: true },
  { id: 'u6', email: 'visitor1@gmail.com', role: 'Visitor', isActive: true },
];

export const MOCK_PROFILES: MemberProfile[] = [
  {
    id: 'p1', userId: 'u1', fullName: 'Admin User', preferredName: 'Admin', displayName: 'Admin User',
    shortDisplayName: 'Admin U.', gender: 'Male', birthday: '1980-01-01', age: 46, mobileNumber: '09171234567',
    address: 'Manila', occupationSchool: 'IT', emergencyContact: '09181234567', currentChurchStatus: 'Active',
    firstAttendedDate: '2010-01-01', ministriesOfInterest: [], profileCompleted: true, qrCodeValue: 'QR_u1',
    journeyStage: 'Grow toward leadership or deeper discipleship'
  },
  {
    id: 'p5', userId: 'u5', fullName: 'Robert Garcia', preferredName: 'Rob', displayName: 'Robert Garcia',
    shortDisplayName: 'Robert G.', gender: 'Male', birthday: '1995-05-15', age: 30, mobileNumber: '09191234567',
    address: 'Quezon City', occupationSchool: 'Engineer', emergencyContact: '09201234567', currentChurchStatus: 'Regular Member',
    firstAttendedDate: '2023-01-10', ministriesOfInterest: ['m1', 'm2'], assignedHeartLinkId: 'hl1', profileCompleted: true,
    qrCodeValue: 'QR_u5', journeyStage: 'Begin serving or joining regularly',
    vehicleManufacturer: 'Toyota', vehicleModel: 'Fortuner', vehicleColor: 'Black', vehiclePlateNumber: 'ABC1234'
  },
  {
    id: 'p6', userId: 'u6', fullName: 'Maria Santos Cruz', preferredName: 'Maria', displayName: 'Maria Santos Cruz',
    shortDisplayName: 'Maria S.', gender: 'Female', birthday: '2000-08-20', age: 25, mobileNumber: '09211234567',
    address: 'Makati', occupationSchool: 'Student', emergencyContact: '09221234567', currentChurchStatus: 'Visitor',
    firstAttendedDate: '2026-03-10', ministriesOfInterest: [], profileCompleted: false, qrCodeValue: '',
    journeyStage: 'Welcome to JLYCC'
  }
];

export const MOCK_MINISTRIES: Ministry[] = [
  { id: 'm1', name: 'KingdomKids', category: 'Age / Life Stage', description: 'Ages 4 to 12', purpose: 'To raise the next generation of believers.', ageGroup: '4-12', active: true },
  { id: 'm2', name: 'LeadTakers Youth', category: 'Age / Life Stage', description: 'Ages 13 to college students', purpose: 'Empowering the youth to lead.', ageGroup: '13-22', active: true },
  { id: 'm3', name: 'LeadTakers Pro', category: 'Age / Life Stage', description: 'Young adults and professionals', purpose: 'Navigating career and faith.', ageGroup: '23-35', active: true },
  { id: 'm4', name: 'D818', category: 'Age / Life Stage', description: 'Businessmen', purpose: 'Faith in the marketplace.', ageGroup: 'Adults', active: true },
  { id: 'm5', name: 'Davidic Symphonia', category: 'Service / Volunteer', description: 'Worship team, singers, musicians', purpose: 'Leading the congregation in worship.', ageGroup: 'All', active: true },
  { id: 'm6', name: 'Move', category: 'Service / Volunteer', description: 'Dance ministry', purpose: 'Worship through movement.', ageGroup: 'All', active: true },
  { id: 'm7', name: 'Zoom', category: 'Service / Volunteer', description: 'Multimedia, streaming, cameras, visuals', purpose: 'Enhancing the visual experience.', ageGroup: 'All', active: true },
  { id: 'm8', name: 'Technical and Sound', category: 'Service / Volunteer', description: 'Audio and tech support', purpose: 'Ensuring clear communication of the Word.', ageGroup: 'All', active: true },
];

export const MOCK_HEARTLINKS: HeartLinkGroup[] = [
  { id: 'hl1', name: 'Grace Group', description: 'Young professionals meeting in QC', leaderId: 'u4', schedule: 'Fridays 7PM', location: 'QC Cafe', active: true },
  { id: 'hl2', name: 'Faith Builders', description: 'Youth group', leaderId: 'u3', schedule: 'Saturdays 4PM', location: 'Church Hall', active: true },
];

export const MOCK_ISU_COURSES: ISUCourse[] = [
  { id: 'c1', title: 'Foundations of Faith', description: 'Basic doctrines of JLYCC', active: true },
];

export const MOCK_ISU_LESSONS: ISULesson[] = [
  { id: 'l1', courseId: 'c1', title: 'Salvation', description: 'Understanding the gift of salvation', orderNumber: 1 },
  { id: 'l2', courseId: 'c1', title: 'Faith', description: 'Living by faith', orderNumber: 2 },
  { id: 'l3', courseId: 'c1', title: 'Church Vision', description: 'The vision of JLYCC', orderNumber: 3 },
  { id: 'l4', courseId: 'c1', title: 'Christian Walk', description: 'Daily living as a believer', orderNumber: 4 },
  { id: 'l5', courseId: 'c1', title: 'Discipleship', description: 'Making disciples', orderNumber: 5 },
  { id: 'l6', courseId: 'c1', title: 'Serving in Church', description: 'Finding your place in ministry', orderNumber: 6 },
];

export const MOCK_EVENTS: Event[] = [
  { id: 'e1', title: 'Sunday Celebration Service', eventType: 'Sunday Service', location: 'Main Sanctuary', startDatetime: '2026-03-15T10:00:00Z', endDatetime: '2026-03-15T12:00:00Z', active: true },
  { id: 'e2', title: 'HeartLink Friday', eventType: 'HeartLink Gathering', relatedHeartLinkId: 'hl1', location: 'QC Cafe', startDatetime: '2026-03-20T19:00:00Z', endDatetime: '2026-03-20T21:00:00Z', active: true },
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'a1', memberId: 'p5', eventId: 'e1', attendanceType: 'Regular', attendanceStatus: 'Present', checkinMethod: 'QR Scan', checkinTime: '2026-03-15T09:45:00Z', recordedBy: 'u1' },
];
