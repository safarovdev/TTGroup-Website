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
  setMonth,
  getMonth,
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
  const [currentMonth, setCurrentMonth] = React.useState(startOfMonth(selected || new Date()));
  const [view, setView] = React.useState<'days' | 'months'>('days');
  const dateFnsLocale = locale === 'ru' ? ru : enUS;

  const handlePrev = () => {
    setCurrentMonth(subMonths(currentMonth, view === 'days' ? 1 : 12));
  };

  const handleNext = () => {
    setCurrentMonth(addMonths(currentMonth, view === 'days' ? 1 : 12));
  };
  
  const handleMonthSelect = (monthIndex: number) => {
    setCurrentMonth(setMonth(currentMonth, monthIndex));
    setView('days');
  }

  const renderHeader = () => (
    <div className="flex items-center justify-between py-2 px-1">
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        onClick={handlePrev}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
          variant="ghost"
          className="text-sm font-semibold capitalize px-4"
          onClick={() => setView(view === 'days' ? 'months' : 'days')}
      >
          {view === 'days' 
              ? format(currentMonth, 'LLLL yyyy', { locale: dateFnsLocale }) 
              : format(currentMonth, 'yyyy', { locale: dateFnsLocale })}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        onClick={handleNext}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );

  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale: dateFnsLocale });
    const endDate = endOfWeek(monthEnd, { locale: dateFnsLocale });

    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const weekdays = [...Array(7).keys()].map(i => format(days[i], 'EEEEEE', { locale: dateFnsLocale }));

    return (
      <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
        {weekdays.map((day, i) => (
          <div key={i} className="text-xs font-medium text-muted-foreground w-9 h-9 flex items-center justify-center">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const isDisabled = (disabled && disabled(day)) || isBefore(day, startOfDay(new Date()));

          return (
            <div key={day.toString()} className="flex justify-center items-center w-9 h-9">
              <button
                type="button"
                onClick={() => !isDisabled && onSelect(day)}
                disabled={isDisabled}
                className={cn(
                  'w-8 h-8 flex items-center justify-center rounded-full transition-colors',
                  !isSameMonth(day, currentMonth) && 'text-muted-foreground/30',
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
    );
  };
  
  const renderMonths = () => {
    const months = Array.from({ length: 12 }, (_, i) => setMonth(new Date(), i));
    const currentSelectedMonth = getMonth(currentMonth);

    return (
        <div className="grid grid-cols-3 gap-2 p-2">
            {months.map((month, i) => (
                <Button
                    key={i}
                    variant={i === currentSelectedMonth ? "default" : "ghost"}
                    size="sm"
                    className="capitalize"
                    onClick={() => handleMonthSelect(i)}
                >
                    {format(month, 'LLL', { locale: dateFnsLocale })}
                </Button>
            ))}
        </div>
    );
  };

  return (
    <div className="p-2 bg-card text-card-foreground rounded-lg shadow-lg w-full max-w-xs mx-auto">
      {renderHeader()}
      {view === 'days' ? renderDays() : renderMonths()}
    </div>
  );
}
