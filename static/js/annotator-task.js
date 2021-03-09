let activeTask;

const getTask = () => {
    const url = window.location.href;
    id = url.substring(url.lastIndexOf('#') + 1);

    fetch('/api/tasks/' + id + '/')
        .then(response => response.json())
        .then(data => {
            activeTask = data;
            renderTask();
        });
}

const renderTask = (ev) => {
    document.querySelector('#instructions').innerHTML = activeTask.instructions;
}

getTask();
