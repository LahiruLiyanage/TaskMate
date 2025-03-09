import $ from 'jquery';
import {Task} from "./task.js";
import {addDbTask, deleteDbTask, loadDbTasks, updateDbTaskStatus} from "./db.js";

let currentTask = null;         /* Store the currently selected task reference */
let taskList = [];              /* Store the task list of currently authenticated user */

export async function initializeApp() {
    taskList = await loadDbTasks();
    renderTasks();
    $("#loader-wrapper").addClass("d-none");
    $("#task-lists-wrapper").removeClass("d-none");
}

function renderTasks() {
    const noTask = $("#no-task");
    const noCompletedTask = $("#no-completed-task");
    const completedTaskList = $("#completed-task-list");

    (taskList.find(task => !task.status)) ? noTask.hide() : noTask.show();
    (taskList.find(task => task.status)) ? noCompletedTask.hide() : noCompletedTask.show();
    (taskList.length) ? completedTaskList.show() : completedTaskList.hide();
    $("#task-list > section, #completed-task-list > section").empty();

    for (const {id, description, status} of taskList) {
        const task = `
            <div class="task-item d-flex justify-content-between p-2 align-items-center rounded-2 text-secondary-emphasis">
              <div class="form-check">
                <input  class="form-check-input" type="checkbox" 
                        value="" id="${id}"
                        ${status ? 'checked' : ''}>
                <label  class="form-check-label" for="${id}">
                        ${description}
                </label>
              </div>
              <div class="d-flex gap-3 fs-5">
                <i class="bi bi-pencil" title="Edit"></i>
                <i class="bi bi-trash" title="Delete"></i>
              </div>
            </div>        
        `;
        $(!status ? "#task-list > section" : "#completed-task-list > section").prepend(task);
    }
}

$('#chk-mode').on('change', function() {
    const darkMode = $(this).prop('checked');

    $('html').attr('data-bs-theme', darkMode ? 'dark' : 'light');
});

$("#frm-task").on('submit', async () => {
    const txtTask = $("#txt-task");
    const description = txtTask.val().trim();

    /* Adding or Updating? */
    if (!currentTask) {
        const taskId = await addDbTask(description);

        if (taskId) taskList.push(new Task(taskId, description));
    } else {
        if (await updateDbTaskStatus(currentTask.id,
            txtTask.val().trim(), currentTask.status)) {
            currentTask.description = description;
            currentTask = null;
            $("#frm-task button").text('Add');
        }
    }

    renderTasks();
    txtTask
        .val("")
        .trigger('focus');
});

$('#task-list > section, #completed-task-list > section')
    .on('change', '.task-item input[type="checkbox"]', async (e) => {
        const task = taskList.find(task => task.id === e.currentTarget.id);

        if (await updateDbTaskStatus(task.id, task.description, !task.status)) {
            task.status = !task.status;
            renderTasks();
        }
    })
    .on('click', '.bi-trash', async (e) => {
        const taskId = $(e.currentTarget)
            .parents(".task-item")
            .find('input[type="checkbox"]')
            .prop("id");
        const taskIndex = taskList.findIndex(task => task.id === taskId);

        if (await deleteDbTask(taskId)) {
            taskList.splice(taskIndex, 1);
            renderTasks();
        }
    })
    .on('click', '.bi-pencil', (e) => {
        $(".task-item-selected").removeClass('task-item-selected');

        const taskId = $(e.currentTarget)
            .parents(".task-item")
            .addClass('task-item-selected')
            .find('input[type="checkbox"]').prop("id");
        currentTask = taskList.find(task => task.id === taskId);

        $("#txt-task")
            .val(currentTask.description)
            .trigger('focus')
            .trigger('select');
        $("#frm-task button").text("Update");
    });
