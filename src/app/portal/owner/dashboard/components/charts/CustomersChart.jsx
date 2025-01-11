/* eslint-disable no-unused-vars */

'use client';

import React, { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useGetBookingPiChartQuery } from '@/services/private/charts';
import SectionLoader from '@/app/common/loaders/SectionLoader';

const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
];

const chartConfig = {
  count: {
    label: 'Status',
  },
  Pending: {
    label: 'Pending',
    color: 'hsl(var(--chart-1))',
  },
  Confirmed: {
    label: 'Confirmed',
    color: 'hsl(var(--chart-2))',
  },
  Cancelled: {
    label: 'Cancelled',
    color: 'hsl(var(--chart-3))',
  },
  Completed: {
    label: 'Completed',
    color: 'hsl(var(--chart-4))',
  },
};

function CustomersChart() {
  const { data, isLoading, isFetching } = useGetBookingPiChartQuery();

  const colors = [
    'var(--color-Pending)',
    'var(--color-Confirmed)',
    'var(--color-Cancelled)',
    'var(--color-Completed)',
  ];

  const formattedData = useMemo(() => {
    if (data) {
      return Object.keys(data).map((item, index) => ({
        status: item,
        count: data[item],
        fill: colors[index],
      }));
    }
    return [];
  }, [data]);

  return (
    <Card className="flex flex-col">
      <CardHeader className=" pb-0">
        <CardTitle>Booking - Status</CardTitle>
        {/* <CardDescription>Every Booking Status</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {!(isLoading || isFetching) && (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px] w-full">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Pie data={formattedData} dataKey="count" nameKey="status" innerRadius={60} />
            </PieChart>
          </ChartContainer>
        )}
        {(isLoading || isFetching) && <SectionLoader />}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Showing total Booking Status for the last 1 Year.
        </div>
      </CardFooter>
    </Card>
  );
}

export default CustomersChart;
