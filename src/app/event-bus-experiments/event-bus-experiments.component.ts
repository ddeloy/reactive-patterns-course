import {Component, OnInit} from '@angular/core';
import {testLessons} from "../shared/model/test-lessons";
import {broadcastLessons} from "./app-data";
import {Lesson} from "../shared/model/lesson";

@Component({
    selector: 'event-bus-experiments',
    templateUrl: './event-bus-experiments.component.html',
    styleUrls: ['./event-bus-experiments.component.css']
})
export class EventBusExperimentsComponent implements OnInit {

    lessons: Lesson[];

    ngOnInit() {

        console.log('Top level component broadcasted all lessons ...');

        this.lessons = testLessons.slice(0);

        broadcastLessons(this.lessons);

        setTimeout(() => {

            this.lessons.push({
                id: Math.random(),
                description: 'New lesson arriving from the backend'
            });

            broadcastLessons(this.lessons);

        }, 10000);

    }


    addLesson(lessonText: string) {

        this.lessons.push({
            id: Math.random(),
            description: lessonText
        });

        broadcastLessons(this.lessons);
    }

}












