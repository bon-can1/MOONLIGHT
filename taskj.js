let habits = [];
const habitList = document.getElementById('habit-list');
const progress = document.getElementById('progress');
const progressText = document.getElementById('progress-text');

function addHabit() {
    const habitInput = document.getElementById('habit-input');
    const habitName = habitInput.value.trim();

    if (habitName === '') {
        alert('Please enter a habit.'); 
        return;
    }

    habits.push({ name: habitName, completed: false });
    habitInput.value = '';
    renderHabits();
    updateProgress();
}

function toggleHabit(index) {
    habits[index].completed = !habits[index].completed;
    renderHabits();
    updateProgress();
}

function removeHabit(index) {
    habits.splice(index, 1);
    renderHabits();
    updateProgress();
}

function renderHabits() {
    habitList.innerHTML = '';

    habits.forEach((habit, index) => {
        const li = document.createElement('li');
        li.textContent = habit.name;
        if (habit.completed) {
            li.style.textDecoration = 'line-through';
        }

        const toggleButton = document.createElement('button');
        toggleButton.textContent = habit.completed ? 'Undo' : 'Complete';
        toggleButton.onclick = () => toggleHabit(index);
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeHabit(index);

        li.appendChild(toggleButton);
        li.appendChild(removeButton);

        habitList.appendChild(li);
    });
}

function updateProgress() {
    const completedHabits = habits.filter(habit => habit.completed).length;
    const totalHabits = habits.length;
    const percentage = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;
    
    progress.style.width = percentage + '%';
    progressText.textContent = Math.round(percentage) + '% Complete';
}