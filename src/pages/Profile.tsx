import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { User, Save, CheckCircle, Camera, X } from 'lucide-react';
import Webcam from 'react-webcam';

import * as faceapi from 'face-api.js';

const Profile = () => {
  const { currentProfile, updateProfile } = useAppContext();
  const [formData, setFormData] = useState(currentProfile || {});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'; // Need to ensure models are served from here
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (currentProfile) {
      setFormData(currentProfile);
    }
  }, [currentProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const { value, checked } = e.target;
    setFormData((prev: any) => {
      const currentArray = prev[fieldName] || [];
      if (checked) {
        return { ...prev, [fieldName]: [...currentArray, value] };
      } else {
        return { ...prev, [fieldName]: currentArray.filter((item: string) => item !== value) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Calculate age if birthday is provided
    let age = formData.age;
    if (formData.birthday) {
      const birthDate = new Date(formData.birthday);
      const today = new Date();
      age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
    }

    // Check if profile is complete (basic required fields)
    const isComplete = !!(
      formData.fullName && 
      formData.preferredName && 
      formData.mobileNumber && 
      formData.address && 
      formData.emergencyContact
    );

    setTimeout(() => {
      updateProfile({
        ...formData,
        age,
        profileCompleted: isComplete
      });
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  if (!currentProfile) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-white tracking-tight flex items-center">
          <User className="mr-3 text-pink-600 dark:text-pink-400" size={32} />
          My Profile
        </h1>
        <p className="mt-2 text-stone-500 dark:text-stone-400">
          Complete your profile to generate your QR ID and help us connect you to the right ministries.
        </p>
      </div>

      <div className="bg-white dark:bg-stone-800 shadow-sm rounded-2xl border border-stone-100 dark:border-stone-700 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          {/* Profile Photo */}
          <div>
            <h3 className="text-lg font-semibold leading-6 text-stone-900 dark:text-white mb-4 border-b border-stone-100 dark:border-stone-700 pb-2">
              Profile Photo
            </h3>
            <div className="flex items-center space-x-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-stone-100 dark:bg-stone-700 border-2 border-stone-200 dark:border-stone-600">
                {formData.profilePhotoUrl ? (
                  <img src={formData.profilePhotoUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-stone-400">
                    <User size={48} />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowWebcam(true)}
                className="flex items-center px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg text-sm font-medium text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-700 hover:bg-stone-50 dark:hover:bg-stone-600"
              >
                <Camera className="mr-2" size={18} />
                Take Photo
              </button>
            </div>
          </div>

          {/* Webcam Modal */}
          {showWebcam && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-stone-800 p-4 rounded-2xl shadow-xl">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="rounded-lg"
                  videoConstraints={{ facingMode: "user" }}
                  mirrored={true}
                  screenshotQuality={0.8}
                  disablePictureInPicture={true}
                  forceScreenshotSourceSize={true}
                  imageSmoothing={true}
                  onUserMedia={() => console.log("Webcam user media loaded")}
                  onUserMediaError={(err) => console.error("Webcam user media error:", err)}
                />
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setShowWebcam(false)}
                    className="px-4 py-2 text-stone-600 dark:text-stone-400"
                  >
                    <X size={24} />
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      console.log("Capture button clicked");
                      const imageSrc = webcamRef.current?.getScreenshot();
                      console.log("imageSrc:", imageSrc ? "got image" : "no image");
                      if (imageSrc) {
                        try {
                          const img = await faceapi.fetchImage(imageSrc);
                          console.log("Image fetched");
                          const detection = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
                          console.log("Detection:", detection);
                          if (detection) {
                            setFormData((prev: any) => ({ 
                              ...prev, 
                              profilePhotoUrl: imageSrc,
                              faceDescriptor: Array.from(detection.descriptor)
                            }));
                            setShowWebcam(false);
                          } else {
                            alert("No face detected. Please try again.");
                          }
                        } catch (error) {
                          console.error("Error during face detection:", error);
                          alert("Error detecting face. Please try again.");
                        }
                      } else {
                        alert("Could not capture image. Please try again.");
                      }
                    }}
                    disabled={!modelsLoaded}
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg disabled:opacity-50"
                  >
                    {modelsLoaded ? 'Capture' : 'Loading Models...'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold leading-6 text-stone-900 dark:text-white mb-4 border-b border-stone-100 dark:border-stone-700 pb-2">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="fullName" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    required
                    value={formData.fullName || ''}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="preferredName" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Preferred Name / Nickname <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="preferredName"
                    id="preferredName"
                    required
                    value={formData.preferredName || ''}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="gender" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Gender
                </label>
                <div className="mt-1">
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender || ''}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-white"
                  >
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="birthday" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Birthday
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="birthday"
                    id="birthday"
                    value={formData.birthday || ''}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="city" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  City
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.city || ''}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="civilStatus" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Civil Status
                </label>
                <div className="mt-1">
                  <select
                    id="civilStatus"
                    name="civilStatus"
                    value={formData.civilStatus || ''}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-white"
                  >
                    <option value="">Select...</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Separated">Separated</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold leading-6 text-stone-900 dark:text-white mb-4 border-b border-stone-100 dark:border-stone-700 pb-2">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="preferredContact" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Preferred Contact Method
                </label>
                <div className="mt-1">
                  <select
                    id="preferredContact"
                    name="preferredContact"
                    value={formData.preferredContact || ''}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-white"
                  >
                    <option value="">Select...</option>
                    <option value="Mobile Number">Mobile Number</option>
                    <option value="Facebook/Messenger">Facebook/Messenger</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    name="mobileNumber"
                    id="mobileNumber"
                    required
                    value={formData.mobileNumber || ''}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="emergencyContact" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Emergency Contact Number <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    name="emergencyContact"
                    id="emergencyContact"
                    required
                    value={formData.emergencyContact || ''}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="address" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Home Address <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    required
                    value={formData.address || ''}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="facebookProfile" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Facebook / Messenger Link
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-800 text-stone-500 dark:text-stone-400 sm:text-sm">
                    fb.com/
                  </span>
                  <input
                    type="text"
                    name="facebookProfile"
                    id="facebookProfile"
                    value={formData.facebookProfile || ''}
                    onChange={handleChange}
                    className="flex-1 focus:ring-pink-500 focus:border-pink-500 block w-full min-w-0 rounded-none rounded-r-lg sm:text-sm border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-900 dark:text-white"
                  />
                </div>
                <p className="mt-1.5 text-xs text-stone-500 dark:text-stone-400">
                  <span className="font-medium">How to find:</span> Go to your FB profile, tap the 3 dots (...), and select "Copy Link to Profile".
                </p>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="telegramUsername" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Telegram Username
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-800 text-stone-500 dark:text-stone-400 sm:text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    name="telegramUsername"
                    id="telegramUsername"
                    value={formData.telegramUsername || ''}
                    onChange={handleChange}
                    className="flex-1 focus:ring-pink-500 focus:border-pink-500 block w-full min-w-0 rounded-none rounded-r-lg sm:text-sm border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-900 dark:text-white"
                  />
                </div>
                <p className="mt-1.5 text-xs text-stone-500 dark:text-stone-400">
                  <span className="font-medium">How to find:</span> Open Telegram Settings &gt; My Profile to see your @username.
                </p>
              </div>

              <div className="sm:col-span-6 mt-4 border-t border-stone-100 dark:border-stone-700 pt-6">
                <h4 className="text-md font-medium text-stone-900 dark:text-white mb-4">Vehicle Information</h4>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-4">
                  <div className="sm:col-span-1">
                    <label htmlFor="vehicleManufacturer" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                      Manufacturer
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="vehicleManufacturer"
                        id="vehicleManufacturer"
                        placeholder="e.g. Toyota"
                        value={formData.vehicleManufacturer || ''}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="vehicleModel" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                      Model
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="vehicleModel"
                        id="vehicleModel"
                        placeholder="e.g. Fortuner"
                        value={formData.vehicleModel || ''}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="vehicleColor" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                      Color
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="vehicleColor"
                        id="vehicleColor"
                        placeholder="e.g. Black"
                        value={formData.vehicleColor || ''}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="vehiclePlateNumber" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                      Plate Number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="vehiclePlateNumber"
                        id="vehiclePlateNumber"
                        placeholder="e.g. ABC1234"
                        value={formData.vehiclePlateNumber || ''}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h3 className="text-lg font-semibold leading-6 text-stone-900 dark:text-white mb-4 border-b border-stone-100 dark:border-stone-700 pb-2">
              Preferences & Interests
            </h3>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="preferredGroupVibe" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Preferred Group Vibe
                </label>
                <div className="mt-1">
                  <select
                    id="preferredGroupVibe"
                    name="preferredGroupVibe"
                    value={formData.preferredGroupVibe || ''}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-white"
                  >
                    <option value="">Select...</option>
                    <option value="I'm okay with anything">I'm okay with anything</option>
                    <option value="Around my age">Around my age</option>
                    <option value="Mixed ages">Mixed ages</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="currentSeason" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Current Season
                </label>
                <div className="mt-1">
                  <select
                    id="currentSeason"
                    name="currentSeason"
                    value={formData.currentSeason || ''}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-white"
                  >
                    <option value="">Select...</option>
                    <option value="Student">Student</option>
                    <option value="Focused on home/family">Focused on home/family</option>
                    <option value="Early Career">Early Career</option>
                    <option value="Established in Career">Established in Career</option>
                    <option value="Transitioning/Exploring">Transitioning/Exploring</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Activities / Hobbies
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Fitness/Sports', 'Music/Singing/Instruments', 'Food/Cafe Hopping', 'Arts/Crafts', 'Volunteering'].map((activity) => (
                    <div key={activity} className="flex items-center">
                      <input
                        id={`activity-${activity}`}
                        name="activitiesHobbies"
                        type="checkbox"
                        value={activity}
                        checked={(formData.activitiesHobbies || []).includes(activity)}
                        onChange={(e) => handleArrayChange(e, 'activitiesHobbies')}
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-stone-300 rounded dark:border-stone-600 dark:bg-stone-700"
                      />
                      <label htmlFor={`activity-${activity}`} className="ml-2 block text-sm text-stone-900 dark:text-stone-300">
                        {activity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Preferred Days to Meet
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Flexible'].map((day) => (
                    <div key={day} className="flex items-center">
                      <input
                        id={`day-${day}`}
                        name="preferredDaysToMeet"
                        type="checkbox"
                        value={day}
                        checked={(formData.preferredDaysToMeet || []).includes(day)}
                        onChange={(e) => handleArrayChange(e, 'preferredDaysToMeet')}
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-stone-300 rounded dark:border-stone-600 dark:bg-stone-700"
                      />
                      <label htmlFor={`day-${day}`} className="ml-2 block text-sm text-stone-900 dark:text-stone-300">
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-stone-100 dark:border-stone-700 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex justify-center items-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 transition-colors"
            >
              {isSaving ? (
                'Saving...'
              ) : saveSuccess ? (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  Save Profile
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
