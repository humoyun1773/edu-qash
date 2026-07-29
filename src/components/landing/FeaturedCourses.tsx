import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Star, ArrowRight, Users, Clock, Award } from 'lucide-react';
import type { Course } from '../../types';

interface FeaturedCoursesProps {
  courses: Course[];
}

export const FeaturedCourses: React.FC<FeaturedCoursesProps> = ({ courses }) => {
  return (
    <section className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 my-12">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            <div className="p-1.5 rounded-lg bg-indigo-500/10">
              <BookOpen className="w-4 h-4 text-indigo-500" />
            </div>
            Interaktiv Kurslar Katalogi
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1.5 tracking-tight">
            Eng Ommabop Onlayn & Offlayn Kurslar
          </h2>
        </div>

        <Link 
          to="/courses" 
          className="py-2.5 px-5 rounded-2xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-extrabold text-xs border border-slate-300/80 dark:border-slate-700/80 active:scale-95 transition-all flex items-center gap-2 shadow-sm"
        >
          Barcha Kurslar 
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <div className="text-center py-20 bg-white/40 dark:bg-slate-900/40 rounded-3xl backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Hozircha kurslar mavjud emas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Thumbnail Container */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Course Type Pill */}
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
                  <div className="absolute top-3.5 right-3.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-black text-amber-400 flex items-center gap-1 border border-amber-500/30 shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {course.rating} <span className="text-slate-400 font-normal">({course.reviewsCount})</span>
                  </div>

                  {/* Duration & Level Badges */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[11px] font-bold text-slate-200">
                    <span className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-700/60">
                      <Clock className="w-3 h-3 text-indigo-400" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-700/60">
                      <Award className="w-3 h-3 text-emerald-400" /> {course.level}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[11px] font-extrabold border border-indigo-500/20">
                      {course.category}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-bold">
                      <Users className="w-3.5 h-3.5 text-indigo-500" /> {course.studentsCount} ta talaba
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
                    {course.description}
                  </p>

                  {/* Teacher Info */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
                    <img
                      src={course.teacherAvatar}
                      alt={course.teacherName}
                      className="w-9 h-9 rounded-xl object-cover border-2 border-indigo-500/40 shadow-md"
                    />
                    <div>
                      <span className="block text-xs font-black text-slate-900 dark:text-white">{course.teacherName}</span>
                      <span className="block text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">{course.centerName || 'Eduqash Certified'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Price & Action */}
              <div className="px-6 pb-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/30">
                <div>
                  <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white block">
                    {course.price.toLocaleString()} so‘m
                  </span>
                  {course.originalPrice && (
                    <span className="block text-[11px] text-slate-400 line-through font-semibold">
                      {course.originalPrice.toLocaleString()} so‘m
                    </span>
                  )}
                </div>
                <Link 
                  to="/courses" 
                  className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
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