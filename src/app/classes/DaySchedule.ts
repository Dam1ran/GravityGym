import { WeekDay } from '@angular/common';

export interface IDaySchedule {
    id: number;
    dayOfWeek: WeekDay;
    hourMinute: string;
    description: string;
    imageUrl: string;
}