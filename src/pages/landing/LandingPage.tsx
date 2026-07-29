import React from 'react';
import { HeroSection } from './HeroSection';
import { FeaturedCenters } from './FeaturedCenters';
import { FeaturedCourses } from './FeaturedCourses';
import { AITestingSection } from './AITestingSection';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-20">
      <HeroSection />
      <FeaturedCenters />
      <FeaturedCourses />
      <AITestingSection />
    </div>
  );
};

export default LandingPage;
