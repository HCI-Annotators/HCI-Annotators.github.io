let activeTask;

const updateTask = (ev) => {
    const url = window.location.href;
    id = url.substring(url.lastIndexOf('#') + 1);

    const data = {
        name: document.querySelector('#name').value,
        description: document.querySelector('#description').value,
        instructions: document.querySelector('#instructions').value,
        s3_link: document.querySelector('#s3_link').value,
    };
    fetch('/api/tasks/' + id + '/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(() => {window.location.href = "/manager-view/";});

    // this line overrides the default form functionality:
    ev.preventDefault();
};

const deleteTask = () => {
    const url = window.location.href;
    id = url.substring(url.lastIndexOf('#') + 1);

    fetch('/api/tasks/'+ activeTask._id.$oid + '/', {
        method: 'DELETE'
    }).then(() => {window.location.href = "/manager-view/";});
};

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
    document.querySelector('#id').innerHTML = "Task ID: " + activeTask._id.$oid;
    document.querySelector('#name').value = activeTask.name;
    document.querySelector('#description').value = activeTask.description;
    document.querySelector('#instructions').value = activeTask.instructions;
    document.querySelector('#s3_link').value = activeTask.s3_link;
}

const showConfirmation = (data) => {
    console.log('response from the server:', data);
    if (data.message && data.id) {
        document.querySelector('#task-form').classList.toggle("hide");
        document.querySelector('#confirmation').classList.toggle("hide");
    }
};

getTask();
document.querySelector('#save').onclick = updateTask;
document.querySelector('#delete').onclick = deleteTask;
