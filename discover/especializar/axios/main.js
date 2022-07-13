const url = "http://localhost:5500/api";

function getUsers() {
    axios.get(url).then((res) => {
        // sem passar o JSON.stringify ele mostra apenas o tipo do objeto res
        // retorna um texto simples
        apiResult.textContent = JSON.stringify(res.data);
    });
}

function insertUser() {
    axios
        // .post(url, {
        //     name: "Olivia Martins",
        //     avatar: "https://source.unsplash.com/random",
        //     city: "São Paulo",
        // })
        .post(url, newUser)
        .then((res) => console.log(res))
        .catch((e) => console.error(e));
}

const newUser = {
    name: "Olivia Martins",
    avatar: "https://source.unsplash.com/random",
    city: "São Paulo",
};

getUsers();
//insertUser();
