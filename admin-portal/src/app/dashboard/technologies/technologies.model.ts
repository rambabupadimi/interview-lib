

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

export interface TechnologyModel {
    code: string;
    description: string;
    id: number;
    image_key: string;
    name: string;
    status: string;
}
