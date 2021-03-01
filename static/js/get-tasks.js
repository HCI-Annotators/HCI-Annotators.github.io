const getTasks = () => {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(displayTasks);
};

const deleteTask = (id) => {
    fetch('/api/tasks/'+ id + '/', {
        method: 'DELETE'
    }).then(response => response.json())
    .then(getTasks());
};

const toHTMLElement = (task) => {
    // HTML for date:
    return `
      <div class="container">
          <a class="detail-link" href="/task-view/#${task.id}">
              <h2>${task.name}</h2>
          </a>
          <i class="btn fas fa-trash-alt" style="float: right;" onClick="deleteTask('${task.id}');"></i>
      </div>
      <hr>
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
