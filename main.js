import './style.css'
import { creatButtonSA, fetchUser, fetchUsers, postUser } from './lib/post';
import { put } from './lib/updatUser';
const app = document.querySelector("#app");
let name = "";
let email = "";
let avatar = "";

//funtion featch all data

let allUsers = await fetchUsers();

function creatButton() {
  const cardContainer = document.querySelector(".card_container")
  const creat = document.createElement("div");
  creat.classList.add("card_btn");
  cardContainer.prepend(creat);
  const button_creat = creatButtonSA("button", "button_creat", "Creat");
  creat.appendChild(button_creat);
  button_creat.addEventListener("click", () => {
    app.removeChild(cardContainer);
    addData()
  })
}

//fonction creat Card
const creatCard = async () => {
  allUsers = await fetchUsers()
  const cardContainer = document.createElement("div");
  cardContainer.setAttribute("class", "card_container");
  app.appendChild(cardContainer);

  for (let i = 0; i < allUsers.length; i++) {
    const nameUser = allUsers[i].name;
    const avartUser = allUsers[i].avatar;
    const emailUser = allUsers[i].email;
    const card_user = document.createElement("div");
    card_user.classList.add("card");
    card_user.id = allUsers[i].id;
    cardContainer.appendChild(card_user);

    const btnEdit = document.createElement("div");
    btnEdit.id = allUsers[i].id;
    btnEdit.classList.add("btn_edit");
    btnEdit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
  <path d="M13.5 6.5l4 4" />
</svg>`;
    card_user.appendChild(btnEdit);

    const card_avatar = document.createElement("figure");
    card_user.appendChild(card_avatar);
    const imageAvatar = document.createElement("img");
    imageAvatar.setAttribute("src", avartUser);
    imageAvatar.setAttribute("alt", "photo de profil");
    card_avatar.appendChild(imageAvatar);
    const bodyCard = document.createElement("div");
    bodyCard.setAttribute("class", "body_card");
    card_user.appendChild(bodyCard);
    for (let j = 0; j < 2; j++) {
      let paragraphe = document.createElement("p");
      bodyCard.appendChild(paragraphe);

      if (j === 0) {
        paragraphe.textContent = nameUser
      } else {
        paragraphe.textContent = emailUser
      }

    }
    card_user.addEventListener('click', async (e) => {
      app.removeChild(cardContainer);
      const user = await fetchUser(e.target.id);
      const profil = await userProfil(user);
    });
    card_user.addEventListener('mouseover', () => {
      btnEdit.classList.add("hover");
    });
    card_user.addEventListener('mouseleave', () => {
      btnEdit.classList.remove("hover");
    });
    btnEdit.addEventListener('click', async (e) => {
      e.stopPropagation();
      const user = await fetchUser(e.target.id)
      app.removeChild(cardContainer)
      addData(user);
    });

  }
  creatButton()
}

creatCard();

//funtion show info user
const userProfil = async (user) => {
  const containerProfil = document.createElement("div");
  containerProfil.classList.add("container_profil");
  app.appendChild(containerProfil);
  const cardProfil = document.createElement("div");
  cardProfil.classList.add("card_profil");
  containerProfil.appendChild(cardProfil);
  const info = document.createElement("div");
  info.classList.add("info");
  containerProfil.appendChild(info);
  const avartUser = document.createElement("img");
  avartUser.setAttribute("src", user.avatar);
  avartUser.setAttribute("alt", "photo de profil");
  cardProfil.appendChild(avartUser);
  for (let cle in user) {
    if (!(cle === "id") && !(cle === "address") && !(cle === "company") && !(cle === "avatar")) {
      const paragraphe = document.createElement("p");
      paragraphe.textContent = `${cle.toUpperCase()} : ${user[cle]}`
      info.appendChild(paragraphe);
    } else if (cle === "address") {
      const paragraphe = document.createElement("p");
      paragraphe.textContent = `${cle.toUpperCase()} : city(${user[cle].city}) ,street(${user[cle].street})`
      info.appendChild(paragraphe);
    }
    else if (cle === "company") {
      const paragraphe = document.createElement("p");
      paragraphe.textContent = `${cle.toUpperCase()} : name(${user[cle].name}) ,catchPhrase(${user[cle].catchPhrase})`
      info.appendChild(paragraphe);
    }
  }
  const buttonRet = document.createElement("div");
  buttonRet.classList.add("btn-retur");
  buttonRet.textContent = "Home"
  info.appendChild(buttonRet);
  buttonRet.addEventListener('click', async (e) => {
    app.removeChild(containerProfil);
    await creatCard();
  })
}
//function creat input
// const creatInput = (classeName, type, placeholder) => {
//   const inputFile = document.createElement("input");
//   inputFile.classList.add(classeName)

// }

// fonction creat page formulaire
function addData(user) {
  const forme = document.createElement("form");
  forme.classList.add("form_add")
  app.appendChild(forme);

  const inputFile = document.createElement("input");
  inputFile.classList.add("input_file")
  inputFile.setAttribute("type", "file");
  inputFile.setAttribute("accept", "image/*");


  forme.appendChild(inputFile)

  const inputName = document.createElement("input");
  inputName.classList.add("input_name")
  inputName.setAttribute("type", "text");
  inputName.setAttribute("placeholder", "name");
  inputName.setAttribute("required", "required");
  forme.appendChild(inputName)

  const inputEmail = document.createElement("input");
  inputEmail.classList.add("input_email")
  inputEmail.setAttribute("type", "email");
  inputEmail.setAttribute("placeholder", "email");
  inputEmail.setAttribute("required", "required");
  forme.appendChild(inputEmail)

  const inputAvatar = document.createElement("input");
  inputAvatar.classList.add("input_avata")
  inputAvatar.setAttribute("type", "text");
  inputAvatar.setAttribute("placeholder", "avatar");
  inputAvatar.setAttribute("required", "required");
  forme.appendChild(inputAvatar)

  inputAvatar.addEventListener("click", () => {

  })

  const buttonSav = creatButtonSA("submit", "btn-save", user ? "Save" : "creat");
  const buttonCancel = creatButtonSA("button", "btn-cancel", "Cancel");
  forme.appendChild(buttonSav);
  forme.appendChild(buttonCancel);
  inputName.addEventListener("input", (e) => {
    name = e.target.value.trim();
  })
  inputEmail.addEventListener("input", (e) => {
    email = e.target.value.trim();
  })
  inputAvatar.addEventListener("input", (e) => {
    avatar = e.target.value.trim();
  })
  buttonSav.addEventListener("click", async (e) => {

    if (user) {
      await put(user.id, { name, email, avatar });
      const form = document.querySelector(".form_add");
      app.removeChild(form)
      name = "";
      email = "";
      avatar = "";

      await creatCard();
    }
    else {
      if (name != '' && email != '' && avatar != '') {
        e.preventDefault();
        await postUser({ name, email, avatar });
        const form = document.querySelector(".form_add");
        app.removeChild(form)
        name = "";
        email = "";
        avatar = "";

        await creatCard();
      }
    }

  })

  if (user) {
    inputName.value = user.name;
    inputEmail.value = user.email;
    inputAvatar.value = user.avatar;
    name = user.name;
    email = user.email;
    avatar = user.avatar;


  }
  buttonCancel.addEventListener("click", () => {
    app.removeChild(forme)
    creatCard();
  })



}
