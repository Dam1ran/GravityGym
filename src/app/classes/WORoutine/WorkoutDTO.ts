import { ExerciseDTO } from './ExerciseDTO';

export class WorkoutDTO {    
    id: number;    
    order: number;    
    estimatedMin: number;    
    workoutComments: string;      
    routineId: number;
    exercises: ExerciseDTO[];
}