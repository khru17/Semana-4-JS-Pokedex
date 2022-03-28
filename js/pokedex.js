
const fetchPokemon = () => {
    
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    
    fetch(url).then((res) => {
        if(res.status != "200") {
            mostrarAlerta();
            
        } else {
            return res.json();
        }
    }).then((data) => {
        if(data) {
            
            console.log(data);
            let pokeImg = data.sprites.front_default;
            informacionPokemon(data);
            pokemonImagen(pokeImg);
            estadisticasPokemon(data);
            movimientosPokemon(data);
            ocultarImagen();
            mostrarInformacion();
            
        }
    });

}

// Agrega la imagen del pokemon
const pokemonImagen = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

// Agregar clase que remueve la clase hide (oculta el container)
const mostrarInformacion = () => {
    const informacionPokemon = document.getElementById("informacionPokemon");
    informacionPokemon.classList.remove("hide");
}


// Obtiene informacion de la API del pokemon
// Para mostrar la informacion en la pagina web
const informacionPokemon = (data) => {
    
    // *** Nombre
    let nombrePoke = letraMayuscula(data.name);
    document.getElementById("nombrePokemon").innerHTML = `${nombrePoke}   No. ${data.id}`;
    
    // *** Tipo
    let informacionPoke = document.getElementById("infoPokemon");

    // Elimina los nodos hijos del div #tipoPokemon
    while (informacionPoke.firstChild) {
        informacionPoke.removeChild(informacionPoke.firstChild);
    }

    // Agrega los elementos a mostrar la informacion del pokemon
    let subtituloTipos = document.createElement("h3");
    subtituloTipos.textContent = "Tipo: ";
    subtituloTipos.classList.add("titulosDatos");
    informacionPoke.appendChild(subtituloTipos);
    for(let i = 0; i < data.types.length; i++) {
        let tipoTexto = document.createElement("p");
        tipoTexto.classList.add("letraTipos");
        tipoTexto.textContent = letraMayuscula(data.types[i].type.name);
        
        informacionPoke.appendChild(tipoTexto);
    }
    //console.log(data.types[0].type.name);

    // *** Peso
    let subtituloPeso = document.createElement("h3");
    subtituloPeso.textContent = "Peso :";
    subtituloPeso.classList.add("titulosDatos");
    informacionPoke.appendChild(subtituloPeso);
    let pesoTexto = document.createElement("p");
    pesoTexto.classList.add("letraTipos");
    pesoTexto.textContent = `${data.weight / 10} Kg`;
    informacionPoke.appendChild(pesoTexto);

    // *** Altura
    let subtituloAltura = document.createElement("h3");
    subtituloAltura.textContent = "Altura: ";
    subtituloAltura.classList.add("titulosDatos");
    informacionPoke.appendChild(subtituloAltura);
    let alturaTexto = document.createElement("p");
    alturaTexto.classList.add("letraTipos");
    alturaTexto.textContent = `${data.height / 10} m`;
    informacionPoke.appendChild(alturaTexto);

    ocultarAlerta();
}


// Obtener estadisticas y mostrarlas en la pagina 
const estadisticasPokemon = (data) => {

    
    // *** Vida
    let vida = document.getElementById("hp");
    vida.style = `width: ${data.stats[0].base_stat}%`;
    vida.innerHTML = `${data.stats[0].base_stat}%`;

    // *** Ataque
    let ataque = document.getElementById("attack");
    ataque.style = `width: ${data.stats[1].base_stat}%`;
    ataque.innerHTML = `${data.stats[1].base_stat}%`;

    // *** Defensa
    let defensa = document.getElementById("defense");
    defensa.style = `width: ${data.stats[2].base_stat}%`;
    defensa.innerHTML = `${data.stats[2].base_stat}%`;

    // *** Ataque Especial
    let ataqueEspecial = document.getElementById("special-attack");
    ataqueEspecial.style = `width: ${data.stats[3].base_stat}%`;
    ataqueEspecial.innerHTML = `${data.stats[3].base_stat}%`;

    // *** Defensa Especial
    let defensaEspecial = document.getElementById("special-defense");
    defensaEspecial.style = `width: ${data.stats[4].base_stat}%`;
    defensaEspecial.innerHTML = `${data.stats[4].base_stat}%`;

    // *** Defensa Especial
    let velocidad = document.getElementById("speed");
    velocidad.style = `width: ${data.stats[5].base_stat}%`;
    velocidad.innerHTML = `${data.stats[5].base_stat}%`;


}


// Convertir la primera letra en mayúscula
const letraMayuscula = (word) => {
    return word[0].toUpperCase() + word.slice(1);
}

const mostrarAlerta = () => {
    const alertaMostrar = document.getElementById("alerta");
    alertaMostrar.classList.remove("hide");
}

const ocultarAlerta = () => {
    const alertaQuitar = document.getElementById("alerta");
    alertaQuitar.classList.add("hide");
}

const ocultarImagen = () => {
    const ocultarImg = document.getElementById("imgBienvenida");
    ocultarImg.classList.add("hide");
}

const movimientosPokemon = (data) => {
    let movimientos = document.getElementById("movimientosPokemon");

    while (movimientos.firstChild) {
        movimientos.removeChild(movimientos.firstChild);
    }

    for(let i = 0; i < data.moves.length; i++) {
        let movimientoTexto = document.createElement("p");
        movimientoTexto.classList.add("letraTipos");
        console.log(data.moves[i].move.name);
        movimientoTexto.textContent = `${i}.- ${letraMayuscula(data.moves[i].move.name)}`;
        
        movimientos.appendChild(movimientoTexto);
    }
}