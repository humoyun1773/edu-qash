import React, { useState, useRef } from 'react';
import { HeroSection } from '../../components/landing/HeroSection';
import { FeaturedCenters } from '../../components/landing/FeaturedCenters';
import { FeaturedCourses } from '../../components/landing/FeaturedCourses';
import { AITestingSection } from '../../components/landing/AITestingSection';
import { useCourses } from '../../hooks/useCourses';
import { PageLoader } from '../../components/common/PageLoader';

export const LandingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { courses, loading } = useCourses();
  const coursesRef = useRef<HTMLDivElement>(null);

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.teacherName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Enter bosilganda yoki Qidirish tugmasi bosilganda kurslar bo'limiga scroll
  const handleSearch = () => {
    if (coursesRef.current) {
      coursesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-20 pb-20 animate-in fade-in duration-500">
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      <FeaturedCenters />
      <div ref={coursesRef}>
        <FeaturedCourses courses={filteredCourses} />
      </div>
      <AITestingSection />
    </div>
  );
};

export default LandingPage;
