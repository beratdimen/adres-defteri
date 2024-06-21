let formAdd = document.querySelector(".formAdd");
let adress = document.querySelector(".table");
let clearLocal = document.querySelector(".clearLocal");
let updateForm = document.querySelector(".updateForm");
let adresList = [];

let updatedId = 0;

if (typeof localStorage.adresList !== "undefined") {
  adresList = JSON.parse(localStorage.adresList);
  render();
}

function handleAddForm(e) {
  e.preventDefault();

  let formData = new FormData(formAdd);
  let formObj = Object.fromEntries(formData);

  if (updatedId !== 0) {
    for (let i = 0; i < adresList.length; i++) {
      if (updatedId === adresList[i].id) {
        adresList[i].adi = formObj.name;
        adresList[i].soyadi = formObj.lname;
        adresList[i].adres = formObj.adress;
        adresList[i].telefon = Number(formObj.phonenumber);
      }
    }

    updatedId = 0;
  } else {
    adresList.push({
      id: adresList.length + 1,
      adi: formObj.name,
      soyadi: formObj.lname,
      adres: formObj.adress,
      telefon: Number(formObj.phonenumber),
    });
  }

  save();
  render();
  formAdd.reset();
}

formAdd.addEventListener("submit", handleAddForm);

function save() {
  localStorage.adresList = JSON.stringify(adresList);
}

function render() {
  adress.innerHTML = `
  <tr>
<th>Adı</th>
<th>Soyadı</th>
<th>Telefonu</th>
<th>Adresi</th>
<th colspan="2">Aksiyon</th>
</tr>`;
  for (let i = 0; i < adresList.length; i++) {
    adress.innerHTML += `
    <tr data-index=${adresList[i].id}>
      <td>${adresList[i].adi}</td>
      <td>${adresList[i].soyadi}</td>
      <td>${adresList[i].telefon}</td>
      <td> ${adresList[i].adres} </td>
      <td><button class="update">✎</button></td>
      <td><button class="remove">🗑</button></td>
    </tr>
      `;

    let remove = document.querySelectorAll(".remove");
    for (let i = 0; i < remove.length; i++) {
      remove[i].addEventListener("click", handleRemove);
    }

    let update = document.querySelectorAll(".update");
    for (let i = 0; i < update.length; i++) {
      update[i].addEventListener("click", handleUpdate);
    }
  }
}

function handleClear() {
  localStorage.clear();
  adress.innerHTML = "";
  adresList = [];
  formAdd.reset();
}

function handleRemove(e) {
  let button = e.target;

  for (let i = 0; i < adresList.length; i++) {
    if (
      Number(button.parentElement.parentElement.dataset.index) ===
      adresList[i].id
    ) {
      adresList.splice(i, 1);
      save();
      render();
    }
  }
  button.parentElement.parentElement.remove();

  if (localStorage.adresList == "[]") {
    handleClear();
  }
}

function handleUpdate(e) {
  let button = e.target;

  for (let i = 0; i < adresList.length; i++) {
    if (
      Number(button.parentElement.parentElement.dataset.index) ===
      adresList[i].id
    ) {
      formAdd.name.value = adresList[i].adi;
      formAdd.lname.value = adresList[i].soyadi;
      formAdd.adress.value = adresList[i].adres;
      formAdd.phonenumber.value = adresList[i].telefon;

      updatedId = adresList[i].id;
    }
  }
}

clearLocal.addEventListener("click", handleClear);
