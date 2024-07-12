

export interface AddQuestionRequest {
    technology_id: number;
    title: string;
    description: string;
}

export interface EditQuestionRequest {
    technology_id: number;
    title: string;
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
