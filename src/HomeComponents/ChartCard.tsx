'use client'
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface ChartCardProps {
  chartType: string;
  title: string;
  data: any;
}

const ChartCard = ({ chartType, title, data }: ChartCardProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chartInstance: echarts.ECharts | null = null;
    
    // Only run on client-side
    if (typeof window !== 'undefined' && chartRef.current) {
      chartInstance = echarts.init(chartRef.current);
      const chartOptions = getChartOptions(chartType, data);
      chartInstance.setOption(chartOptions);
    }
    
    // Clean up on unmount
    return () => {
      if (chartInstance) {
        chartInstance.dispose();
      }
    };
  }, [chartType, data]);

  return (
    <div className='bg-white text-black h-[500px] w-[340px] pb-4 rounded-3xl shadow-lg flex flex-col gap-4'>
      <div className='p-6'>
        <h3 className='font-bold text-lg'>{title}</h3>
      </div>
      <div ref={chartRef} className='h-[350px] px-4'></div>
    </div>
  );
};

// Function to get chart options based on the chart type
const getChartOptions = (chartType: string, data: any) => {
  switch (chartType) {
    case 'line':
      return {
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: data.xAxis,
          axisLine: {
            lineStyle: { color: '#333' },
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: { color: '#333' },
          },
        },
        series: [
          {
            data: data.series,
            type: 'line',
            smooth: true,
            itemStyle: {
              color: '#FF6347', // Tomato color for line
            },
          },
        ],
        animationDuration: 2000,
      };
    case 'bar':
      return {
        tooltip: {
          trigger: 'item',
        },
        xAxis: {
          type: 'category',
          data: data.xAxis,
          axisLine: {
            lineStyle: { color: '#333' },
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: { color: '#333' },
          },
        },
        series: [
          {
            data: data.series,
            type: 'bar',
            itemStyle: {
              color: '#4682B4', // Steel Blue color for bars
            },
          },
        ],
        animationDuration: 2000,
      };
    case 'pie':
      return {
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: data.series,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2,
            },
          },
        ],
        animationDuration: 2000,
      };
    case 'scatter':
      return {
        tooltip: {
          trigger: 'item',
        },
        xAxis: {
          type: 'category',
          data: data.xAxis,
          axisLine: {
            lineStyle: { color: '#333' },
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: { color: '#333' },
          },
        },
        series: [
          {
            data: data.series,
            type: 'scatter',
            symbolSize: 10,
            itemStyle: {
              color: '#32CD32', // Lime Green color for scatter points
            },
          },
        ],
        animationDuration: 2000,
      };
    default:
      return {};
  }
};

export default ChartCard; 