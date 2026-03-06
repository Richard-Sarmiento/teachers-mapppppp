// Initial Data with your new additions
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

// Render Grid
function render(list = teachers) {
    grid.innerHTML = "";
    list.forEach((t, index) => {
        const div = document.createElement('div');
        div.className = "teacher";
        div.onclick = () => openProfile(index);
        div.innerHTML = `
            <img src="${t.file}" alt="${t.name}" onerror="this.src='https://via.placeholder.com/120?text=No+Image'">
            <div class="teacher-name">${t.name}</div>
        `;
        grid.appendChild(div);
    });
}

// Open/Close Modals
const openAdd = () => document.getElementById('addModal').style.display = "flex";
const closeAdd = () => document.getElementById('addModal').style.display = "none";
const closeProfile = () => document.getElementById('profileModal').style.display = "none";

// Add Teacher Function
function saveTeacher() {
    const nameInput = document.getElementById('teacherName').value;
    const fileInput = document.getElementById('teacherPhoto').files[0];

    if (nameInput) {
        // If a file is uploaded, we create a local URL for it, 
        // otherwise we guess the lowercase first name .png
        const fileName = fileInput ? URL.createObjectURL(fileInput) : nameInput.split(' ')[0].toLowerCase() + ".png";
        
        teachers.push({ name: nameInput, file: fileName });
        render();
        closeAdd();
        document.getElementById('teacherName').value = ""; // Clear input
    } else {
        alert("Please enter a name.");
    }
}

// Delete Teacher
function deleteTeacher() {
    if (confirm(`Are you sure you want to remove ${teachers[currentEditIndex].name}?`)) {
        teachers.splice(currentEditIndex, 1);
        render();
        closeProfile();
    }
}

// Profile & Schedule
function openProfile(index) {
    currentEditIndex = index;
    document.getElementById('profileName').innerText = teachers[index].name;
    document.getElementById('profilePhoto').src = teachers[index].file;
    document.getElementById('profileModal').style.display = "flex";
}

function viewSchedule() {
    document.getElementById('scheduleFull').src = "schedule.png";
    document.getElementById('scheduleViewer').style.display = "flex";
}

// Search
document.getElementById('searchBar').oninput = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = teachers.filter(t => t.name.toLowerCase().includes(term));
    render(filtered);
};

// Admin Login
function loginAdmin() {
    if(document.getElementById('adminPass').value === "admin123") {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = "block");
        document.getElementById('adminLoginBtn').style.display = "none";
        document.getElementById('logoutBtn').style.display = "inline-block";
        document.getElementById('loginModal').style.display = "none";
    } else { alert("Wrong password!"); }
}

// Clock
setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleString();
}, 1000);

render();