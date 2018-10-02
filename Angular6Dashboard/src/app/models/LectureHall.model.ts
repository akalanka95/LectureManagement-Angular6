export class LectureHall {
    public id: number;
    public code: string;
    public description: string;
    public name: string;
    public capacity: number;


    constructor(id: number, code: string, description: string, name: string, capacity: number) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.name = name;
        this.capacity = capacity;
    }
}
