import { ExerciseSetDTO } from './ExerciseSetDTO';

export class ExerciseDTO {    
    id: number;    
    name: string;
    order: number;    
    exerciseTemplateId: number;    
    workoutId: number;
    sets: ExerciseSetDTO[];
}