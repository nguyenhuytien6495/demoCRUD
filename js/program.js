$(function () {
  $(".header").load("header.html");
  $(".main").load("home.html");
  $(".footer").load("footer.html");
});

function clickNavHome() {
  $(".main").load("home.html");
}

function clickViewListAccount() {
  $(".main").load("viewListAccount.html");
  buildTable();
}

let accountList = [];
let counter = 1;

function Account(username, fullName, role, department) {
  this.id = counter++;
  this.username = username;
  this.fullName = fullName;
  this.role = role;
  this.department = department;
}

function initAccount() {
  if (null == accountList || accountList.length === 0) {
    accountList.push(
      new Account("huytien", "Nguyễn Huy Tiến", "ADMIN", "Developer")
    );
    accountList.push(
      new Account("hoangminh", "Hoang Minh", "MANAGER", "Developer")
    );
    accountList.push(
      new Account("thanhlinh", "Thanh Linh", "EMPLOYEE", "Developer")
    );
  }
}

function buildTable() {
  setTimeout(function name(params) {
    $("tbody").empty();
    initAccount();
    accountList.forEach(function (item) {
      $("tbody").append(
        "<tr>" +
          "<td>" +
          item.id +
          "</td>" +
          "<td>" +
          item.username +
          "</td>" +
          "<td>" +
          item.fullName +
          "</td>" +
          "<td>" +
          item.role +
          "</td>" +
          "<td>" +
          item.department +
          "</td>" +
          "<td>" +
          '<a class="edit" title="Edit" data-toggle="tooltip" onclick="openUpdateModal(' +
          item.id +
          ')"><i class="material-icons">&#xE254;</i></a>' +
          '<a class="delete" title="Delete" data-toggle="tooltip" onclick="openComfiemDelete(' +
          item.id +
          ')"><i class="material-icons">&#xE872;</i></a>' +
          "</td>" +
          "</tr>"
      );
    });
  }, 500);
}

function openAddModal() {
  resetForm();
  openModal();
}

function resetForm() {
  document.getElementById("id").value = "";
  document.getElementById("username").value = "";
  document.getElementById("fullName").value = "";
  document.getElementById("role").value = "";
  document.getElementById("department").value = "";
}

function openModal() {
  $("#myModal").modal("show");
}

function hideModal() {
  $("#myModal").modal("hide");
}

function addAccount() {
  let username = document.getElementById("username").value;
  let fullName = document.getElementById("fullName").value;
  let role = document.getElementById("role").value;
  let department = document.getElementById("department").value;

  accountList.push(new Account(username, fullName, role, department));

  hideModal();
  buildTable();
}

function openUpdateModal(id) {
  let index = accountList.findIndex((x) => x.id == id);

  document.getElementById("id").value = accountList[index].id;
  document.getElementById("username").value = accountList[index].username;
  document.getElementById("fullName").value = accountList[index].fullName;
  document.getElementById("role").value = accountList[index].role;
  document.getElementById("department").value = accountList[index].department;

  openModal();
}

function save() {
  let id = document.getElementById("id").value;
  if (id == null || id == "") {
    addAccount();
  } else {
    updateAccount();
  }
}

function updateAccount() {
  let id = document.getElementById("id").value;
  let username = document.getElementById("username").value;
  let fullName = document.getElementById("fullName").value;
  let role = document.getElementById("role").value;
  let department = document.getElementById("department").value;

  let index = accountList.findIndex((x) => x.id == id);

  accountList[index].username = username;
  accountList[index].fullName = fullName;
  accountList[index].role = role;
  accountList[index].department = department;

  hideModal();
  buildTable();
}

function openComfiemDelete(id) {
  let index = accountList.findIndex((x) => x.id == id);

  let name = accountList[index].username;

  var result = confirm("Want to delete " + username + "?");
  if (result) {
    deleteAccount(id);
  }
}

function deleteAccount(id) {
  let index = accountList.findIndex((x) => x.id == id);
  accountList.splice(index, 1);

  buildTable();
}
