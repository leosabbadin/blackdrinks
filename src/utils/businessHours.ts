export interface ScheduleDay {
  openHour: number;
  closeHour: number; // e.g., 3 means 03:00 AM next day, 4 means 04:00 AM next day
  label: string; // e.g., "das 18h às 03h"
  dayName: string;
}

export const BUSINESS_HOURS: Record<number, ScheduleDay> = {
  0: { openHour: 15, closeHour: 3, label: 'das 15h às 03h', dayName: 'Domingo' },
  1: { openHour: 18, closeHour: 3, label: 'das 18h às 03h', dayName: 'Segunda' },
  2: { openHour: 18, closeHour: 3, label: 'das 18h às 03h', dayName: 'Terça' },
  3: { openHour: 18, closeHour: 3, label: 'das 18h às 03h', dayName: 'Quarta' },
  4: { openHour: 18, closeHour: 3, label: 'das 18h às 03h', dayName: 'Quinta' },
  5: { openHour: 18, closeHour: 4, label: 'das 18h às 04h', dayName: 'Sexta' },
  6: { openHour: 15, closeHour: 4, label: 'das 15h às 04h', dayName: 'Sábado' },
};

export interface BusinessStatus {
  isOpen: boolean;
  hoursLabel: string;
  nextEventText: string;
}

export function getBusinessStatus(date: Date = new Date()): BusinessStatus {
  const currentDay = date.getDay(); // 0 = Domingo, 1 = Segunda, ...
  const currentHour = date.getHours();
  const currentMinutes = date.getMinutes();
  const currentTimeDecimal = currentHour + currentMinutes / 60;

  // Check if we are in the early morning spillover from yesterday's session
  const yesterdayDay = (currentDay + 6) % 7;
  const yesterdaySchedule = BUSINESS_HOURS[yesterdayDay];

  if (currentTimeDecimal < yesterdaySchedule.closeHour) {
    return {
      isOpen: true,
      hoursLabel: yesterdaySchedule.label,
      nextEventText: `Fecha às 0${yesterdaySchedule.closeHour}h`,
    };
  }

  const todaySchedule = BUSINESS_HOURS[currentDay];

  if (currentTimeDecimal >= todaySchedule.openHour) {
    return {
      isOpen: true,
      hoursLabel: todaySchedule.label,
      nextEventText: `Fecha às 0${todaySchedule.closeHour}h`,
    };
  }

  // Otherwise, closed until today's opening hour
  return {
    isOpen: false,
    hoursLabel: todaySchedule.label,
    nextEventText: `Abre às ${todaySchedule.openHour}h`,
  };
}
