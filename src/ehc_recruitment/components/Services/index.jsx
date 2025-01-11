import React from 'react';
import { services } from './services';
import ServiceCard from './ServiceCard';
import CarouselContainer from '../Carousel/CarouselContainer';
import CarouselTrack from '../Carousel/CarouselTrack';

export default function Services() {
  return (
    <CarouselContainer  title="Nos Services">
      <CarouselTrack
        items={services}
        renderItem={(service, key) => (
          <ServiceCard key={key} {...service} />
        )}
        duration={35}
      />
    </CarouselContainer>
  );
}