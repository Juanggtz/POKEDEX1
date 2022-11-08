/*---------------------------Función Fetch------------------ */

const fetchPokemon = () => {
    const pokeName = document.getElementById("nombre_pokemon");
    let pokeInput = pokeName.value;
    pokeInput = pokeInput.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            pokeImagen("./assets/pokeError.gif");

            const pokeName = document.getElementById("pokeName");
            let className = pokeName.classList.item(0);
            pokeName.classList.remove(className);
            pokeName.innerHTML = "ERROR";

            const pokeWeight = document.getElementById("pokeWeight");
            const pokeHeight = document.getElementById("pokeHeight");
            const Medida = document.getElementById("Medida");
            const Estadisticas = document.getElementById("Estadisticas");
            const tipo = document.getElementById("pokeType");

            tipo.innerHTML = "";
            pokeWeight.innerHTML = "";
            pokeHeight.innerHTML = "";
            Medida.innerHTML = "";
            Estadisticas.innerHTML = "";

            const pokeList = document.getElementById("pokeList");
            pokeList.replaceChildren();

        } else {
            return res.json();
        }
    }).then((data) => {
        let pokeImg = data.sprites.other.home.front_default;
        let pokeName = data.name;
        let pokeMove = data.moves;
        let pokeStats = data.stats;
        let pokeWeight = data.weight;
        let pokeHeight = data.height;
        let pokeTypes = data.types;
        pokeImagen(pokeImg);
        pokeData(pokeName, pokeMove, pokeStats, pokeWeight, pokeHeight, pokeTypes);
    })
}

/*-----------------------Imagen de Pokemon-------------- */
const pokeImagen = (url) => {
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
}

/*-----------------------Datos de Pokemon-------------- */
const pokeData = (name, moves, stats, weight, height, types) => {

    /*-----------------Name----------------------------*/
    const pokeName = document.getElementById("pokeName");
    const pokeType = types[0].type.name;
    pokeName.innerHTML = `${name.toUpperCase()}: ${pokeType.toUpperCase()}`;

    /*-----------------Medidas ----------------*/
    const pokeWeight = document.getElementById("pokeWeight");
    const pokeHeight = document.getElementById("pokeHeight");

    const medida = "Medida";
    document.getElementById(medida).innerHTML = "Medidas"
    pokeWeight.innerHTML = `Peso: ${weight}`;
    pokeHeight.innerHTML = `Altura: ${height}`;

    /*----------------Types------------------ */

    document.getElementById("Estadisticas").innerHTML = "Estadísticas"

    let className = pokeName.classList.item(0);
    pokeName.classList.remove(className);
    pokeName.classList.add(pokeType);


    /*-------------------Stats----------------------*/

    document.getElementById("pokeList").replaceChildren();


    for (let i = 0; i < stats.length; i++) {
        const node = document.createElement("li");
        const textnode = document.createTextNode(`${stats[i].stat.name.toUpperCase()} : ${stats[i].base_stat}`);
        node.appendChild(textnode);
        document.getElementById("pokeList").appendChild(node);
    }

    const pokeList = document.getElementById("pokeList");
    let classPokelist = pokeList.classList.item(0);
    pokeList.classList.remove(classPokelist);
    pokeList.classList.add(pokeType);

    /*---------------------Moves-------------------- */

}

/*------------------------Stats Function-------------------*/
const statsFunction = (stats) => {

    let node = document.createElement("li");
    let textnode = "";
    for (let i = 0; i < stats.length; i++) {
        textnode = document.createTextNode(`${stats[i].stat.name.toUpperCase()} : ${stats[i].base_stat}`);
        node.appendChild(textnode);
    }
    return node;
}