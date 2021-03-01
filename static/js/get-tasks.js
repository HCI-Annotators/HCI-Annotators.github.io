const getTasks = () => {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(displayTasks);
};

const toHTMLElement = (task) => {
    // formatting the date:
    return `
        <section class="task">
            <a class="detail-link" href="/task/#${task.id}">
                <h2>${task.name}</h2>
            </a>
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
