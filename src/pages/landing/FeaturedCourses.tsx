import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Star, ArrowRight, Users, Clock, Award, Loader2 } from 'lucide-react';
import { coursesApi } from '../../services/coursesApi';
import type { Course } from '../../types';

export const FeaturedCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    coursesApi.getCourses()
      .then((res) => {
        if (isMounted) {
          setCourses(res || []);
        }
      })
      .catch(() => {
        if (isMounted) {
          setCourses([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          <span className="ml-3 text-slate-600 dark:text-slate-400 font-semibold">Kurslar yuklanmoqda...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" /> Interaktiv Kurslar Katalogi
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Eng Ommabop Onlayn & Offlayn Kurslar
          </h2>
        </div>
        <Link 
          to="/courses" 
          className="btn-secondary text-xs font-bold py-2.5 px-4 shadow-sm hover:shadow-indigo-500/20 flex items-center gap-2"
        >
          Barcha Kurslar <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Content Grid / Empty State */}
      {courses.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600 dark:text-slate-400 font-semibold">Hozircha kurslar mavjud emas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="glass-card glass-card-hover overflow-hidden flex flex-col justify-between group border-indigo-500/20 hover:border-indigo-500/50 shadow-xl transition-all duration-300"
            >
              <div>
                {/* Image & Header Overlay Badges */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={`${course.title} muqovasi`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80" />
                  
                  {/* Course Type Badge */}
                  <span className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg ${
                    course.type === 'online'
                      ? 'bg-indigo-600 text-white border border-indigo-400/40'
                      : course.type === 'offline'
                      ? 'bg-amber-500 text-slate-950 border border-amber-300/40'
                      : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border border-pink-400/40'
                  }`}>
                    {course.type}
                  </span>

                  {/* Rating Badge */}
                  <div className="absolute top-3.5 right-3.5 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-extrabold text-yellow-400 flex items-center gap-1 border border-yellow-500/40 shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" /> {course.rating} ({course.reviewsCount})
                  </div>

                  {/* Duration & Level Bar */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[11px] font-bold text-slate-200">
                    <span className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-slate-700/80">
                      <Clock className="w-3 h-3 text-indigo-400" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-slate-700/80">
                      <Award className="w-3 h-3 text-emerald-400" /> {course.level}
                    </span>
                  </div>
                </div>

                {/* Course Main Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="badge badge-indigo font-bold">{course.category}</span>
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1 font-bold">
                      <Users className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> {course.studentsCount} ta talaba
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Instructor Details */}
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                    <img
                      src={course.teacherAvatar}
                      alt={`${course.teacherName} rasmi`}
                      className="w-9 h-9 rounded-xl object-cover border-2 border-indigo-500/50 shadow-md"
                    />
                    <div>
                      <span className="block text-xs font-bold text-slate-900 dark:text-white">{course.teacherName}</span>
                      <span className="block text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">{course.centerName || 'Eduqash Certified'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Call to Action Footer */}
              <div className="px-6 pb-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/40">
                <div>
                  <span className="text-lg font-black text-slate-900 dark:text-white">
                    {course.price.toLocaleString()} so'm
                  </span>
                  {course.originalPrice && (
                    <span className="block text-[11px] text-slate-400 dark:text-slate-500 line-through font-medium">
                      {course.originalPrice.toLocaleString()} so'm
                    </span>
                  )}
                </div>
                <Link 
                  to={`/courses/${course.id}`} 
                  className="btn-primary text-xs py-2.5 px-5 font-bold shadow-md shadow-indigo-600/30 flex items-center justify-center"
                >
                  Kursga Kirish
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedCourses;