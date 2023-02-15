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
let counter = 0;

function Account(name, department, phone) {
  this.id = counter++;
  this.name = name;
  this.department = department;
  this.phone = phone;
}

function initAccount() {
  if (null == accountList || accountList.length === 0) {
    accountList.push(
      new Account("John Doe", "Administration", "(171) 555-2222")
    );
    accountList.push(
      new Account("Peter Parker", "Customer Service", "(313) 555-5735")
    );
    accountList.push(
      new Account("Fran Wilson", "Human Resources", "(503) 555-9931")
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
          item.name +
          "</td>" +
          "<td>" +
          item.department +
          "</td>" +
          "<td>" +
          item.phone +
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
  document.getElementById("name").value = "";
  document.getElementById("department").value = "";
  document.getElementById("phone").value = "";
}

function openModal() {
  $("#myModal").modal("show");
}

function hideModal() {
  $("#myModal").modal("hide");
}

function addAccount() {
  let name = document.getElementById("name").value;
  let department = document.getElementById("department").value;
  let phone = document.getElementById("phone").value;

  accountList.push(new Account(name, department, phone));

  hideModal();
  buildTable();
}

function openUpdateModal(id) {
  let index = accountList.findIndex((x) => x.id == id);

  document.getElementById("id").value = accountList[index].id;
  document.getElementById("name").value = accountList[index].name;
  document.getElementById("department").value = accountList[index].department;
  document.getElementById("phone").value = accountList[index].phone;

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
  let name = document.getElementById("name").value;
  let department = document.getElementById("department").value;
  let phone = document.getElementById("phone").value;

  let index = accountList.findIndex((x) => x.id == id);

  accountList[index].name = name;
  accountList[index].department = department;
  accountList[index].phone = phone;

  hideModal();
  buildTable();
}

function openComfiemDelete(id) {
  let index = accountList.findIndex((x) => x.id == id);

  let name = accountList[index].name;

  var result = confirm("Want to delete " + name + "?");
  if (result) {
    deleteAccount(id);
  }
}

function deleteAccount(id) {
  let index = accountList.findIndex((x) => x.id == id);
  accountList.splice(index, 1);

  buildTable();
}
