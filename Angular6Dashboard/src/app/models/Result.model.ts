import {Semester} from './Semester.model';
import {Course} from './Course.model';

export class Index {
    public id: number;
    public indexNo: string;
    public year: string;
    public semester: Semester;
    public course: Course;

    constructor() {
    }
}
