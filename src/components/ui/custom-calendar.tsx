'use client';

import * as React from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfDay,
} from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface CustomCalendarProps {
  selected?: Date;
  onSelect: (date: Date) => void;
  disabled?: (date: Date) => boolean;
  locale?: 'ru' | 'en';
}

export function CustomCalendar({
  selected,
  onSelect,
  disabled,
  locale = 'en',
}: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(startOfMonth(new Date()));
  const dateFnsLocale = locale === 'ru' ? ru : enUS;

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { locale: dateFnsLocale });
  const endDate = endOfWeek(monthEnd, { locale: dateFnsLocale });

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const weekdays = [...Array(7).keys()].map(i => format(days[i], 'EEEEEE', { locale: dateFnsLocale }));

  return (
    <div className="p-3 bg-card text-card-foreground rounded-lg shadow-md w-full">
      {/* Header */}
      <div className="flex items-center justify-between py-2 px-2 bg-primary text-primary-foreground rounded-t-md -mt-3 -mx-3 mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-primary-foreground/20 text-primary-foreground"
          onClick={handlePrevMonth}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-lg font-semibold capitalize">
          {format(currentMonth, 'LLLL yyyy', { locale: dateFnsLocale })}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-primary-foreground/20 text-primary-foreground"
          onClick={handleNextMonth}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Weekdays */}
        {weekdays.map((day, i) => (
          <div key={i} className="text-sm font-medium text-muted-foreground w-10 h-10 flex items-center justify-center">
            {day}
          </div>
        ))}

        {/* Days */}
        {days.map((day) => {
          const isDisabled = (disabled && disabled(day)) || isBefore(day, startOfDay(new Date()));

          return (
            <div
              key={day.toString()}
              className="w-10 h-10"
            >
              <button
                type="button"
                onClick={() => !isDisabled && onSelect(day)}
                disabled={isDisabled}
                className={cn(
                  'w-10 h-10 flex items-center justify-center rounded-full transition-colors',
                  !isSameMonth(day, currentMonth) && 'text-muted-foreground/50',
                  !isDisabled && 'hover:bg-accent hover:text-accent-foreground',
                  isSameDay(day, selected || new Date(0)) &&
                    'bg-primary text-primary-foreground hover:bg-primary/90',
                  isDisabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                {format(day, 'd')}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
