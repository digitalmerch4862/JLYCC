import React from 'react';
import { useAppContext } from '../context/AppContext';
import { BookOpen, CheckCircle, Circle } from 'lucide-react';

const ISU = () => {
  const { currentProfile, isuCourses, isuLessons } = useAppContext();

  if (!currentProfile) return <div>Loading...</div>;

  // Mock progress for demo
  const mockProgress = {
    'l1': 'completed',
    'l2': 'completed',
    'l3': 'in-progress',
  };

  return (
    <div className="max-w-4xl mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-white tracking-tight flex items-center">
          <BookOpen className="mr-3 text-pink-600 dark:text-pink-400" size={32} />
          ISU Foundations
        </h1>
        <p className="mt-2 text-stone-500 dark:text-stone-400">
          Track your progress through the foundational teachings of JLYCC.
        </p>
      </div>

      {isuCourses.map(course => {
        const courseLessons = isuLessons.filter(l => l.courseId === course.id).sort((a, b) => a.orderNumber - b.orderNumber);
        
        return (
          <div key={course.id} className="bg-white dark:bg-stone-800 shadow-sm rounded-2xl border border-stone-100 dark:border-stone-700 overflow-hidden mb-8">
            <div className="p-6 sm:p-8 bg-pink-50 dark:bg-pink-900/20 border-b border-pink-100 dark:border-pink-900/50">
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">{course.title}</h2>
              <p className="text-stone-600 dark:text-stone-300">{course.description}</p>
            </div>
            
            <div className="p-0">
              <ul className="divide-y divide-stone-100 dark:divide-stone-700">
                {courseLessons.map((lesson) => {
                  const status = mockProgress[lesson.id as keyof typeof mockProgress] || 'not-started';
                  
                  return (
                    <li key={lesson.id} className="p-6 sm:p-8 hover:bg-stone-50 dark:hover:bg-stone-700/30 transition-colors">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          {status === 'completed' ? (
                            <CheckCircle className="h-6 w-6 text-emerald-500" />
                          ) : status === 'in-progress' ? (
                            <div className="h-6 w-6 rounded-full border-2 border-pink-500 flex items-center justify-center">
                              <div className="h-2 w-2 bg-pink-500 rounded-full"></div>
                            </div>
                          ) : (
                            <Circle className="h-6 w-6 text-stone-300 dark:text-stone-600" />
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-stone-900 dark:text-white">
                              Lesson {lesson.orderNumber}: {lesson.title}
                            </h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              status === 'completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                              status === 'in-progress' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300' :
                              'bg-stone-100 text-stone-800 dark:bg-stone-700 dark:text-stone-300'
                            }`}>
                              {status === 'completed' ? 'Completed' : status === 'in-progress' ? 'In Progress' : 'Not Started'}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{lesson.description}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ISU;
