
    // Load tasks from localStorage
    function loadTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    // Show tasks in the table
    function showTasks() {
        const tasks = loadTasks();
        const taskList = document.getElementById('task-list');
        const noTasksMessage = document.getElementById('no-tasks-message');
        
        // If no tasks, show the message and hide the table
        if (tasks.length === 0) {
            noTasksMessage.style.display = 'block';
            taskList.style.display = 'none';
            return;
        } else {
            noTasksMessage.style.display = 'none';
            taskList.style.display = 'table-row-group';
        }

        taskList.innerHTML = '';

        // Display remaining tasks first, completed tasks at the bottom
        const remainingTasks = tasks.filter(task => task.status === 'Remaining');
        const completedTasks = tasks.filter(task => task.status === 'Complete');

        // Show remaining tasks
        remainingTasks.forEach((task, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.subject}</td>
                <td>${task.chapter}</td>
                <td>${task.details}</td>
                <td class="${task.status === 'Complete' ? 'completed' : ''}">${task.status}</td>
                <td>
                    <button class="toggle-btn" onclick="toggleTask(${index})">${task.status === 'Complete' ? 'Mark as Remaining' : 'Mark as Complete'}</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                </td>
            `;
            taskList.appendChild(row);
        });

        // Show completed tasks at the bottom
        completedTasks.forEach((task, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.subject}</td>
                <td>${task.chapter}</td>
                <td>${task.details}</td>
                <td class="completed">${task.status}</td>
                <td>
                    <button class="toggle-btn" onclick="toggleTask(${index})">${task.status === 'Complete' ? 'Mark as Remaining' : 'Mark as Complete'}</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                </td>
            `;
            taskList.appendChild(row);
        });
    }

    // Add new task
    document.getElementById('save-task').addEventListener('click', () => {
        const subject = document.getElementById('subject').value;
        const chapter = document.getElementById('chapter').value;
        const details = document.getElementById('details').value;
        const tasks = loadTasks();
        tasks.push({ subject, chapter, details, status: 'Remaining' });
        saveTasks(tasks);
        showTasks();

        // Clear form fields after saving
        document.getElementById('subject').value = '';
        document.getElementById('chapter').value = '';
        document.getElementById('details').value = '';

        document.getElementById('task-form').classList.remove('show');
    });

    // Toggle task status (Complete or Remaining)
    function toggleTask(index) {
        const tasks = loadTasks();
        tasks[index].status = tasks[index].status === 'Complete' ? 'Remaining' : 'Complete';
        saveTasks(tasks);
        showTasks();
    }

    // Delete task
    function deleteTask(index) {
        const tasks = loadTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        showTasks();
    }

    // Toggle task form visibility
    document.getElementById('toggle-form').addEventListener('click', () => {
        const form = document.getElementById('task-form');
        form.classList.toggle('show');
    });

    // Save tasks to localStorage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Initial load of tasks
    showTasks();


