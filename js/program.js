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

function Account(id, username, fullName, role, department) {
  this.id = id;
  this.username = username;
  this.fullName = fullName;
  this.role = role;
  this.department = department;
}

function getListAccount() {
  $.get(
    "https://63ed06dee6ee53bbf58fa6e8.mockapi.io/Account",
    function (data, status) {
      accountList = [];

      if (status == "error") {
        alert("load data is fail");
        return;
      }
      parseData(data);
      fillAccountToTable();
    }
  );
}

function parseData(data) {
  data.forEach(function (item) {
    accountList.push(
      new Account(
        item.id,
        item.username,
        item.fullName,
        item.role,
        item.department
      )
    );
  });
}

function fillAccountToTable() {
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
}

function buildTable() {
  $("tbody").empty();
  getListAccount();
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

  let username = accountList[index].username;

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
