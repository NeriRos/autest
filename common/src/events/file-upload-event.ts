import {Subjects} from "./subjects";
import {BaseEvent} from "./base-event";

export interface FileUploadEvent extends BaseEvent {
    subject: Subjects.FileUpload
    data: {
        file: string
    }
}
