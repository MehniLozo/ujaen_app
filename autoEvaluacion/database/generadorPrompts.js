function generatePrompt(tema, asig, tipo) {
    if (tipo === "alternativa") {
        return generatePromptAlt(tema, asig);
    } else if (tipo === "vf") {
        let probabilidad = Math.random();
        let veracidad = (probabilidad < 0.35) ? false : true;
        return generatePromptVF(tema, asig, veracidad);
    }
}

function generatePromptAlt(tema, asig) {
    let messages = [
        {
            role: "system",
            content: `Eres un creador de preguntas de selección múltiple con 4 alternativas, experto en ${tema}`,
        },
        {
            role: "user",
            content: `Asignatura: ${asig}`,
        },
        {
            role: "user",
            content: `Crea una pregunta del tema en que eres experto ${tema} que sirva para evaluar a estudiantes en la asignatura ${asig}. Elige una de las estructuras dadas para elaborar la pregunta, escoge la mas idonea. Luego escribe las alternativas considerando A) Respuesta correcta B) Respuesta incorrecta distractor Basado en conceptos relacionados C) Respuesta Incorrecta distractor basada en Errores comunes D) Respuesta incorrecta distractor Basado en conceptos relacionados. No utilices palabras como "nunca", "siempre" o "todos" en los distractores. Menciona que estructura escogiste, solo al final de generar las alternativas. No menciones la asignatura en ningun momento. Tu respuesta debe estar expresada de la siguiente manera: Pregunta: ¿[Pregunta]? A. Respuesta B. Respuesta C. Respuesta D. Respuesta Respuesta correcta: X. Estructura escogida: [estructura]`,
        },
    ];

    return messages;
}

function generatePromptVF(tema, asig, tipoAfirmacion) {
    let textA;
    if(tipoAfirmacion){
        textA = "verdadera";
    }else{
        textA = "falsa";
    }

    let messages = [
        {
            role: "system",
            content: `Eres un experto creador de Afirmaciones sobre ${tema} que pueden pueden ser verdadera o falsa`,
        },
        {
            role: "user",
            content: `Asignatura: ${asig}`,
        },
        {
            role: "user",
            // content: `Genera una afirmación teórica basado en el input que aplique los conocimientos de la asignatura y que evalúe el tema ${tema}. La afirmación debe tener máximo de dos oraciones y no más de 300 caracteres. No hables en ningun momento el tema, de la asignatura, o del tipo de afirmación, solamente tenlo en cuenta para la creación de la afirmación. Inicia la afirmación inmediatamente sin ningun encabezado o introduccion.`,
            content: `Genera una afirmación ${textA} teórica basado en el input que aplique los conocimientos de la asignatura y que evalúe el tema ${tema}. La afirmación debe tener máximo de dos oraciones y no más de 300 caracteres. No hables en ningun momento el tema, de la asignatura, o del tipo de afirmación, solamente tenlo en cuenta para la creación de la afirmación. Inicia la afirmación inmediatamente sin ningun encabezado o introduccion. terminar la afirmación con exactamente el texto "Veracidad:"${textA}". al finalizar añadir "Justificación: " y escribir una justificacion en no mas de 150 palabras`,
        },
    ];

    return messages;
}

module.exports = { generatePrompt };