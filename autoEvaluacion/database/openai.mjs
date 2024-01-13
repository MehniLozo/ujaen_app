import OpenAI from "openai";
import {generatePrompt} from "./generadorPrompts.js"
import {construirSalida} from "./salidas.mjs"

const openai = new OpenAI();

const generarPregunta = async(tema, asignatura, tipoPregunta) => {
  const tipo = tipoPregunta || "alternativa";
  const completion = await openai.chat.completions.create({
    messages: generatePrompt(tema, asignatura, tipo),
    model: "gpt-3.5-turbo",
    temperature: 0.8,
  });
  
  // console.log(completion.choices[0].message);
  // console.log(completion.choices[0].message.content);
  // console.log("\n");
  let pregunta; 
  let respuesta;
  let justificacion;
  let enviarAPI = 0;

  do {
    if (tipo == "vf"){
      [pregunta, respuesta, justificacion, enviarAPI] = await construirSalida(tipo , completion.choices[0].message.content);  
    }
    else{
      [pregunta, respuesta, enviarAPI] = await construirSalida(tipo , completion.choices[0].message.content);
    }
    
  } while (!enviarAPI);
  
  
          // console.log("\nPregunta:",pregunta);
          // console.log("Respuesta:",respuesta);
          // console.log("EnviarAPI:",enviarAPI);

          return (tipo == "vf") ? [pregunta, respuesta, justificacion] : [pregunta, respuesta];
  // return [pregunta, respuesta];
}

//generarPregunta();
export {generarPregunta};
