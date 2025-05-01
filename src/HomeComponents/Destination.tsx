'use client'
import React, { useEffect, useRef, useState } from 'react';
import Title from './Title';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';
import dynamic from 'next/dynamic';

// Mock data for charts
const lineChartData = {
  xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [820, 932, 901, 934, 1290, 1330],
};

const barChartData = {
  xAxis: ['Area 1', 'Area 2', 'Area 3', 'Area 4'],
  series: [500, 600, 700, 800],
};

const pieChartData = {
  series: [
    { value: 400, name: 'Residential' },
    { value: 335, name: 'Commercial' },
    { value: 310, name: 'Industrial' },
    { value: 234, name: 'Agriculture' },
  ],
};

const scatterChartData = {
  xAxis: ['20°C', '25°C', '30°C', '35°C', '40°C'],
  series: [300, 400, 500, 700, 800],
};

// Dynamically import the chart component
const ChartCard = dynamic(() => import('./ChartCard'), { ssr: false });

const ElectricityStats = () => {
  return (
    <section className='relative max-container padding-container flex flex-col gap-16 py-12 bg-white'>
      <Image className='absolute xs:bottom-[65%] xs:right-[5%] md:bottom-[70%] xl:right-0' src='/yellowx.png' alt='yellow object' width={100} height={100} />

      <div className='top'>
        <Title title='Electricity Stats' subtitle='Delhi Electricity Data Insights' />
      </div>

      <div className='bottom flex items-center justify-between'>
        <Swiper
          slidesPerView={3}
          spaceBetween={60}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          breakpoints={{
            '@0.00': {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            '@0.75': {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            '@1.15': {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            '@1.60': {
              slidesPerView: 3,
              spaceBetween: 60,
            },
          }}
        >
          <SwiperSlide className='pb-12'>
            <ChartCard chartType='line' title='Consumption Over Time' data={lineChartData} />
          </SwiperSlide>
          <SwiperSlide>
            <ChartCard chartType='bar' title='Peak Demand by Area' data={barChartData} />
          </SwiperSlide>
          <SwiperSlide>
            <ChartCard chartType='pie' title='Energy Savings Contribution' data={pieChartData} />
          </SwiperSlide>
          <SwiperSlide>
            <ChartCard chartType='scatter' title='Temperature vs Demand' data={scatterChartData} />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default ElectricityStats;
