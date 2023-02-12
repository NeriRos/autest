import {Subjects, Publisher, CodeStorifiedEvent} from '@autest/common-v2'

export class CodeStorifiedPublisher extends Publisher<CodeStorifiedEvent> {
    subject: Subjects.CodeStorified = Subjects.CodeStorified;
}