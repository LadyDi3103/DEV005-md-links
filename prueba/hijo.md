[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript
construido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).
Esto nos va a permitir ejecutar JavaScript en el entorno del sistema operativo,
ya sea tu máquina o un servidor, lo cual nos abre las puertas para poder
interactuar con el sistema en sí, archivos, redes, ...

Diseñar tu propia librería es una experiencia fundamental para cualquier
desarrollador porque que te obliga a pensar en la interfaz (API) de tus
*módulos* y cómo será usado por otros developers. Debes tener especial
consideración en peculiaridades del lenguaje, convenciones y buenas prácticas.

Una alternativa al diagrama de flujo puede ser el `pseudocódigo`.

### Planificación

En este proyecto te recomendamos usar la herramienta de planificación
y organización de GitHub llamada **Github Projects**.

Mediante **issues** y **milestones** podrás organizar y planificar
tareas y objetivos concretos.

Tomando en consideración los **entregables** del proyecto, el
[9. Checklist](#9-checklist) y los **pasos** que definiste en tu
`diagrama de flujo`, crea tu planificación en GitHub Projects.

### Antes de codear

En esta ocasión estarás trabajando en **NodeJS**, asegúrate
de saber para qué sirve y sus consideraciones.

En particular, deberás decidir desde un comienzo si usarás
`ES Modules`, es decir, **import/export**, ó, por el contrario,
`CommonJS Modules`, es decir, **require/module.exports**.

Asegurate de tener clara esta decisión desde un inicio para
que no encuentres problemas más adelante.

### Lee un archivo

Como primer reto, puedes tratar de leer un solo archivo con
una ruta fija e imprimir su contenido en la consola con un `console.log`.

La librería nativa `FS` (FileSystem) te será de utilidad.

**Recuerda**: Te sugerimos **no utilizar** la versión síncrona
de la función para leer archivos, `readFileSync`, y en cambio
intentar resolver ese desafío de manera asíncrona.

### Averigua la extensión de un archivo

Ya sabiendo leer un archivo, aventúrate a conocer cual
es su extensión.

Recuerda, las extensiones son esas letras al final del
nombre de un archivo, por ejemplo: .js, .txt, .doc, etc

Aquí también podrá ser útil `FS`.

### Obtén el contenido de un directorio

Este proyecto consiste en buscar archivos, pero para eso,
primero debes poder verlos.

Intenta imprimir en consola la lista de archivos en una carpeta.

La librería `FS` también te será útil aquí.

**Recuerda**: Para disminuir la complejidad de tu algoritmo
recursivo, te recomendamos utilizar la versión síncrona de
la función para leer directorios, `readdirSync`.

### Une dos rutas

Para poder acceder a carpetas y archivos será necesario que
indiques en qué lugar de tu computadora se encuentran, a esto
le llamamos **rutas**.

Usa la librería nativa `path` para unir dos segmentos de ruta,
por ejemplo, si queremos unir:

1. /home/Laboratoria/
2. ./test

El resultado sería: /home/Laboratoria/test

### Recursividad

Este proyecto se ha de resolver de forma casi natural con
**recursividad**.

¿Por qué?.

Porque no conocemos realmente cuantas carpetas y archivos
tendremos que recorrer antes de terminar.

Si recibes una ruta de carpeta, no sabrás de ante mano si
dentro hay más carpetas o muchos archivos.

Por ello, asegurate bien de entender de qué trata la
recursividad y ver algunos ejemplos.

Entre los recursos de este proyecto hay un video que te ayudará.

### Crea una promesa

El valor de retorno de nuestra librería es una `Promesa`,
no un `Array`.

Prueba leyendo sobre las promesas y creando una por tu
cuenta utilizando **new Promise()**

Es importante que sepas qué es un **callback** pues las
promesas los utilizarán.
