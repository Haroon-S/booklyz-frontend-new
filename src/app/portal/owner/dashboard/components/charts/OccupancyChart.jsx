/* eslint-disable no-unused-vars */

'use client';

import React, { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useGetUserOccupancyQuery } from '@/services/private/charts';
import SectionLoader from '@/app/common/loaders/SectionLoader';

const chartData = [
  { month: 'January', user: 186 },
  { month: 'February', user: 305 },
  { month: 'March', user: 237 },
  { month: 'April', user: 73 },
  { month: 'May', user: 209 },
  { month: 'June', user: 214 },
];
const chartConfig = {
  user: {
    label: 'Users',
    color: 'hsl(var(--chart-1))',
  },
};

function OccupancyChart() {
  const { data, isLoading, isFetching } = useGetUserOccupancyQuery();
  const formattedData = useMemo(() => {
    if (data) {
      return Object.keys(data).map(month => ({
        month,
        user: data[month],
      }));
    }
    return [];
  }, [data]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Occupancy - All</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        {!(isLoading || isFetching) && (
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={formattedData}>
              <CartesianGrid />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={value => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="user" fill="var(--color-user)" opacity={0.6} radius={8} />
            </BarChart>
          </ChartContainer>
        )}
        {(isLoading || isFetching) && <SectionLoader />}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">Showing total Occupancies for the last 1 Year</div>
      </CardFooter>
    </Card>
  );
}

export default OccupancyChart;
