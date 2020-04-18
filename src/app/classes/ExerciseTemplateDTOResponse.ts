import { ExerciseTemplateDTO } from './ExerciseTemplateDTO';

export class ExerciseTemplateDTOResponse {
    exerciseTemplateDTOs: ExerciseTemplateDTO[];
    pageIndex: number;
    pageSize: number;    
    length: number;    
}