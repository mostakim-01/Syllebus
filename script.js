// Preloaded task data from your previous input
const preloadedTasks = [
    { subject: 'পদার্থবিজ্ঞান ২য় পত্র', chapter: 'স্থির তড়িৎ', details: 'যারক', status: 'Remaining' },
    { subject: 'পদার্থবিজ্ঞান ২য় পত্র', chapter: 'পরমাণুর গঠন ও নিউক্লিয়ার পদার্থবিজ্ঞান', details: 'CO-MCQ', status: 'Complete' },
    { subject: 'রসায়ন ২য় পত্র', chapter: 'পরিবেশ রসায়ন', details: 'মতবাদ এক বিক্রিয়া', status: 'Complete' },
    { subject: 'রসায়ন ২য় পত্র', chapter: 'জৈব রসায়ন', details: 'Running', status: 'Remaining' },
    { subject: 'প্রাণিবিজ্ঞান', chapter: 'চলন ও অঙ্গ চালনা', details: 'Running', status: 'Remaining' },
];

// Save preloaded data to localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : preloadedTasks; // Load preloaded data if no tasks are in localStorage
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
    document.getElementById('task-form').classList.remove('show');
    document.getElementById('toggle-form').setAttribute('aria-expanded', 'false');
    document.getElementById('task-form').setAttribute('aria-hidden', 'true');
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
    const expanded = form.classList.toggle('show');
    document.getElementById('toggle-form').setAttribute('aria-expanded', expanded);
    document.getElementById('task-form').setAttribute('aria-hidden', !expanded);
});

// Initial load of tasks
showTasks();
