import './style.css'


const app = document.querySelector("#app");

let allUsers = '';
const fetchUsers = async () => {
    try {
        const userData = await fetch('http://localhost:4400/users');
        const users = await userData.json();
        allUsers = await users;
    } catch (error) {
        console.error("Error fetching user", error)
    }
}


const creatCard = async () => {
    const cardContainer = document.createElement("div");
    cardContainer.setAttribute("class", "card_container");
    app.appendChild(cardContainer);
    if (!allUsers) {
        await fetchUsers();
        for (let i = 0; i < allUsers.length; i++) {
            const avatar = document.createElement("img");
            avatar.style.borderRadius = "50%"
            const fullName = document.createElement("p");
            const email = document.createElement("p");
            const card = document.createElement("div");
            card.classList.add("card");
            card.id = allUsers[i].id;

            avatar.setAttribute("src", allUsers[i].avatar);
            avatar.setAttribute("alt", "photo de profil");

            email.textContent = `${allUsers[i].email}`;
            fullName.textContent = `${allUsers[i].name}`;
            cardContainer.appendChild(card);
            card.appendChild(avatar);
            card.appendChild(fullName);
            card.appendChild(email);
            card.addEventListener('click', async (e) => {
                const user = await fetchUser(e.target.id)
                app.removeChild(cardContainer);
                console.log(user);
            })
        }
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