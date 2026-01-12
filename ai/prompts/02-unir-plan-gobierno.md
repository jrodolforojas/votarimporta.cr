# Unir planes de gobierno

### Contexto

En Febrero de 2026 son las elecciones presidenciales de Costa Rica para el gobierno de 2026-2030. Uno de los principales problemas en Costa Rica con respecto a las elecciones es el **abstencionismo**, principalmente en jóvenes de entre 18 y 38 años de edad. Así que el objetivo es crear una página web minimalista, fácil de usar e intuitiva donde recopile toda la información de los candidatos para así tomar una decisión informada.

### Problema

El abstencionismo, principalmente en jóvenes. En un mundo donde la atención es limitada, este grupo de personas no se va a tomar el tiempo de leer todos los planes de gobierno de todos los partidos, sus debates o entrevistas, lo cuál genera una gran polarización, los que saben y los que no. El principal problema es que las personas no se toman el tiempo de conocer a sus candidatos, sus propuestas ni su plan de gobierno.

### Objetivo

Sintetizar la información del plan de gobierno brindado por diferentes inteligencias artificiales (ChatGPT y Gemini) para contrastar información y brinda una única fuente de información.

### Paso a paso a realizar

Vas a analizar detalladamente las diferentes versiones del mismo plan de gobierno con la finalidad de brindar un único documento que englobe ambas versiones. Vas a leer los archivos JSON del plan de gobierno un total de 3 veces:

1. La primera vez, vas a recorrer cada JSON del plan de gobierno detenidamente y de manera individual. Utilízalo como contexto para empaparte del partido, candidato y sus propuestas en las distintas áreas.
2. Vas a ir creando un nuevo documento, igual en formato JSON donde vas a enfocarte en las propuestas. Vas a ir analizando y comparando una por una las propuestas de la misma área, así con todas las áreas. Tu objetivo es comparar la información de esta manera:

   → si tienen similitudes, crea una nueva versión tomando en cuenta el problema, la solución y ejecución de ambos planes de gobierno para crear una respuesta más completa.

   → si no está en una versión y en la otra sí, agrégala.

   Toma en cuenta que la propiedad de `ejecucion` puede ser redundante con el problema o la solución, así que si no hay un paso a paso claro de cómo se va realizar mejor omitirlo.

3. Analiza el nuevo documento con los otros dos planes de gobierno, sería una fase de checkeo para comprobar que la información en el nuevo documento concuerda con los anteriores. En caso de que hayas pasado por alto algún detalle o alguna propuesta es el momento para corregirlo.

### Descripción de las categorías

A continuación te detallo cada área temática.

1. Educación: Incluye escuelas, colegios, universidades, programas de ayuda a estudiantes, becas, asistencias, STEAM, bilingüismo, educación dual, educación especial, virtualidad.
2. Tecnología: innovación tecnológica, transformación digital, Inteligencia artificial, hardware y software, ciberseguridad.
3. Deporte y cultura: Patrimonio Arquitectónico, arqueológico, actividades musicales, teatrales, gastronómicas, cinematográficas, visuales. ICODER, becas deportivas, espacios recreativos, financiamiento para actividades, juegos nacionales, juegos universitarios.
4. Pensiones: pensiones de lujo, reformas en las pensiones, pensiones mínimas universales.
5. Agricultura: financiamiento de agricultura, agro 4.0, seguridad alimentaria, aranceles, agricultura de precisión, cultivos sensibles, competitividad del sector agrio.
6. Telecomunicaciones: ICE, apertura comercial, nuevas o eliminación de competencias.
7. Turismo: atracción de turismo nacional e internacional.
8. Economía: PYMEs, política monetaria, política fiscal, inversión extranjera directa, fuentes de empleo, producción nacional, comercio exterior, acceso a créditos, fomento a la competitividad, tipo de cambio.
9. Seguridad: tasa de homicidios, seguridad social, equipamiento para policía, aduanas, policía migratoria, control de drogas, sistema penitenciario, transparencia política, corrupción.
10. Ambiente: cambio climático, fuentes de energía renovable, biodiversidad, aguas residuales, parques nacionales, educación ambiental.
11. Vivienda: créditos a vivienda, bonos, impuestos municipales, centrilficación, precarios.
12. Infraestructura: transporte público, desarrollo vial, mejora de puentes, ferroviaria, movilidad urbana.
13. Salud: EBAIS, Caja Costarricense de Seguro Social (CCSS), salud mental, reducción de listas de espera, infraestructura hospitalaria, fármacos.

### Formato de salida

Sería un formato JSON que tenga la siguiente estructura

```json
"propuestas": {
    "educacion": [
      {
        "problema": "",
        "solucion": "",
        "ejecucion": ""
      }
    ],
    "tecnologia": [
      {
        "problema": "",
        "solucion": "",
        "ejecucion": ""
      }
    ],
    "deporte_cultura": [
      {
        "problema": "",
        "solucion": "",
        "ejecucion": ""
      }
    ],
    "pensiones": [
      {
        "problema": "",
        "solucion": "",
        "ejecucion": ""
      }
    ],
    "agricultura": [
      {
        "problema": "",
        "solucion": "",
        "ejecucion": ""
      }
    ],
    "telecomunicaciones": [
      {
        "problema": "",
        "solucion": "",
        "ejecucion": ""
      }
    ],
    "turismo": [
      {
        "problema": "",
        "solucion": "",
        "ejecucion": ""
      }
    ],
    "economia": [
      {
        "problema": "",
        "solucion": "",
        "ejecucion": ""
      }
    ],
    "seguridad": [
      {
        "problema": "",
        "solucion": "",
        "ejecucion": ""
      }
    ],
    "ambiente": [
      {
        "problema": "",
        "solucion": "",
        "ejecucion": ""
      }
    ],
    "infraestructura": [
      {
        "problema": "",
        "solucion": "",
        "ejecucion": ""
      }
    ],
    "vivienda": [
      {
        "problema": "",
        "solucion": "",
        "ejecucion": ""
      }
    ],
    "salud": [
      {
        "problema": "",
        "solucion": "",
        "ejecucion": ""
      }
    ],
  }
```

<aside>

IMPORTANTE: Puede que no haya ninguna propuesta clara para una área o categoría específica. Por ende esa categoría puede quedar sin propuestas.

</aside>

## Estructura del prompt

1. Vas a leer e interiorizar detalladamente el prompt.
2. En el siguiente mensaje te envío ambos planes de gobierno en formato JSON y tu respuesta será nuevo el archivo JSON **únicamente.**
