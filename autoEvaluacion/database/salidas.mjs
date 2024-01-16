import {eliminarSubcadena} from "./functions.mjs";


// function eliminarSubcadena(cadena , subcadena){
//     let cadenaResult = cadena.replace(new RegExp( subcadena, 'g'), '');
//     return cadenaResult;
// }   //  ESTA FUNCION BORRARLA QUE LA AÑADI PORQUE NO SE DEJABA IMPORTAR DE FUNCTIONS.MJS



function salidaAlt(response) {
    let [pregunta, alternativas, correcta] = tomarAlternativas(response);
    pregunta = `${pregunta.split(":")[1]}`;
    let letraMayuscula = correcta.toUpperCase();
    let numeroCorrecta = letraMayuscula.charCodeAt(0) - 'A'.charCodeAt(0);
    let enviarAPI = 1;
    if (numeroCorrecta < 0 || numeroCorrecta > 3) {
        console.info("PREGUNTA ALTERNATIVA AÑADIDA SIN RESPUESTA CORRECTA", pregunta);
        enviarAPI = 0;
    }

    let respuesta = [];
    let id = ["50", "20", "30", "40"];
    alternativas.forEach((item, index) => {
        let dic = {
            idOpcion: id[index],
            descripcion: `${item}`,
            correcta: numeroCorrecta === index
        };
        respuesta.push(dic);
    });

    if (respuesta.length !== 4) enviarAPI = 0;
    return [pregunta, respuesta, enviarAPI];
}

async function salidaVF(response) {
    let [pregunta, respuesta, justificacion] = await limpiarVF2(response);
    // pregunta = `<p>${pregunta} </p>`;
    // let id = ["10", "20"];
    let enviarAPI = 1;
    // let opciones = [["Verdadera", "V"], ["Falsa", "F"]];
    // let respuesta = opciones.map((opc, index) => ({
    //     idOpcion: id[index],
    //     descripcion: opc[0],
    //     correcta: res === opc[1]
    // }));
    respuesta = await eliminarSubcadena(respuesta, "\n");
    if (!(pregunta && respuesta)) enviarAPI = 0;
    return [pregunta, respuesta, justificacion, enviarAPI];
}

export async function construirSalida(tipo, response) {
    let pattern = /Estructura escogida:.*?\?/;
    response = response.replace(pattern, "");
    if (tipo === "alternativa") {
        return salidaAlt(response);
    } else if (tipo === "vf") {
        return salidaVF(response);
    }
}

function tomarAlternativas(preg) {
    let alt = preg.split("\na)");
    let pregunta = alt[0];
    let mayMin = "min";
    let parPunto = "par";
    if (alt[0] === preg) {
        mayMin = "may";
        alt = preg.split("\nA)");
        if (alt[0] === preg) {
            parPunto = "punto";
            mayMin = "may";
            alt = preg.split("\nA.");
            if (alt[0] === preg) {
                alt = preg.split("\na.");
                mayMin = "min";
            }
        }
    }
    pregunta = alt[0];
    if (alt.length > 1) {
        alt = alt[1];
    } else {
        alt = null;
    }
    const alternativas = [];
    let ind = 0;

    while (alt !== null) {
        ind++;
        const letterLower = String.fromCharCode(97 + ind);
        const letterUpper = String.fromCharCode(65 + ind);
        const splitPattern = mayMin === "min" ? (parPunto === "par" ? `\n${letterLower})` : `\n${letterLower}.`) 
                             : (parPunto === "par" ? `\n${letterUpper})` : `\n${letterUpper}.`);
        const splitAlt = alt.split(splitPattern);

        if (splitAlt.length > 1) {
            alternativas.push(splitAlt[0]);
            alt = splitAlt[1];
        } else {
            alternativas.push(splitAlt[0]);
            alt = null;
        }
    }

    const indiceSaltoDeLinea = alternativas[alternativas.length - 1].indexOf("\n");
    let correcta = "";
    if (indiceSaltoDeLinea !== -1) {
        const temp = alternativas[alternativas.length - 1].substring(0, indiceSaltoDeLinea);
        correcta = alternativas[alternativas.length - 1].substring(indiceSaltoDeLinea);
        alternativas[alternativas.length - 1] = temp;
    }
    const splitCorrecta = correcta.split("Respuesta correcta:");
    correcta = splitCorrecta.length > 1 ? splitCorrecta[1].trim() : "";

    // Encontrar en correcta cuál es la letra de la alternativa correcta
    const letrasBuscadas = ["a", "b", "c", "d"];
    const posiciones = letrasBuscadas.map(letra => correcta.toLowerCase().indexOf(letra));
    const posicionesFiltradas = posiciones.filter(pos => pos !== -1);

    if (posicionesFiltradas.length) {
        const posicionMinima = Math.min(...posicionesFiltradas);
        correcta = correcta[posicionMinima];
    }

    return [ pregunta, alternativas, correcta ];
}

function limpiarVF2(response) {
    
    let arrayResponse= response.split("Veracidad: ");
    const afirmacion = arrayResponse[0];
    arrayResponse = arrayResponse[1].split("Justificación: ");
    const veracidad = (arrayResponse[0].includes("falsa")?"falsa":"verdadera");
    const justificacion = arrayResponse[1];
    return [afirmacion, veracidad, justificacion];
}

function limpiarVF(response) {
    response = response.replace("Afirmación:", "");
    let a = response.indexOf("\n");
    while (a === 0) {
        response = response.substring(1);
        a = response.indexOf("\n");
    }

    const [preg, resRaw] = response.split("Respuesta:");
    const letrasBuscadas = ["v", "f"];
    const posiciones = letrasBuscadas.map(letra => resRaw.toLowerCase().indexOf(letra));
    const posicionesFiltradas = posiciones.filter(pos => pos !== -1);

    let res = "";
    if (posicionesFiltradas.length) {
        const posicionMinima = Math.min(...posicionesFiltradas);
        res = resRaw[posicionMinima];
    }
    res = res.toUpperCase();

    return [ preg, res ];
}


// Las funciones tomarAlternativas y limpiarVF necesitan ser convertidas a Node.js.
// Esta conversión depende de la lógica específica de estas funciones en Python.

// export default { construirSalida };
