import $ from 'jquery';

export async function initializeApp() {
    renderTasks();
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
