import React, { useState } from 'react';
import { HeroSection } from '../../components/landing/HeroSection';
import { FeaturedCenters } from '../../components/landing/FeaturedCenters';
import { FeaturedCourses } from '../../components/landing/FeaturedCourses';
import { AITestingSection } from '../../components/landing/AITestingSection';
import { useCourses } from '../../hooks/useCourses';

export const LandingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { courses } = useCourses();

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.teacherName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-20 pb-20">
      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FeaturedCenters />
      <FeaturedCourses courses={filteredCourses} />
      <AITestingSection />
    </div>
  );
};

export default LandingPage;
