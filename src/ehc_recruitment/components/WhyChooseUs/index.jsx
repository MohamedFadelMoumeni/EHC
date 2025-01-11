import React from 'react';
import { features } from './features';
import FeatureCard from './FeatureCard';
import CarouselContainer from '../Carousel/CarouselContainer';
import CarouselTrack from '../Carousel/CarouselTrack';

export default function WhyChooseUs() {
  return (
    <CarouselContainer title="Pourquoi Choisir EHC Recruiting ?">
      <CarouselTrack
        items={features}
        renderItem={(feature, key) => (
          <FeatureCard key={key} {...feature} />
        )}
        duration={35}
      />
    </CarouselContainer>
  );
}