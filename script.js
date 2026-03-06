let teachers = [
    { name: "Anna Lea Casela", file: "anna.png" },
    { name: "Azenith Recile", file: "azenith.png" },
    { name: "Jaime Castro", file: "jaime.png" },
    { name: "Kae P Dilla", file: "kae.png" },
    { name: "Laine Veron", file: "laine.png" },
    { name: "Maria Cristina Cuevas", file: "maria.png" },
    { name: "Reyna Mantala", file: "reyna.png" },
    { name: "Rosavilla Galang", file: "rosavilla.png" },
    { name: "Paulo Quimson", file: "paulo.png" },
    { name: "Win Peds", file: "win.png" }
];

const grid = document.getElementById('teacherGrid');
let currentIndex = null;

function render(data = teachers) {
    grid.innerHTML = "";
    data.forEach((t, i) => {
        const div = document.createElement('div');
        div.className = "teacher";
        div.onclick = () => openProfile(i);
        div.innerHTML = `<img src="${t.file}"><div class="teacher-name">${t.name}</div>`;
        grid.appendChild(div);
    });
}

function openProfile(i) {
    currentIndex = i;
    document.getElementById('profileName').innerText = teachers[i].name;
    document.getElementById('profilePhoto').src = teachers[i].file;
    document.getElementById('profileModal').style.display = "flex";
}

function closeProfile() {
    document.getElementById('profileModal').style.display = "none";
}

// THE PC FULLSCREEN TRIGGER
function viewSchedule() {
    const viewer = document.getElementById('scheduleViewer');
    document.getElementById('scheduleFull').src = "schedule.png";
    viewer.style.display = "flex";
}

document.getElementById('scheduleViewer').onclick = function() {
    this.style.display = "none";
};

// SEARCH
document.getElementById('searchBar').oninput = (e) => {
    const val = e.target.value.toLowerCase();
    const filtered = teachers.filter(t => t.name.toLowerCase().includes(val));
    render(filtered);
};

// ADMIN
function loginAdmin() {
    if(document.getElementById('adminPass').value === "admin123") {
        document.querySelectorAll('.admin-only').forEach(e => e.style.display = "block");
        document.getElementById('loginModal').style.display = "none";
    }
}

function saveTeacher() {
    const name = document.getElementById('teacherName').value;
    if(name) {
        const file = name.split(' ')[0].toLowerCase() + ".png";
        teachers.push({ name, file });
        render();
        document.getElementById('addModal').style.display = "none";
    }
}

function deleteTeacher() {
    teachers.splice(currentIndex, 1);
    render();
    closeProfile();
}

setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleString();
}, 1000);

render();
