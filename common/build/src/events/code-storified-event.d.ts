import { Subjects } from "./subjects";
import { BaseEvent } from "./base-event";
export interface CodeStorifiedEvent extends BaseEvent {
    subject: Subjects.CodeStorified;
    data: {
        story: any[][];
    };
}
