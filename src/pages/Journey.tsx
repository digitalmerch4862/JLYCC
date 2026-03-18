import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Map, CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { JourneyStage } from '../types';

const Journey = () => {
  const { currentProfile } = useAppContext();

  if (!currentProfile) return <div>Loading...</div>;

  const journeySteps: JourneyStage[] = [
    'Welcome to JLYCC',
    'Complete your profile',
    'Attend your first Sunday service',
    'Attend again / become returning member',
    'Join a HeartLink group',
    'Start ISU / foundations',
    'Explore church ministries',
    'Select at least 3 ministry interests',
    'Meet or connect with a leader',
    'Begin serving or joining regularly',
    'Become an active regular member',
    'Grow toward leadership or deeper discipleship'
  ];

  const currentStageIndex = journeySteps.indexOf(currentProfile.journeyStage);
  const progressPercentage = Math.round(((currentStageIndex + 1) / journeySteps.length) * 100);

  return (
    <div className="max-w-3xl mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-white tracking-tight flex items-center">
          <Map className="mr-3 text-pink-600 dark:text-pink-400" size={32} />
          My Journey
        </h1>
        <p className="mt-2 text-stone-500 dark:text-stone-400">
          Track your spiritual growth and find your next step in JLYCC.
        </p>
      </div>

      <div className="bg-white dark:bg-stone-800 shadow-sm rounded-2xl border border-stone-100 dark:border-stone-700 overflow-hidden mb-8">
        <div className="p-6 sm:p-8 bg-pink-50 dark:bg-pink-900/20 border-b border-pink-100 dark:border-pink-900/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-white">Current Stage</h2>
              <p className="text-pink-600 dark:text-pink-400 font-semibold mt-1 text-lg">
                {currentProfile.journeyStage}
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <span className="text-3xl font-extrabold text-stone-900 dark:text-white">{progressPercentage}%</span>
              <span className="text-sm font-medium text-stone-500 dark:text-stone-400 ml-1">Completed</span>
            </div>
          </div>
          <div className="mt-6 relative pt-1">
            <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-pink-200 dark:bg-stone-700">
              <div 
                style={{ width: `${progressPercentage}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500 transition-all duration-1000 ease-out"
              ></div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-6">Your Path</h3>
          <div className="relative border-l-2 border-stone-200 dark:border-stone-700 ml-3 md:ml-4 space-y-8">
            {journeySteps.map((step, index) => {
              const isCompleted = index <= currentStageIndex;
              const isCurrent = index === currentStageIndex;
              const isNext = index === currentStageIndex + 1;

              return (
                <div key={step} className="relative pl-8 md:pl-10">
                  <div className={`absolute -left-[9px] md:-left-[11px] top-1 rounded-full bg-white dark:bg-stone-800 p-0.5`}>
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-emerald-500 bg-white dark:bg-stone-800 rounded-full" />
                    ) : isCurrent ? (
                      <div className="h-4 w-4 md:h-5 md:w-5 rounded-full border-2 border-pink-500 bg-white dark:bg-stone-800" />
                    ) : (
                      <Circle className="h-4 w-4 md:h-5 md:w-5 text-stone-300 dark:text-stone-600 bg-white dark:bg-stone-800 rounded-full" />
                    )}
                  </div>
                  
                  <div>
                    <h4 className={`text-base font-medium ${
                      isCompleted ? 'text-stone-900 dark:text-white' : 
                      isCurrent ? 'text-pink-600 dark:text-pink-400 font-bold' : 
                      'text-stone-500 dark:text-stone-400'
                    }`}>
                      {step}
                    </h4>
                    
                    {isCurrent && (
                      <div className="mt-3 p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl border border-stone-100 dark:border-stone-600">
                        <p className="text-sm text-stone-600 dark:text-stone-300">
                          You are currently here. Keep going!
                        </p>
                      </div>
                    )}

                    {isNext && (
                      <div className="mt-2">
                        <span className="inline-flex items-center text-xs font-medium text-pink-600 dark:text-pink-400">
                          Next Step <ArrowRight className="ml-1 h-3 w-3" />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
