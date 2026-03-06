// Initial Data - Lowercase first names for PNG files
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
let currentEditIndex = null;

// Render the Teacher Grid
function render(list = teachers) {
    grid.innerHTML = "";
    list.forEach((t, index) => {
        const div = document.createElement('div');
        div.className = "teacher";
        div.onclick = () => openProfile(index);
        div.innerHTML = `
            <img src="${t.file}" alt="${t.name}" onerror="this.src='https://via.placeholder.com/120?text=No+Photo'">
            <div class="teacher-name">${t.name}</div>
        `;
        grid.appendChild(div);
    });
}

// Search Functionality
document.getElementById('searchBar').oninput = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = teachers.filter(t => t.name.toLowerCase().includes(term));
    render(filtered);
};

// Profile Modal Logic
function openProfile(index) {
    currentEditIndex = index;
    document.getElementById('profileName').innerText = teachers[index].name;
    document.getElementById('profilePhoto').src = teachers[index].file;
    document.getElementById('profileModal').style.display = "flex";
}

function closeProfile() {
    document.getElementById('profileModal').style.display = "none";
}

// Full-Screen Schedule Logic
function viewSchedule() {
    const viewer = document.getElementById('scheduleViewer');
    document.getElementById('scheduleFull').src = "schedule.png";
    viewer.style.display = "flex"; 
}

// Close schedule on click
document.getElementById('scheduleViewer').onclick = function() {
    this.style.display = "none";
};

// Admin Login Logic
function loginAdmin() {
    const pass = document.getElementById('adminPass').value;
    if(pass === "admin123") {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = "block");
        document.getElementById('adminLoginBtn').style.display = "none";
        document.getElementById('logoutBtn').style.display = "inline-block";
        document.getElementById('loginModal').style.display = "none";
    } else {
        alert("Incorrect Password!");
    }
}

// Add Teacher Function
function saveTeacher() {
    const nameInput = document.getElementById('teacherName').value;
    if (nameInput) {
        // Automatically creates filename: e.g. "John Doe" -> "john.png"
        const fileName = nameInput.split(' ')[0].toLowerCase() + ".png";
        teachers.push({ name: nameInput, file: fileName });
        render();
        document.getElementById('addModal').style.display = "none";
        document.getElementById('teacherName').value = ""; 
    } else {
        alert("Please enter a name.");
    }
}

// Delete Function
function deleteTeacher() {
    if (confirm("Remove this teacher from the map?")) {
        teachers.splice(currentEditIndex, 1);
        render();
        closeProfile();
    }
}

// Real-time Clock
setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleString();
}, 1000);

// Initialize
render();
