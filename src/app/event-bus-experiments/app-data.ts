
import * as _ from 'lodash';
import {Lesson} from "../shared/model/lesson";



export interface Observer {
    next(data:any);
}


export interface Observable {
    subscribe(obs:Observer);
    unsubscribe(obs:Observer);
}


interface Subject extends Observable, Observer {
    subscribe( obs:Observer);
    unsubscribe(obs:Observer);
    next(data:any);
}


class SubjectImplementation implements Subject {

    private observers : Observer[] = [];

    subscribe( obs: Observer) {
        this.observers.push(obs);
    }

    unsubscribe(obs: Observer) {
        _.remove(this.observers, el => el === obs );
    }

    next(data: any) {
        this.observers.forEach(obs => obs.next(data));
    }
}




class ObservableImplementation implements Observable {

    constructor(private subject: Subject) {

    }

    subscribe(obs: Observer) {
        this.subject.subscribe(obs);
    }

    unsubscribe(obs: Observer) {
        this.subject.unsubscribe(obs);
    }

}

class ApplicationData {

    constructor( public lessonsList$: Observable ) {

    }

}

const lessonsListSubject = new SubjectImplementation();


export const applicationData = new ApplicationData(lessonsListSubject);



export function broadcastLessons(data: Lesson[]) {
    lessonsListSubject.next(data);
}








