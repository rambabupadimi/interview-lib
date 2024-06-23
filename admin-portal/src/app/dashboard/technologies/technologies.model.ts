

export interface AddTechnologyRequest {
    code: string;
    name: string;
    description: string;
}

export interface EditTechnologyRequest {
    code: string;
    name: string;
    description: string;
    technology_id: number;
}

