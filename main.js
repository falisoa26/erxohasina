import './style.css'

const app = document.querySelector("#app");

//funtion featch data
const fetchUsers = async () => {
  try {
    const userData = await fetch('http://localhost:4400/users');
    return await userData.json();

  } catch (error) {
    console.error("Error fetching user", error)
  }
}
const allUsers = await fetchUsers();



//fonction creat Card
const creatCard = async () => {
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
    })
  }
}

creatCard();

const fetchUser = async (idTofetch) => {
  try {
    const res = await fetch(`http://localhost:4400/users/${idTofetch}`)
    return await res.json();
  } catch (error) {
    console.error("Error fetching user", error)
  }
}
//funtio info
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