import {Subjects, Publisher, FileUploadEvent} from '@autest/common-v2'

export class FileUploadPublisher extends Publisher<FileUploadEvent> {
    subject: Subjects.FileUpload = Subjects.FileUpload;
}