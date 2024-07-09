

export interface AddQuestionRequest {
    technology_id: number;
    name: string;
    description: string;
}

export interface EditQuesitonRequest {
    technology_id: number;
    name: string;
    description: string;
    review_id:number;
}

export interface QuestionModel {
    code: string;
    description: string;
    id: number;
    image_key: string;
    name: string;
    status: string;
}
