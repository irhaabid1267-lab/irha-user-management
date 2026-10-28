
let users = JSON.parse(localStorage.getItem("users")) || [];

let form = document.getElementById("userForm");
let userList = document.getElementById("userList");
let saveBtn = document.getElementById("saveBtn");

let editIndex = -1;

function showUsers() {
    userList.innerHTML = "";

    users.forEach(function (user, index) {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.city}</td>
            <td>
                <button class="edit" onclick="editUser(${index})">Edit</button>
                <button class="delete" onclick="deleteUser(${index})">Delete</button>
            </td>
        `;

        userList.appendChild(row);
    });

    localStorage.setItem("users", JSON.stringify(users));
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        city: document.getElementById("city").value
    };

    if (editIndex === -1) {
        users.push(user);
    } else {
        users[editIndex] = user;
        editIndex = -1;
        saveBtn.textContent = "Add User";
    }

    form.reset();
    showUsers();
});

function editUser(index) {
    document.getElementById("name").value = users[index].name;
    document.getElementById("email").value = users[index].email;
    document.getElementById("phone").value = users[index].phone;
    document.getElementById("city").value = users[index].city;

    editIndex = index;
    saveBtn.textContent = "Update User";
}

function deleteUser(index) {
    users.splice(index, 1);

    if (editIndex === index) {
        editIndex = -1;
        form.reset();
        saveBtn.textContent = "Add User";
    } else if (editIndex > index) {
        editIndex--;
    }

    showUsers();
}

showUsers();
