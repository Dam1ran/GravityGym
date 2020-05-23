import { WorkoutDTO } from './WorkoutDTO';

export class WoRoutineDTO {    
    id: number;    
    title: string;
    description: string;    
    workouts: WorkoutDTO[];
}