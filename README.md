# API JURISPRUDENCIA FORMOSA

## Índice
[[_TOC_]]
## 1. Introducción
La API (Interfaz de Programación de Aplicaciones) de Jurisprudencia permite realizar consultas al repositorio de los fallos y sumarios cargados por el Departamento de Informática Jurisprudencial del Poder Judicial de la Provincia de Formosa. Esta versión corresponde a la versión 1.0 y posibilita la lectura de las sentencias, los autos interlocutorios y sumarios, según la guía APIS SAIJ - JuFeJus Jurisprudencia - Versión 1.3.1.

## 2. Autenticación 
Para usar la API es necesario logearse y autorizarse frente al mismo. Esto se logra agre-gando a todas las solicitudes un encabezado de autorización, usando el token que se adquiere al logearse con las siguientes credenciales en formato json:
```json
{ "usuario": "f4ll05", "clave": "jur15prud3nci4" }
```
Para esta versión inicial de la API se usa credenciales estáticas, en la siguiente versión se hará un registro de usuario con otorgamiento de su token para su uso en sus solicitudes de información. La dirección del logeo es https://api-biblioteca.jusfor-mosa.gob.ar/api/v1.0/login y el método utilizado es POST. Si el login es exitoso se mues-tra la siguiente respuesta: 
```json
{ "message": "Autenticación correcta", "token": "BEARER TOKEN" }
```
Luego de adquirir el token agregue el siguiente encabezado a sus solicitudes:
Authorization: BEARER {TOKEN}

El token expira a las 24 horas después de haber sido otorgado, luego de lo cual debe requerir uno nuevo. Además, se tiene la opción de solicitud de salida de la API REST, mediante el método POST y la ruta https://api-biblioteca.jusfor-mosa.gob.ar/api/v1.0/login/salir

Al desconectarse de la API, se retorna la repuesta: 
```json
{ "message": "Has sido desconectado" }
```

## 3. Parámetros de consulta
Se presentan los siguientes parametros de busqueda en fallos y sumarios:
| Parámetro     | Tipo de dato   |           Descripción        |
|-------------- |----------------|------------------------------|
| jurisdiccion  | string         |Local en este caso.           |
| provincia     | string         |Formosa en este caso.           |
| publicacion_desde  | string         |Formato YYYY-MM-DD           |
| publicacion_hasta  | string         |Formato YYYY-MM-DD           |
| fecha_umod  | string         |Formato YYYY-MM-DD           |

## 4. Solicitud de lectura 
Las peticiones de lectura se realizan mediante el método GET, el encabezado del token bearer otorgado al logearse, pasando parámetros de búsqueda y la ruta de acceso. Las peticiones de consulta envían sus respuestas en formato JSON.

Las primeras cuatro peticiones son las solicitadas por el Proyecto de la Jufejus SAIJ:
- URL para la consulta de fallos por id: https://api-biblioteca.jusformosa.gob.ar/api/v1.0/jurisprudencia/fallos/fulldo-cument/ **+ ID**
- URL para la consulta de listados de fallos: https://api-biblioteca.jusformosa.gob.ar/api/v1.0/jurisprudencia/fallos/ **+ parámetros de búsqueda**
- URL para la consulta de sumarios por id: https://api-biblioteca.jusformosa.gob.ar/api/v1.0/jurisprudencia/sumarios/full-document/  **+ ID**
- URL para la consulta de sumarios: https://api-biblioteca.jusformosa.gob.ar/api/v1.0/jurisprudencia/sumarios/ **+ parámetros de búsqueda**
Otras lecturas disponibles:
- URL para la consulta del ente emisor o tribunal: https://api-biblioteca.jusformosa.gob.ar/api/v1.0/tribunales/ **+ parámetros de búsqueda**
- URL para la lectura de conteo de fallos y sumarios: https://api-biblioteca.jusformosa.gob.ar/api/v1.0/reporte/

Todas las peticiones pueden tener los siguientes posibles códigos HTTP de respuesta:

- 200 OK: se resolvió correctamente la petición

- 400 BAD REQUEST: petición incorrecta, por ej. falta un campo o su valor no es válido.

- 404 NOT FOUND: recurso no hallado.

- 500 INTERNAL SERVER ERROR: error del lado del servidor al intentar crear el recurso, p.ej. se ha caído la base de datos.

### 4. 1. Lectura de fallos por listado 
Devuelve el detalle del fallo (sea sentencia o auto interlocutorio) buscado, según los criterios proporcionados en los parámetros, más el token de autenticación.
Llamada básica: GET https://api-biblioteca.jusformosa.gob.ar/api/v1.0/jurisprudencia/fallos/

