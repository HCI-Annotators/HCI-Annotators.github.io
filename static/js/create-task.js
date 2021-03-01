const createTask = (ev) => {
    const data = {
        name: document.querySelector('#name').value,
        description: document.querySelector('#description').value,
        instructions: document.querySelector('#instructions').value,
    };
    fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(showConfirmation);

    // this line overrides the default form functionality:
    ev.preventDefault();
};

const showConfirmation = (data) => {
    console.log('response from the server:', data);
    if (data.message && data.id) {
        document.querySelector('#task-form').classList.toggle("hide");
        document.querySelector('#confirmation').classList.toggle("hide");
    }
};

document.querySelector('#save').onclick = createTask;
