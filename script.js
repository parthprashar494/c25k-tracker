// Define the structure of C25K workouts
const workouts = [
    ["Run 1 min, Walk 1.5 min (x8)", "Run 1 min, Walk 1.5 min (x8)", "Run 1 min, Walk 1.5 min (x8)"],
    ["Run 1.5 min, Walk 2 min (x6)", "Run 1.5 min, Walk 2 min (x6)", "Run 1.5 min, Walk 2 min (x6)"],
    ["Run 1.5 min, Walk 1.5 min; Run 3 min, Walk 3 min (x2)", "Run 1.5 min, Walk 1.5 min; Run 3 min, Walk 3 min (x2)", "Run 1.5 min, Walk 1.5 min; Run 3 min, Walk 3 min (x2)"],
    ["Run 3 min, Walk 1.5 min; Run 5 min, Walk 2.5 min; Run 3 min, Walk 1.5 min; Run 5 min", "Run 3 min, Walk 1.5 min; Run 5 min, Walk 2.5 min; Run 3 min, Walk 1.5 min; Run 5 min", "Run 3 min, Walk 1.5 min; Run 5 min, Walk 2.5 min; Run 3 min, Walk 1.5 min; Run 5 min"],
    ["Run 5 min, Walk 3 min; Run 5 min, Walk 3 min; Run 5 min", "Run 5 min, Walk 3 min; Run 5 min, Walk 3 min; Run 5 min", "Run 5 min, Walk 3 min; Run 5 min, Walk 3 min; Run 5 min"],
    ["Run 5 min, Walk 3 min; Run 8 min, Walk 3 min; Run 5 min", "Run 5 min, Walk 3 min; Run 8 min, Walk 3 min; Run 5 min", "Run 5 min, Walk 3 min; Run 8 min, Walk 3 min; Run 5 min"],
    ["Run 25 min", "Run 25 min", "Run 25 min"],
    ["Run 28 min", "Run 28 min", "Run 28 min"],
    ["Run 30 min", "Run 30 min", "Run 30 min"],
];

// Initialize progress
const people = ["Alice", "Bob", "Charlie"];
const progress = JSON.parse(localStorage.getItem('c25kProgress')) || {
    Alice: Array(9).fill().map(() => Array(3).fill(false)),
    Bob: Array(9).fill().map(() => Array(3).fill(false)),
    Charlie: Array(9).fill().map(() => Array(3).fill(false))
};

// Render workouts
function renderWorkouts() {
    people.forEach(person => {
        const personWorkouts = document.getElementById(person.toLowerCase() + 'Workouts');
        personWorkouts.innerHTML = '';

        workouts.forEach((week, weekIndex) => {
            const weekDiv = document.createElement('div');
            weekDiv.className = 'week';
            weekDiv.innerHTML = `<h4>Week ${weekIndex + 1}</h4>`;

            week.forEach((day, dayIndex) => {
                const dayDiv = document.createElement('div');
                dayDiv.className = 'workout';
                const isChecked = progress[person][weekIndex][dayIndex] ? 'checked' : '';
                dayDiv.innerHTML = `
                    <label class="checkbox-label">
                        <span>Day ${dayIndex + 1}: ${day}</span>
                        <input type="checkbox" ${isChecked} onchange="toggleComplete('${person}', ${weekIndex}, ${dayIndex})">
                    </label>
                `;

                if (progress[person][weekIndex][dayIndex]) {
                    dayDiv.classList.add('complete');
                }

                weekDiv.appendChild(dayDiv);
            });

            personWorkouts.appendChild(weekDiv);
        });
    });
}

// Toggle completion status
function toggleComplete(person, week, day) {
    progress[person][week][day] = !progress[person][week][day];
    localStorage.setItem('c25kProgress', JSON.stringify(progress));
    renderWorkouts();
}

// Initial render
renderWorkouts();
