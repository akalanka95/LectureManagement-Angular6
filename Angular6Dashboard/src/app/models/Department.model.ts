export class Department {
    public id: number;
    public departmentName: string;
    public description: string;
    public active: boolean;


    constructor(departmentName: string, description: string, active: boolean) {
        this.departmentName = departmentName;
        this.description = description;
        this.active = active;
    }}
