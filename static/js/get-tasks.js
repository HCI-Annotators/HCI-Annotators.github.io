const getTasks = () => {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(displayTasks);
};

const deleteTask = (id) => {
    fetch('/api/tasks/#'+ id)
        .then(response => response.json())
        .then(displayTasks);
};

const editTask = (id) => {
    fetch('/api/tasks/#'+ id)
        .then(response => response.json())
        .then(displayTasks);
}

const toHTMLElement = (task) => {
    // HTML for date:
    return `
        <section class="task">
            <div class="card">
                <div class="container">
                    <a class="detail-link" href="/task-view/#${task.id}">
                        <h2 style="float: left">${task.name}</h2>
                    </a>
                    <i class="btn fas fa-trash-alt" style="float: right;" onClick="deleteTask('${task.id}');"></i>
                    <i class="btn fas fa-edit" style="float: right;" onClick="editTask('${task.id}');"></i>
                </div>        
            </div>
        </section>
    `;
};

const displayTasks = (data) => {
    const entries = [];
    for (const task of data) {
        entries.push(toHTMLElement(task));
    }
    document.querySelector('#tasks').innerHTML = entries.join('\n');
};

getTasks();