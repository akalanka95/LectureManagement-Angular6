import {Lecture} from './Lecture.model';

export class Message {
    public id: number;
    public date: string;
    public time: string;
    public type: string;
    public message: string;
    public  lecture: Lecture;

    constructor() {
    }
}
