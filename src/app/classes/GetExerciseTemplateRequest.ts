export class GetExerciseTemplateRequest {    
    constructor(filter: string,page: number,pageSize: number){
        this.filter=filter;
        this.page=page;
        this.pageSize=pageSize;
    }
    filter: string;
    page: number;
    pageSize: number;    
}