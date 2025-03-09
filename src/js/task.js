export class Task {
    id;
    description;
    status;

    constructor(id, description, status = false) {
        this.id = 'task-' + id;
        this.description = description;
        this.status = status;
    }
}