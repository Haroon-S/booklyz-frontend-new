/* eslint-disable no-unused-vars */

'use client';

import React, { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useGetBookingDashboardQuery } from '@/services/private/charts';
import SectionLoader from '@/app/common/loaders/SectionLoader';

const chartData = [
  { month: 'January', booking: 186 },
  { month: 'February', booking: 305 },
  { month: 'March', booking: 237 },
  { month: 'April', booking: 73 },
  { month: 'May', booking: 209 },
  { month: 'June', booking: 214 },
];

const chartConfig = {
  booking: {
    label: 'Bookings',
    color: 'hsl(var(--chart-1))',
  },
};

function ReservationsChart() {
  const { data, isLoading, isFetching } = useGetBookingDashboardQuery();

  const formattedData = useMemo(() => {
    if (data) {
      return Object.keys(data).map(month => ({
        month,
        booking: data[month],
      }));
    }
    return [];
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservations - All</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        {!(isLoading || isFetching) && (
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <LineChart
              accessibilityLayer
              data={formattedData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={value => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line
                dataKey="booking"
                type="linear"
                stroke="var(--color-booking)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
        {(isLoading || isFetching) && <SectionLoader />}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">Showing total Bookings for the last 1 Year.</div>
      </CardFooter>
    </Card>
  );
}

export default ReservationsChart;
