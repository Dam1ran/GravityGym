export class ExerciseTemplateDTO {
    id: number;
    name: string;
    comments: string;
    tempo: string;
    primaryMuscleId: number;
    secondaryMuscleId: number;
    primaryMuscle: string;
    secondaryMuscle: string;
    constructor(){
        this.id = 0;
        this.name = '';
        this.comments = '';
        this.tempo = '';
        this.primaryMuscleId = 0;
        this.secondaryMuscleId = 0;
        this.primaryMuscle = '';
        this.secondaryMuscle = '';
    }
}