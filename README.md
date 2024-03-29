# API JURISPRUDENCIA FORMOSA

## Índice
1. [Introducción](#introduccion)
2. [Autenticación](#autenticacion)
3. [Parámetros de consulta](#parametros-consulta)
4. [Solicitud de lectura ](#solicitud-lectura)
4. 1. [Lectura de fallos por id ](#lectura-fallos-id)
4. 2. [Lectura de fallos por listado ](#lectura-fallos-listado)
4. 3. [Lectura de sumarios por id ](#lectura-sumarios-id)
4. 4. [Lectura de sumarios por listado ](#lectura-sumarios-listado)
4. 5. [Lectura de tribunales ](#lectura-tribunales)
4. 6. [Estadisticas ](#estadistica)
## 1. Introducción
La API (Interfaz de Programación de Aplicaciones) de Jurisprudencia permite realizar consultas al repositorio de los fallos y sumarios cargados por el Departamento de Informática Jurisprudencial del Poder Judicial de la Provincia de Formosa. Esta versión corresponde a la versión 1.0 y posibilita la lectura de las sentencias, los autos interlocutorios y sumarios, según la guía APIS SAIJ - JuFeJus Jurisprudencia - Versión 1.3.1.
Toda la info aquí descripta esta en la guia de la API de la Jurisprudencia de Formosa V1.0 [Link a la documentación](GUIA%20API%20REST%20JURISPRUDENCIA%20Version%201.0%20-%20Actualizado.pdf) 

## 2. Autenticación 
Para usar la API es necesario logearse y autorizarse frente al mismo. Esto se logra agre-gando a todas las solicitudes un encabezado de autorización, usando el token que se adquiere al logearse con las siguientes credenciales en formato json:
```json
{ "usuario": "f4ll05", "clave": "jur15prud3nci4" }
```
Para esta versión inicial de la API se usa credenciales estáticas, en la siguiente versión se hará un registro de usuario con otorgamiento de su token para su uso en sus solicitudes de información. La dirección del logeo es https://api-biblioteca.jusformosa.gob.ar/api/v1.0/login y el método utilizado es POST. Si el login es exitoso se mues-tra la siguiente respuesta: 
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

### 4. 1. Lectura de fallos por id 
Devuelve el detalle del fallo (sea sentencia o auto interlocutorio) buscado, según los criterios proporcionados en los parámetros, más el token de autenticación.
Llamada básica: GET https://api-biblioteca.jusformosa.gob.ar/api/v1.0/jurisprudencia/fallos/fulldocument/ + ID
**Ejemplo**
```html
GET https://api-biblioteca.jusformosa.gob.ar/api/v1.0/jurisprudencia/fallos/fulldocument?id=17609
```


**Respuesta**
```json
{
    "document": {
        "metadata": {
            "uuid": "17609",
            "document-type": "jurisprudencia"
        },
        "content": {
            "tipo_documento": "JURISPRUDENCIA",
            "subtipo_documento": "FALLO",
            "tipo_fallo": "SENTENCIA",
            "id_fallo": "17609",
            "id_interno": "20808",
            "tribunal": "EXCMA. CAMARA CIVIL Y COMERCIAL",
            "tipo_tribunal": null,
            "instancia": null,
            "fecha": "2023-03-27",
            "jurisdiccion": {
                "tipo": "LOCAL",
                "pais": "Argentina",
                "provincia": "FORMOSA",
                "localidad": "FORMOSA",
                "id_pais": 11
            },
            "caratula": {
                "actor": null,
                "demandado": null,
                "sobre": "SIAN, ABEL C/ STEFANI, ALBERTO S/ JUICIO DE DESALOJO"
            },
            "hechos": null,
            "fuente": null,
            "urlApi": null,
            "descriptores": null,
            "texto_fallo": "En la ciudad de Formosa, capital de la Provincia del mismo nombre, a los veintisiete\r\nd&iacute;as del mes de marzo del a&ntilde;o dos mil veintitr&eacute;s, se re&uacute;nen en Acuerdo Ordinario los\r\nSe&ntilde;ores Jueces que integran la \"Sala I -A&ntilde;o 2022-\" de la Excma. C&aacute;mara de Apelaciones\r\nen lo Civil y Comercial, Dra. TELMA C. BENTANCUR y DR. HORACIO\r\nROBERTO ROGLAN, bajo la Presidencia Subrogante de la Dra. JUDITH E. SOSA DE\r\nLOZINA, para pronunciar sentencia definitiva en la causa: \"SIAN, ABEL C/ STEFANI,\r\nALBERTO S/ JUICIO DE DESALOJO -Expte. N&ordm; 12.610/22 del registro de C&aacute;mara-,\r\nvenida del Juzgado de Primera Instancia en lo Civil, Comercial, del Trabajo y de Menores\r\nN&ordm; 7 de la Primera Circunscripci&oacute;n Judicial de la Provincia de Formosa con asiento en la\r\nlocalidad de El Colorado (Expte. N&ordm; 344 - A&ntilde;o: 17), en virtud del recurso de apelaci&oacute;n\r\ninterpuesto a p&aacute;gina 245 por la parte demandada contra la Sentencia N&ordm; 96/2.021 obrante\r\nen p&aacute;ginas 234/242 vta., que fuera concedido libremente a p&aacute;g. 246.\r\nEl orden de votaci&oacute;n es el siguiente: Dra. TELMA C. BENTANCUR y Dr.\r\nHORACIO ROBERTO ROGLAN.\r\nI.- RELACI&Oacute;N DE LA CAUSA:\r\nLa Dra. BENTANCUR dijo:\r\nLa presente causa es iniciada por el Sr. Abel Sian, quien bajo patrocinio letrado,\r\ninterpone formal demanda de desalojo por vencimiento de contrato de comodato, contra el\r\nSr. Alberto Stefani y/o quien detente y/o contra cualquier otro ocupante y/o tenedor\r\nprecario de la chacra identificada como SECC. \"J\" -CHACRA 52, FRACC. 18 de la\r\nlocalidad de Piran&eacute;, sustentando su legitimaci&oacute;n en la posesi&oacute;n del inmueble que detenta\r\ncon adjudicaci&oacute;n de su difunto padre, Lucio Sian. Asimismo, reclama indemnizaci&oacute;n por\r\nda&ntilde;os y perjuicios en la suma de $ 100.000.\r\nSustanciada la demanda, es contestada por el accionado, quien opone excepciones\r\nfalta de legitimaci&oacute;n activa y pasiva. Subsidiariamente responde la demanda, controvierte\r\nlos hechos, solicita se desestime la pretensi&oacute;n, con costas.\r\nLos dem&aacute;s hechos y derechos invocados por las partes, as&iacute; como las otras\r\nalternativas de la causa acaecidas en la inferior instancia hasta llegar a la sentencia, se\r\nencuentran relatados en los \"Resultandos\" de la misma, a los que cabe remitirse por\r\nrazones de brevedad y por reputarse lo all&iacute; expuesto suficiente a los fines de la resoluci&oacute;n\r\ndel recurso en an&aacute;lisis.\r\nEn consecuencia, se har&aacute; referencia al fallo apelado y a lo actuado con\r\nposterioridad a dicho pronunciamiento.\r\nLa Sentencia N&ordm; 96/2.021, de p&aacute;gs. 234/242 vta. dispone: \"SENTENCIO: 1.-\r\nRECHAZAR las EXCEPCIONES DE FALTA DE LEGITIMACI&Oacute;N ACTIVA Y\r\nPASIVA opuestas por el Demandado; en atenci&oacute;n a los fundamentos dados en los\r\nconsiderandos que anteceden. 2.- HACER LUGAR A LA DEMANDA DE DESALOJO\r\npromovida por el Sr. ABEL SIAN (p&aacute;g. 11/14), condenando al demandado Sr. ALBERTO\r\nSTEFANI y/o todo otro ocupante del inmueble identificado como: DEPARTAMENTO 03\r\nCIRCUNSCRIPCION I, SECCION \"J\" FRACCION 18- EX- CHACRA 52, a desalojarlo\r\nen el termino de CINCO (05) D&Iacute;AS de la notificaci&oacute;n de la sentencia (Art. 678 Noveno\r\ninc. 2&ordm; del C.P.C.C.), y hacer entrega al Sr. Abel SIAN heredero del Sr. Lucio SIAN, libre\r\nde toda persona f&iacute;sica o jur&iacute;dica, objetos y/o enseres personales, como animales de su\r\ntitularidad, bajo apercibimiento de desahucio sin m&aacute;s tr&aacute;mite, con el auxilio de la fuerza\r\np&uacute;blica y uso de cerrajero en caso de ser necesario, todo ello por los fundamentos\r\nexpuestos en los considerandos que preceden.- 3.- RECHAZAR el reclamo de da&ntilde;os y\r\nperjuicios realizado por el Actor en atenci&oacute;n a los fundamentos dados en los considerandos\r\nque anteceden. 4.- Con COSTAS a ser soportadas por la parte demandada vencida (Art. 68\r\ndel C.P.C.C.).- 5.- DIFERIR la Regulaci&oacute;n de Honorarios de los letrados intervinientes en\r\nla causa, hasta tanto se cuente con base cierta para ello. (Art 27, 56 y 58 Ley 512 y 564).-\r\n6.- REGISTRESE, NOT&Iacute;FIQUESE, a las partes personalmente o por c&eacute;dula (Art. 135\r\ninc. 13 del C.P.C.C.), Insertese copia en el Libro de Sentencias. Oportunamente\r\nARCH&Iacute;VESE.-\"\r\nNotificado el fallo en cuesti&oacute;n, a p&aacute;g. 245 la parte demandada interpuso recurso de\r\napelaci&oacute;n, si&eacute;ndole concedido el mismo libremente a p&aacute;g. 246.\r\nElevados los autos a la Alzada, son puestos en Secretar&iacute;a para que la parte apelante\r\nexprese agravios dentro del t&eacute;rmino de diez (10) d&iacute;as; obrando a p&aacute;gs. 257/266 el escrito\r\nde expresi&oacute;n de agravios, el que fuera sustanciado a p&aacute;g. 267, es contestado por el actor en\r\np&aacute;gs. 268/269 por lo que a p&aacute;g. 270 se pasan AUTOS PARA SENTENCIA,\r\nestableci&eacute;ndose el orden de votaci&oacute;n e integraci&oacute;n de la Sala I -A&ntilde;o 2022-, con sus\r\nmiembros titulares, conforme nota de p&aacute;g. 271.\r\nEl Dr. Roglan dijo: Adhiero a la relaci&oacute;n de la causa que antecede.\r\nII.- CUESTIONES A RESOLVER:\r\nLa Dra. Bentancur dijo: Propongo como cuestiones a resolver las siguientes: &iquest;Es\r\nprocedente en su aspecto formal el recurso interpuesto? &iquest;Es ajustada a derecho la sentencia\r\nrecurrida? En su caso, &iquest;Qu&eacute; pronunciamiento corresponde?\r\nEl Dr. Roglan dijo: Adhiero a dichas proposiciones.\r\nIII.- A LAS CUESTIONES PLANTEADAS:\r\nLa Dra. Bentancur continu&oacute; diciendo:\r\n1) Ante la primera cuesti&oacute;n planteada, cabe mencionar que si bien el memorial que\r\nfundamenta el recurso no resulta ser una acabada y clara cr&iacute;tica al decisorio reca&iacute;do y,\r\naunque el mismo diste de exhibir una adecuada suficiencia t&eacute;cnica, no obstante ello, y en\r\nvirtud del \"criterio amplio\" que ha sostenido este Tribunal en la interpretaci&oacute;n del art. 263\r\ndel c&oacute;digo de rito, puede estimarse que las quejas han explicitado los postulados m&iacute;nimos\r\npara su consideraci&oacute;n en la Alzada, en miras a asegurar m&aacute;s adecuadamente el derecho de\r\ndefensa en juicio (Fallo N&deg; 2699/92 de este Tribunal, causa \"Gonz&aacute;lez, Rodolfo\") por lo\r\nque me pronuncio por la procedencia formal del recurso de apelaci&oacute;n, analiz&aacute;ndose\r\nseguidamente las quejas propuestas por el recurrente.\r\nEl demandado apelante puntualiza como primer agravio, la no admisi&oacute;n y adecuada\r\nconsideraci&oacute;n de la excepci&oacute;n de falta de legitimaci&oacute;n activa, afirmado que el juez de\r\ngrado juzg&oacute; innecesario la existencia de una declaratoria de herederos previa a la\r\ninterposici&oacute;n de la demanda de desalojo, as&iacute; como no ser necesaria la autorizaci&oacute;n e\r\nintervenci&oacute;n del verdadero propietario del inmueble, el Estado Municipal, agravi&aacute;ndose\r\npor tal motivo, al ser palmaria la falta de legitimaci&oacute;n activa por no ser el actor la persona\r\nhabilitada para asumir tal calidad en el presente proceso. Agrega que tal falta de\r\nlegitimaci&oacute;n del Sr. Abel Sian, surge clara por no ser el mismo poseedor ni titular de\r\nderecho alguno del inmueble cuya descripci&oacute;n catastral realiza, la cual, seg&uacute;n pruebas\r\nproducidas en autos, fue adjudicada a quien ser&iacute;a su padre, Lucio Sian, por lo que el actor\r\nno posee ning&uacute;n derecho, teniendo en cuenta que se trata de un inmueble fiscal, y\r\ndebiendo, a su entender, haber adjuntado al interponer la demanda la respectiva\r\ndeclaratoria de herederos. Seguidamente, refiere que conforme la legislaci&oacute;n municipal, un\r\nterreno fiscal no puede ser materia de ning&uacute;n contrato de arrendamiento, comodato ni\r\ncesi&oacute;n de ning&uacute;n tipo entre particulares, sin la previa autorizaci&oacute;n de la municipalidad de\r\nPiran&eacute;, citando ordenanza N&ordm; 14/84, afirmando que el contrato realizado sin la\r\nconformidad del Estado es nulo de nulidad absoluta, provocando esa actitud la caducidad\r\nde los derechos que se hubieran otorgado. Reitera argumentos en relaci&oacute;n a la calidad de\r\nheredero invocada por el actor y la necesidad de acreditar la vocaci&oacute;n hereditaria, y de\r\nlegitimado activo para demandar por desalojo quien tenga una relaci&oacute;n sobre los bienes\r\nque lo autorice a disfrutarlos en calidad de propietario, poseedor, locador, usufructuario,\r\nusuario o de cualquier otro an&aacute;logo, siendo el desalojo un verdadero acto de\r\nadministraci&oacute;n de quien tiene alg&uacute;n derecho personal para que la cosa le sea restituida, no\r\nhabiendo el actor arrimado constancia alguna respecto de su corroboraci&oacute;n.\r\nA continuaci&oacute;n, como segundo agravio, refiere a la no admisi&oacute;n de la excepci&oacute;n de\r\nfalta de legitimaci&oacute;n pasiva. Al respecto sostiene que conforme se fundamentara y probara,\r\nsu parte carece de legitimaci&oacute;n no siendo el proceso de desalojo la via procedente, al ser\r\nposeedor del inmueble, precisando las pruebas del expediente que demuestran que es\r\nocupante, y que las mejoras enclavadas y plantadas en el predio son de su propiedad,\r\ncuestiones que dice no fueron tenidas en cuenta por el juez de grado. En tal sentido\r\nCde. Expte. N&ordm; 12.610/22.-\r\n-2-\r\nargumenta sobre las pruebas testimoniales producidas en autos que, a su entender, no\r\nfueron valorados adecuadamente por el juez, destacando que tanto su parte, como su\r\nfamilia, son poseedores animus domini del inmueble objeto del proceso, refiriendo tambi&eacute;n\r\na las certificaciones adjuntadas de la Municipalidad de Piran&eacute;, que le reconoce tal car&aacute;cter,\r\nconcluyendo no ser un mero comodatario o un \"casero\", haciendo notar la contradicci&oacute;n\r\ndel actor seg&uacute;n constancias del expediente que describe. Cita abundante doctrina y\r\njurisprudencia.\r\n2) Que, previo a introducirnos en el tratamiento de las objeciones formuladas en la\r\napelaci&oacute;n, corresponde precisar que: \"Los jueces no est&aacute;n obligados a tratar todas las\r\nargumentaciones propuestas por las partes, sino que basta que hagan m&eacute;rito de aqu&eacute;llas\r\nque consideren m&aacute;s adecuadas para sustentar sus conclusiones\" (CSN Noviembre 8\r\n-1981, \"Dos Arroyos SCA c/ Ferrari de Noailles\", en Actualizaci&oacute;n de Jurisp., N&ordm; 1.440, La\r\nLey, 1981-D, p&aacute;g. 781; CALZ, Sala I, Reg. Sent. Def. 32/90 m 172/00, entre muchas otras\r\n-Microjuris On line. MJ-JU-M-255576-AR/MJJ25576) (Fallo N&ordm; 16.090/12, reg. de esta\r\nC&aacute;mara).\r\nQue expuestos los agravios, los mismos se centran en las excepciones de falta de\r\nlegitimaci&oacute;n activa y pasiva que, opuestas por el demandado, fueron rechazadas en la baja\r\ninstancia. Al respecto esta Alzada sostuvo que \"la legitimaci&oacute;n para obrar, es la cualidad\r\nemanada de la ley para requerir una sentencia favorable respecto del objeto litigioso, que\r\nen la mayor&iacute;a de los casos coincide con la titularidad de la relaci&oacute;n jur&iacute;dica sustancial. En\r\ngeneral se entiende que hay falta de legitimaci&oacute;n para obrar cuando el actor o el\r\ndemandado no son las personas especialmente habilitadas por la ley para asumir tales\r\ncalidades, con referencia a la materia concreta sobre la que versa el proceso. La\r\nlegitimaci&oacute;n, como uno de los requisitos para el ejercicio de la acci&oacute;n, es activa cuando\r\nexiste identidad entre la persona a quien la ley le concede el derecho de acci&oacute;n y la que\r\nasume en el proceso el car&aacute;cter de actor. Tambi&eacute;n se ha dicho que la legitimaci&oacute;n activa\r\nsupone la actitud para estar en juicio como parte actora, con el prop&oacute;sito de obtener una\r\nsentencia sobre el fondo o m&eacute;rito del asunto, que puede serle favorable o desfavorable. La\r\nlegitimaci&oacute;n sustancial -para obrar o legitimatio ad causam- es una de las condiciones de\r\nadmisibilidad de la acci&oacute;n, es tambi&eacute;n presupuesto de una sentencia &uacute;til\" (Fallo N&ordm;\r\n18.815/18, Sala I -A&ntilde;o 2018 -integraci&oacute;n Dras. Bentancur y Boonman).\r\nRespecto a la legitimaci&oacute;n activa en el proceso de desalojo, cabe traer a colaci&oacute;n el\r\ncriterio fijado por esta Alzada en diversos Fallos, donde se dej&oacute; sentado que el presupuesto\r\nque confiere viabilidad al mismo, es que el actor acredite el derecho al inmueble cuyo\r\ndesahucio se persigue y que como contrapartida, el demandado se encuentre comprendido\r\nen cualquiera de los supuestos previstos por el art. 677, 2&ordm; parte del C&oacute;digo Procesal, esto\r\nes, locatario, sublocatario, precarista, intruso o cualquier otro ocupante, cuya obligaci&oacute;n de\r\nrestituir o entregar sea exigible. Est&aacute;n legitimados activamente para promover el proceso\r\nde desalojo todos aquellos titulares de una acci&oacute;n personal que pretendan excluir a otros de\r\nla detentaci&oacute;n del inmueble. La acci&oacute;n de desalojo no se confiere s&oacute;lo al propietariolocador,\r\nsino todo aquel que invoca un t&iacute;tulo del cual derive un derecho a usar y gozar del\r\ninmueble (due&ntilde;o, poseedor, sublocador, usufructuario, locatario, etc.) contra todo aquel\r\nque est&eacute; en su tenencia \"actual\", ya sea sin derecho originario y regularmente conferido,\r\npor abuso de confianza, enga&ntilde;o, clandestinidad o violencia, intrusi&oacute;n propiamente dicha, o\r\nen virtud de un t&iacute;tulo que por su precariedad, engendre la obligaci&oacute;n de restituir (rescisi&oacute;n\r\ndel comodato, del arrendamiento, del contrato de trabajo) (Fallo N&ordm; 16.498/13 de esta\r\nAlzada). As&iacute; \"El criterio jurisprudencial es que en el juicio de desalojo existir&aacute;\r\nlegitimaci&oacute;n activa a favor de quien tenga la titularidad de un derecho sobre los bienes y\r\nque la autorice a disfrutarlos en concepto de propietario, poseedor, locador, usufructuario,\r\nusuario o de cualquier an&aacute;logo. Respecto de la legitimaci&oacute;n activa la doctrina alude a los\r\nsiguientes supuestos: propietario, locador, locatario principal, usufructuario, usuario,\r\nposeedor, comodante y administrador de la sucesi&oacute;n, pero aclara que la enumeraci&oacute;n\r\nprecedente es meramente enunciativa y puede decirse, a modo de conclusi&oacute;n, que en\r\ngeneral pueden promover proceso de desalojo todos aquellos que tengan un derecho a\r\nrecuperar total o parcialmente la detentaci&oacute;n de un bien inmueble\" (conf. Fallo N&ordm;\r\n16.583/13 de esta Alzada).\r\nDicho ello, y entrando a analizar la primera cuesti&oacute;n planteada por el apelante, esto\r\nes, la cuestionada calidad de adjudicatario o poseedor del actor con fundamento en la falta\r\nde acreditaci&oacute;n de la declaratoria de herederos, teniendo en cuenta que quien ostentaba la\r\ncalidad de adjudicatario del inmueble cuyo desalojo pretende, era su padre fallecido, el Sr.\r\nLucio Sian, tornando palmaria, a entender del apelante, su falta de legitimaci&oacute;n activa.\r\nAdelanto que los agravios esbozados en tales t&eacute;rminos deben ser desestimados por\r\ncuanto, como concluye correctamente el juez de grado, no resulta necesario acompa&ntilde;ar la\r\ndeclaratoria de herederos para acreditar el v&iacute;nculo con quien resulta adjudicatario del\r\ninmueble cuando, como en el caso de autos, se tratan de herederos forzosos.\r\nEn efecto, en primer t&eacute;rmino, cabe dejar sentado el criterio de esta Alzada,\r\nconforme los parametros se&ntilde;alados precedentemente, que el adjudicatario de un inmueble\r\nfiscal ostenta legitimaci&oacute;n activa para iniciar una demanda de desahucio, por cuanto ello\r\n-el acto de adjudicaci&oacute;n efectuado por el Ente estatal- lo convierte en poseedor de la cosa\r\ncon derecho a exigir su restituci&oacute;n (conforme arts. 2351 y cttes del C&oacute;digo Civil). El\r\n‘adjudicatario’ de una vivienda considerado como ‘poseedor’ est&aacute; legitimado para\r\npretender el desalojo de la misma\" (conf. Fallo N&ordm; 16.498/13). En igual sentido,\r\nCde. Expte. N&ordm; 12.610/22.-\r\n-3-\r\nposteriormente, mediante Fallos Nros.: 19.363/19 (Sala II -A&ntilde;o 2019- con integraci&oacute;n de\r\nlos Dres. Garc&iacute;a Nardi y Roglan) y 19.705/20 (Sala II -A&ntilde;o 2020- Dras. Sosa de Lozina y\r\nGarc&iacute;a Nardi), tambi&eacute;n sostuvo la legitimaci&oacute;n activa del adjudicatario para promover el\r\nproceso de desalojo por id&eacute;nticos fundamentos. Y, en relaci&oacute;n a los herederos del\r\nadjudicatario, se dej&oacute; sentado que \"no quedan dudas del derecho que tienen los actores, en\r\nsu calidad de herederos del adjudicatario, de iniciar todas las acciones que hacen al\r\nrecupero del bien inmueble del cual resultara adjudicatario el causante\" Fallo N&ordm;\r\n18.254/17 (Sala I-A&ntilde;o 2016 con integracion de las Dras. Boonman, Garc&iacute;a Nardi y\r\nBentancur), por lo que ante tal situaci&oacute;n, no se requiere, como pareciera pretender el\r\napelante cuando expresa necesaria \"...la autorizaci&oacute;n e intervenci&oacute;n del verdadero\r\npropietario de dicho inmueble, vale decir el Estado Municipal\" (ver pag. 257 vta.), al solo\r\nefecto de promover el desalojo.\r\nQue respecto a la mentada autorizaci&oacute;n del &oacute;rgano administrativo, debe dejarse\r\naclarado, como sostuvo este Tribunal, que la misma es requerida, a efectos de la\r\nlegitimaci&oacute;n activa, en los supuestos en que el adjudicatario efect&uacute;a cesi&oacute;n de los derechos\r\nsobre el inmueble fiscal que le fuera concedido, y es el cesionario quien promueve el\r\ndesalojo, teniendo en cuenta que la legislaci&oacute;n sobre la materia -que es de orden p&uacute;blicoproh&iacute;be\r\ntransferir las concesiones realizadas sin autorizaci&oacute;n\" (conf. Fallos Nros.\r\n18.795/18 y 18.815/18, Sala I -A&ntilde;o 2018- con integraci&oacute;n de las Dras. Bentancur y\r\nBoonman).\r\nY la condici&oacute;n de adjudicatario del Sr. Lucio Sian -padre del aqu&iacute; accionante- sobre\r\nel inmueble objeto de la litis -la Chacra N&ordm; 52-, surge acreditada seg&uacute;n el expediente\r\nadministrativo N&ordm; 44.183/54 ofrecido como prueba por ambas partes y que obra agregado\r\nen p&aacute;gs. 87/182 -Expte. N&ordm; 1355/82 al continuar el tr&aacute;mite en Tierras Fiscales de la\r\nMunicipalidad de Piran&eacute;-, donde consta el contrato de adjudicaci&oacute;n en venta N&ordm; 43.603\r\nsuscripto el 04/12/1957, conforme decreto-ley N&ordm; 14.577/56, por el Director General de\r\nTierras del Gobierno Nacional, Dr. Jos&eacute; Antonio Ruiz Moreno, y en fecha 17/05/1962 por\r\nel Sr. Lucio Sian y el jefe despachante de la Direcci&oacute;n Gral. de Colonizaci&oacute;n y Tierras\r\nFiscales, Sr. Obdulio Olmedo (conf. p&aacute;g. 107 y vta.).\r\nSentado lo expuesto, y en relaci&oacute;n a la necesidad de la declaratoria de herederos, y\r\nsi bien el A-quo cita como fundamento normativo el C&oacute;digo Civil y Comercial de la\r\nNaci&oacute;n -arts. 2277, 2280 y 2337-, teniendo en cuenta la fecha de defunci&oacute;n del padre del\r\nactor el 12/05/1986 (conforme certificados que obran en paginas 06 y 122), es de\r\naplicaci&oacute;n el C&oacute;digo Civil anterior -Ley N&ordm; 340- que en la especie, resulta ser lo estatuido\r\npor los arts. 2475, 3282, 3410 y 3418, cuya soluci&oacute;n normativa es de todos modos similar\r\na la consagrada en la legislaci&oacute;n citada en la sentencia apelada.\r\nEn tal sentido, el art. 3410 dispone que: \"Cuando la sucesi&oacute;n tiene lugar entre\r\nascendientes, descendientes y c&oacute;nyuge, el heredero entra en posesi&oacute;n de la herencia desde\r\nel d&iacute;a de la muerte del autor de la sucesi&oacute;n, sin ninguna formalidad o intervenci&oacute;n de los\r\njueces, aunque ignorase la apertura de la sucesi&oacute;n y su llamamiento a la herencia\". Este\r\nes el supuesto en que la posesi&oacute;n hereditaria o la investidura de la calidad de heredero es\r\nadquirida por disposici&oacute;n de la ley, de pleno derecho, siendo el otro modo de adquisici&oacute;n,\r\npor resoluci&oacute;n judicial. Esta distinci&oacute;n se funda hist&oacute;ricamente en que la notoriedad o\r\npublicidad del parentesco, cuando es muy pr&oacute;xima al causante, hace innecesaria la\r\nintervenci&oacute;n del juez. Los ascendientes, descendientes y c&oacute;nyuge entren en posesi&oacute;n de la\r\nherencia el mismo d&iacute;a de la muerte del causante, por disposici&oacute;n de la ley. No necesitan la\r\nintervenci&oacute;n judicial para oponer eficazmente frente a terceros su condici&oacute;n de herederos y\r\npara ejercer los derechos y acciones judiciales que les corresponden como tales. Les basta\r\nacreditar su v&iacute;nculo familiar con el causante. Como contrapartida, los restantes herederos,\r\ncolaterales y extra&ntilde;os instituidos herederos por testamento, deben iniciar el tr&aacute;mite judicial\r\npertinente y pedirla al juez, justificando su t&iacute;tulo a la sucesi&oacute;n, quien la otorga mediante el\r\ndictado de la declaratoria de herederos o del auto aprobatorio de testamento. Es decir, que\r\nrespecto a las acciones judiciales que les competen a los herederos forzosos como tales, no\r\nresulta indispensable la declaratoria de herederos para promoverlas, bastando acreditar su\r\nv&iacute;nculo con el causante. (conf. Compagnucci de Caso, Ferrer, Kemelmajer de Carlucci,\r\nKiper, Lorenzetti, entre otros, Codigo Civil de la Rep&uacute;blica Argentina Explicado, Rubinzal\r\n-Culzoni Ed. t. vii, pags. 857/859)\r\nLa jurisprudencia tambi&eacute;n sostuvo que \"Acreditado el grado de parentesco\r\ninvocado en la causa tramitada por ante el fuero civil, corresponde rechazar la defensa de\r\nfalta de legitimaci&oacute;n activa opuesta...con fundamento en la omisi&oacute;n de aquel de presentar\r\nla declaratoria de herederos...\" (C&aacute;mara Nacional de Apelaciones en lo Comercial, sala A,\r\n31/05/2013, Transporte Metropolitano General San Mart&iacute;n s/ conc. preventivo s/ incidente\r\nde verificaci&oacute;n; Cita: TR LALEY AR/JUR/26069/2013).\r\nConsecuentemente, en base a los lineamientos fijados, la calidad de adjudicatario\r\nque ostentaba el Sr. Lucio Sian, justifica la legitimaci&oacute;n del actor para iniciar la presente\r\ndemanda, al estar acreditado suficientemente su v&iacute;nculo como descendiente del fallecido\r\nadjudicatario del inmueble, seg&uacute;n partidas de defunci&oacute;n y nacimiento adjuntadas en\r\np&aacute;ginas 06 y 09.\r\n3) Seguidamente, cabe ahora adentrarme a analizar las restantes cuestiones\r\nintroducidas en la apelaci&oacute;n, las cuales por razones metodol&oacute;gicas ser&aacute;n examinadas\r\nconjuntamente, cuales son la nulidad del contrato de comodato celebrado entre las partes,\r\ncuya copia corre adjuntada en la p&aacute;gina 04, y la defensa posesoria invocada por &eacute;ste al\r\nCde. Expte. N&ordm; 12.610/22.-\r\n-4-\r\noponer la excepci&oacute;n de falta de legitimaci&oacute;n pasiva que fuera tambi&eacute;n rechazada en la baja\r\ninstancia.\r\nQue en relaci&oacute;n al primero de los planteos, el fundamento de la nulidad del\r\ncomodato es que al ser su objeto un inmueble fiscal, el adjudicatario no estaba habilitado a\r\ncelebrarlo sin la previa autorizaci&oacute;n de la Municipalidad, cit&aacute;ndose la ordenanza N&ordm; 14/84\r\ny el contrato de adjudicaci&oacute;n en venta.\r\nQue a efectos de resolver tal cuesti&oacute;n, resulta trascendente el criterio reiterado\r\nestablecido por esta Alzada en supuestos similares al de autos, se concluy&oacute; que al tratarse\r\nel bien cuyo recupero se pretende de una tierra fiscal, se dijo que desde el punto de vista de\r\nsu naturaleza jur&iacute;dica, que son bienes privados del Estado, conforme surge del inciso 1&ordm; del\r\nart. 2342 del C.C., no se rigen por las normas generales del C&oacute;digo Civil aplicables a\r\nlos bienes p&uacute;blicos -siendo distinto el r&eacute;gimen de su uso e indisponibilidad- sino que las\r\nreglas en la materia est&aacute;n dadas por las leyes espec&iacute;ficas, que prev&eacute;n las diferentes\r\ncategor&iacute;as de t&iacute;tulos que pueden otorgarse sobre ellas as&iacute; como las normas de\r\nprocedimientos para las transferencias de mejoras y derechos y su revocaci&oacute;n -conf. Fallo\r\nN&ordm; 7319/2002- (conf. Fallo 18.815/18) -el resalado me pertenece- .\r\nEs as&iacute; que tomando como pauta decisoria la legislaci&oacute;n que rige en la materia, que\r\nen el supuesto aqu&iacute; examinado no es la citada ordenanza municipal N&ordm; 14/84 que fuera\r\nsancionada el 11/01/1984 por el Honorable Consejo Deliberante de la Ciudad de Piran&eacute;,\r\nsino el Decreto Ley N&ordm; 14.577/56, sobre cuyas prescripciones qued&oacute; sujeto el contrato de\r\nadjudicaci&oacute;n en venta del inmueble suscripto a favor del Sr. Lucio Sian que obra en la\r\npagina 107 y vta., siendo por otra parte en base a tal instrumento y normativa en que\r\ndictamin&oacute; como lo hizo, el Director de Tierras Fiscales en el expediente administrativo\r\nagregado a estos autos, seg&uacute;n consta en la p&aacute;gina 158.\r\nEllo as&iacute;, por cuanto no solo le es transmitido al sucesor la adjudicaci&oacute;n misma,\r\ncomo se concluyera mas arriba al analizar la legitimaci&oacute;n activa del actor, sino tambi&eacute;n las\r\nobligaciones a los que el causante estaba constre&ntilde;ido (conf. Art. 3431del C.Civil). \"Como\r\nconsecuencia de que el heredero se subroga en la posici&oacute;n juridico-patrimonial del autor\r\nde la sucesi&oacute;n, viene a sucederlo tambi&eacute;n en la titularidad pasiva de las obligaciones, y en\r\nla condici&oacute;n de deudor de las mismas debe cumplirlas...\", aclar&aacute;ndose seguidamente que\r\nel precepto comentado -el art. 3431- \"...alude a las obligaciones transmisibles de car&aacute;cter\r\npatrimonial -como es el supuesto acontecido en autos-, quedando excluidas las\r\nobligaciones personal&iacute;simas del causante que como regla se extinguen con la muerte de su\r\ntitular (art. 498 y cncs.)\" (conf. Compagnucci de Caso, Ferrer, Kemelmajer de Carlucci,\r\nKiper, Lorenzetti, entre otros, t. vii, p. 892 de la obra citada).\r\nY tal impedimento contractual del adjudicatario alegado por el demandado, surge\r\nde las condiciones estipuladas en el contrato de adjudicaci&oacute;n en venta N&ordm; 43.603 celebrado\r\npor disposici&oacute;n del 15/10/1957, en el art. 5&ordm; punto b), del que se puede apreciar la\r\nprohibici&oacute;n de \"arrendar el predio o trasferir su explotaci&oacute;n, bajo cualquier concepto\",\r\ncit&aacute;ndose el art. 12 del citado decreto ley (seg&uacute;n constancia de pagina 107 vta.).\r\nSentado ello, entonces, el contrato de comodato celebrado entre las partes del\r\npresente proceso, y que sirviera de base para el presente litigio, carece de validez a tal fin.\r\nAl respecto se tiene dicho que \"Carece de legitimaci&oacute;n sustancial para iniciar una acci&oacute;n\r\nde desalojo quien la esgrime sustentando su derecho de exigir la restituci&oacute;n en un contrato\r\nde comodato, si el mismo importa la comisi&oacute;n de un acto contrario a derecho -en el caso,\r\nal actor le estaba prohibida la venta o cesi&oacute;n total o parcial de la vivienda que le fue\r\nadjudicada por el Instituto Provincial de la Vivienda- toda vez que, lo contrario\r\nimportar&iacute;a consolidar un acto il&iacute;cito\" (C&aacute;m. Apel. Civ. Com. Y Cont. Adm. 2&ordm; Nom. Rio\r\nCuarto, 2/10/02, LLC, 2003 (septiembre) 996; cit. En Highton t. 13 p, 83). Y,\r\nparalelamente, a los efectos del art. 677, 2&ordm; parte del C&oacute;digo Procesal que menciona\r\nqui&eacute;nes pueden ser demandados por desalojo, es decir, los legitimados pasivos, se puede\r\nconcluir que el accionado no encuadra en ninguno de los supuestos all&iacute; prescriptos al no\r\nostentar, por los fundamentos mencionados, la calidad de comodatario u ocupante con\r\nobligaci&oacute;n de restituci&oacute;n.\r\nEn orden a lo expuesto, no resulta entonces procedente en la especie la doctrina de\r\nlos actos propios que el juez de grado aplica para desestimar el planteo de nulidad del\r\ndemandado, fund&aacute;ndose en que la contradicci&oacute;n en la conducta del mismo, es demostrativa\r\ndel reconocimiento del derecho del actor sobre el inmueble (conf. fundamento de p&aacute;g. 239\r\nvta.). Tal razonamiento es incorrecto, por cuanto la operatividad de la doctrina de los actos\r\npropios, con base en la conducta asumida posteriormente por una de las partes intentando\r\nhacer valer una pretensi&oacute;n jur&iacute;dica contradictoria con una postura anterior, exteriorizada en\r\nun contrato, no puede prevalecer cuando la misma se encuentra en contradicci&oacute;n con\r\nnormas jur&iacute;dicas que regulan expresamente la materia, como es lo acontecido en autos.\r\nEn efecto, el car&aacute;cter imperativo de la nueva norma impedir&iacute;a invocar una cl&aacute;usula\r\ncontractual, cuando ello es contrario al orden publico en virtud de lo dispuesto por el art.\r\n21 del C&oacute;digo de fondo. En tales casos el principio de autonom&iacute;a de la libertad se halla\r\nafectado si una ley no reconoce a las partes el derecho de estipular condiciones no\r\npermitidas, pues es evidente que el individuo no puede por un contrato u otro acto\r\ncualquiera, asegurarse derechos sino en cuanto lo permitan las leyes y en la medida que\r\nellas lo hagan (conf. lineamientos doctrinarios extra&iacute;dos de la CNCiv., SalaH, 04/04/2003,\r\n\"Ya&ntilde;ez, Elba L. c. Siciliano, Vicente y otros\". Publicado en: La Ley Online; Cita: TR\r\nCde. Expte. N&ordm; 12.610/22.-\r\n-5-\r\nLALEY AR/JUR/4317/2003).\"La autonom&iacute;a de la voluntad, principio por el cual el\r\nhombre crea la norma que ha de regular su propia conducta, y en cuya virtud es permitido\r\na los contratantes la libre regulaci&oacute;n de sus derechos y obligaciones, posee limites\r\ninderogables, tales como el orden p&uacute;blico, la moral y las buenas constumbres (arts. 21 y\r\n953 del C&oacute;d. Civ.)\" (Julio Cesar Rivera, Graciela Medina, Codigo Civil Comentado,\r\nHechos y Actos Juridicos, Rubinzal Culzoni, pag. 347)\r\nPor su parte y en consonancia con la limitaci&oacute;n se&ntilde;alada, cabe traer a colaci&oacute;n el\r\ncriterio de esta Alzada, cuando al analizar los efectos de cualquier acto realizado en\r\ncontraposici&oacute;n a lo expresamente prescripto por la Ley N&ordm; 113 sobre R&eacute;gimen de\r\nColonizaci&oacute;n y Tierras Fiscales, sostuvo que \"... trat&aacute;ndose de normas de orden p&uacute;blico\r\nellas se vinculan con la esencia misma del derecho que se pretende esgrimir por lo que\r\nprevalecen\" (conf. Fallo N&ordm; 19.705/20).\r\nFinalmente, entrando a resolver la defensa posesoria invocada como fundamento de\r\nla excepci&oacute;n de falta de legitimaci&oacute;n pasiva, cabe entonces verificar si surge probado tal\r\nextremo, teni&eacute;ndose en cuenta el acotado &aacute;mbito del proceso de desalojo que no permite\r\nanalizar m&aacute;s que si existe un mejor derecho al uso y goce del inmueble del accionante\r\nrespecto del accionando con el objeto de lograr la recuperaci&oacute;n, cuando media una\r\nobligaci&oacute;n de restituir exigible (conf. Fallos 18.717/17 y 20.602/22 de esta Alzada).\r\nTeni&eacute;ndose presente adem&aacute;s que, de acuerdo a lo prescripto en el art. 383 del C.P.C.C., este\r\nTribunal es soberano en la apreciaci&oacute;n de la prueba, pudiendo hacer m&eacute;rito solo de las que\r\nconsidere id&oacute;neas y conducentes para la soluci&oacute;n del caso, no estando obligado a\r\nvalorarlas en su totalidad y a expresarlas en la sentencia sino solo las que sirvan para\r\nfundar la misma.\r\nAs&iacute;, y volviendo a examinar el expediente administrativo tramitado ante la\r\nMunicipalidad de la ciudad de Piran&eacute;, del mismo se desprende -en lo que aqu&iacute; interesa para\r\nla soluci&oacute;n del caso-, que en las actuaciones de p&aacute;gs. 154 y 155, en el mes de marzo del\r\na&ntilde;o 2016, el Sr. Alberto Stefani peticion&oacute; ante el Sr. Intendente de la municipalidad de\r\nPiran&eacute;, la concesi&oacute;n de la tenencia de la chacra N&ordm; 52 alegando ser ocupante desde el a&ntilde;o\r\n2013 y acompa&ntilde;ando informaci&oacute;n sumaria del a&ntilde;o 2015 (documental que tambi&eacute;n\r\nacompa&ntilde;a en p&aacute;g. 28 con su escrito de contestaci&oacute;n), reiterando dicha petici&oacute;n en el mes\r\nde septiembre del mismo a&ntilde;o (conf. p&aacute;g. 160). Ocupaci&oacute;n del demandado constatada por el\r\nente municipal conforme inspecci&oacute;n realizada por el mismo en p&aacute;g. 135. En p&aacute;gina 158\r\nobra informe del Director de Tierras Fiscales del referido municipio, donde sugiere, ante el\r\nincumplimiento por parte del adjudicatario de las obligaciones emergentes del contrato\r\nrespectivo, se caduque en todas sus partes el contrato de adjudicaci&oacute;n en venta conferida al\r\nSr. Lucio Sian. En la p&aacute;g. 166 obra certificaci&oacute;n expedida por el Director de Tierras\r\nFiscales del municipio de fecha 04/07/2017 que da cuenta que el Sr. Stefani es ocupante\r\ndel predio en cuesti&oacute;n, documental que tambien agrega al contestar la demanda en p&aacute;g. 26.\r\nAsimismo adjunta Certificaciones Varias N&ordm; 47/15 de p&aacute;g. 24, expedida por el mismo\r\norganismo con igual certificaci&oacute;n pero de fecha 28/09/2015.\r\nTal situaci&oacute;n acontecida en el sub-lite ya fue analizada por este Tribunal en\r\nsupuestos similares donde se concluy&oacute; por la inviabilidad del juicio de desalojo cuando,\r\ncomo ocurre en el caso, el ocupante de un terreno fiscal solicita ante el ente pertinente la\r\nadjudicaci&oacute;n del mismo, debiendo resolverse tales cuestiones ante el organismo\r\nadministrativo con competencia para ello.\r\nEn efecto, \"...no puede soslayarse el hecho de que ante el Instituto Provincial de la\r\nVivienda se encuentran en tr&aacute;mite actuaciones administrativas vinculadas a la\r\nadjudicaci&oacute;n del inmueble, siendo en las mismas donde en definitiva corresponde que se\r\ndecida sobre la situaci&oacute;n de ocupaci&oacute;n de la vivienda del estado, independientemente de\r\nque estas actuaciones se hayan iniciado con posterioridad a la acci&oacute;n de desalojo, dado\r\nque lo decisivo es que el demandado alega derechos posesorios, por lo que debe\r\nextremarse la prudencia y no proceder a la entrega del inmueble por la v&iacute;a intentada, ya\r\nque es en sede administrativa donde se determinar&aacute; en definitiva el mejor derecho a la\r\nadjudicaci&oacute;n del inmueble y, por ende, qui&eacute;n debe ocuparlo dadas las particulares\r\nconnotaciones que presenta la litis, donde se trata de una vivienda del Instituto Provincial\r\nde la Vivienda respecto a la cual se exigen determinados requisitos cuyo cumplimiento\r\ndebe determinarse por la autoridad competente\" (Fallo N&ordm; 14.514/10 -voto de la Dra.\r\nBentancur)\r\nPosteriormente, en el Fallo N&ordm; 19.553/19, de donde surg&iacute;a la petici&oacute;n del\r\ndemandado de la adjudicaci&oacute;n, estando pendiente de resoluci&oacute;n por parte del Instituto de\r\nTierras Fiscales la pretensi&oacute;n del mismo, se sostuvo que \"y es all&iacute; en el organismo\r\ncompetente donde debe definirse la situaci&oacute;n del inmueble. Lo expuesto, lleva a concluir\r\nque la defensa posesoria del demandado es relevante a los fines de repeler la acci&oacute;n de\r\ndesalojo, pues la cuesti&oacute;n planteada desborda el marco acotado del juicio especial, siendo\r\nadem&aacute;s el Instituto de Colonizaci&oacute;n de Tierras Fiscales, el &oacute;rgano competente para\r\npronunciarse en materia de adjudicaci&oacute;n, pues dadas las constancias del mencionado\r\nexpediente, existen cuestiones pendientes de resoluci&oacute;n en dicho &aacute;mbito, siendo que la\r\nadjudicaci&oacute;n primigenia del inmueble no importa per se un derecho absoluto a su\r\nconservaci&oacute;n, cuando por circunstancias sobrevinientes existe una alteraci&oacute;n al statu quo\r\nque motiv&oacute; la misma, y es all&iacute; donde el organismo competente debe pronunciarse, sin que\r\npueda soslayarse la decisi&oacute;n administrativa, so pretexto de invocar la existencia de una\r\nCde. Expte. N&ordm; 12.610/22.-\r\n-6-\r\nobligaci&oacute;n de restituir emanada de un acto nulo\" (Fallo de la Sala II -A&ntilde;o 2019- voto de\r\nla Dra. Garc&iacute;a Nardi y Dr. Roglan) -el resaltado no me pertenece-.\r\nEn consonancia con el criterio expuesto, tambi&eacute;n se sostuvo que \"no puede\r\ndiscutirse en este proceso el car&aacute;cter de adjudicatario-tenedor del bien y compartiendo\r\nlos s&oacute;lidos argumentos establecidos en la sentencia de la anterior instancia referidos a\r\nque las dem&aacute;s cuestiones referentes a la adjudicaci&oacute;n o perdida del derecho deber&aacute;n ser\r\nresultas \"mediante las v&iacute;as pertinentes\", a las que agrego que no se puede mediante esta\r\nacci&oacute;n revisarse las actuaciones administrativas, pues como quedara expuesto exceden el\r\nmarco de conocimiento del proceso\" (Fallo 18.526/17 Sala II -A&ntilde;o 2017- voto del Dr.\r\nRoglan y Dra. Bentancur), m&aacute;xime cuando de las piezas arrimadas surge que la viabilidad\r\nde la prosecuci&oacute;n del tramite administrativo, queda sujeta a lo resuelto en la instancia\r\njudicial, conforme lo dictaminado en la p&aacute;g. 171.\r\nTal conclusi&oacute;n, arribada de acuerdo a las particularidades se&ntilde;aladas que presenta el\r\ncaso planteado, torna innecesario analizar la procedencia de la defensa posesoria en los\r\nt&eacute;rminos en que ha sido deducida por el demandado, sustentada en la posesi&oacute;n animus\r\ndomini que suele invocarse como defensa en este tipo de juicios cuando el desalojo tiene\r\ncomo objeto bienes de propiedad de una persona f&iacute;sica o jur&iacute;dica de car&aacute;cter privado.\r\nCasos estos en que, seg&uacute;n el criterio de esta Alzada, requiere que el demandado aporte\r\nelementos de convicci&oacute;n m&iacute;nimos y suficientes para demostrar la verosimilitud de la\r\nposesi&oacute;n invocada, destac&aacute;ndose que la mera ocupaci&oacute;n de un bien no es signo de\r\nposesi&oacute;n, debiendo ser la prueba a rendir por el poseedor clara y concluyente, mediante la\r\nacreditaci&oacute;n de los correspondientes actos posesorios y en su caso, de haber intervertido el\r\nt&iacute;tulo (conf. Fallo N&ordm; 18.421/17, entre otros).\r\nPor tal motivo carece de utilidad, a los fines se&ntilde;alados, entrar a examinar la prueba\r\ndocumental acompa&ntilde;ada como la factura de energ&iacute;a el&eacute;ctrica y las testimoniales rendidas\r\nen la causa que el juez de grado valor&oacute; para desestimar la defensa posesoria del modo\r\ncomo fue sustentado por el apelante (conf. fundamentos de p&aacute;gs. 240 vta. y 241 vta.), toda\r\nvez que ellas refieren principalmente a quienes ocupaban el inmueble y las construcciones\r\ny mejoras existentes en el mismo, as&iacute; como tambi&eacute;n deviene intrascendente lo concluido\r\nen torno a la fecha de inicio de la posesi&oacute;n por el demandado, hechos que trasuntan en\r\ncuestiones que no alteran la soluci&oacute;n aqu&iacute; arribada.\r\nEn tal sentido, debe dejarse aclarado, que el Tribunal de Alzada est&aacute; plenamente\r\nfacultado para introducir nuevos argumentos que avalen o desechen los que han sido\r\nintroducidos en la expresi&oacute;n de agravios. \"...Si los agravios resultan audibles, la C&aacute;mara\r\nde Apelaciones los abordar&aacute; profunda y abarcadamente, receptando o descartando cada\r\nuno de los argumentos serios que vuelque el apelante en el recurso; sin perjuicio de\r\naportar los propios, sean de hecho, prueba o de derecho, en la medida que no se aparten\r\nde los elementos de la pretensi&oacute;n y oposici&oacute;n, y de los puntuales del recurrente\" (conf.\r\nAzpelicueta-Tessone, La Alzada Poderes y deberes, Ed. Platense SRL., p. 150, citados en\r\nFallos Nros. 18.833/18 y 19.152/19 de esta Alzada) -el subrayado no me pertenece-.\r\n\"A los efectos del an&aacute;lisis del recurso resulta dable poner de manifiesto que este\r\nTribunal no est&aacute; limitado en su razonamiento por la argumentaci&oacute;n del recurrente, ya que\r\nsi bien debe ce&ntilde;irse a los puntos objetados, al abordarlos tiene amplias facultades, iguales\r\na las que sobre la materia ten&iacute;a el Juez de Primera Instancia. Incluso esta Alzada puede\r\nutilizar distintos fundamentos de derecho de los invocados por las partes y por el juez de\r\nPrimera Instancia\" (Fallo N&ordm; 19.847/21 Sala I -A&ntilde;o 2020 de este Tribunal).\r\nConsecuentemente, las cuestiones analizadas en la causa demuestran que la\r\nocupaci&oacute;n del inmueble por el demandado se aprecia relevante como para desestimar la v&iacute;a\r\ndel desaojo al exceder el acotado marco del mismo, por lo que voto por la revocaci&oacute;n de la\r\nsentencia dictada que hace lugar a la acci&oacute;n instaurada, con costas al actor en ambas\r\ninstancias (arts. 68 y 277 del C.P.C.C.).\r\nAsimismo y por razones de celeridad y econom&iacute;a procesal resulta oportuno\r\ndeterminar aqu&iacute; el porcentaje de los honorarios que se establezcan en la instancia de grado\r\npor la etapa cumplida en &eacute;sta (conf. art. 15 de la Ley N&ordm; 512) y que le corresponde a los\r\npatrocinantes del demandado y al apoderado del actor.\r\nEl Dr. Roglan dijo: Por los fundamentos expuestos por la Se&ntilde;ora Jueza\r\npreopinante, adhiero al voto de la misma.\r\nLa Dra. Sosa de Lozina dijo: En mi car&aacute;cter de Presidenta Subrogante de este\r\nTribunal, por existir coincidencias entre los Se&ntilde;ores Jueces preopinantes me abstengo de\r\nemitir voto y procedo a suscribir el presente fallo (conf. arts. 30 y 33, Ley N&ordm; 521 y sus\r\nmodificatorias, Reglamento y Actas vigentes de &eacute;ste Tribunal).\r\nEn este estado, habi&eacute;ndose constituido la mayor&iacute;a legal (conf. art. 33, Ley N&ordm; 521 y\r\nsus modificatorias), se da por terminado el presente Acuerdo, pasado y firmado por ante\r\nm&iacute;, de lo que doy fe.\r\nS E N T E N C I A:\r\n///MOSA, VEINTISIETE DE MARZO DEL A&Ntilde;O DOS MIL VEINTITR&Eacute;S.\r\nA m&eacute;rito del Acuerdo que antecede, la SALA I – A&Ntilde;O 2022 de la EXCMA.\r\nC&Aacute;MARA DE APELACIONES EN LO CIVIL Y COMERCIAL;\r\nR E S U E L V E:\r\nI.- REVOCAR la Sentencia N&ordm; 96/2.021, dictada en las p&aacute;ginas 234/242 vta. en\r\nm&eacute;rito a los fundamentos dados en el \"Considerandos\" precedentes, desestimando, en\r\nconsecuencia, la demanda de desalojo instaurada por el Sr. Abel Sian.\r\nII.- Con COSTAS en ambas instancias a cargo del actor vencido (arts. 68 y 277 del\r\nC.P.C.C.).\r\nIII.- REGULAR los honorarios profesionales de los Dres. CESAR AUGUSTO\r\nBRAGUZZI y RICARDO VIDELA MART&Iacute;NEZ, en el car&aacute;cter de letrados\r\npatrocinantes del demandado apelante, por su intervenci&oacute;n en esta instancia en el Treinta y\r\nCinco Por Ciento (35%) de la regulaci&oacute;n que recaiga y adquiera firmeza en la baja\r\ninstancia, en forma conjunta y en proporci&oacute;n de ley, (art. 15 de la Ley de Aranceles).\r\nAsimismo se regulan los honorarios profesionales del Dr. DARDO R. PALMA PARODI,\r\nen su car&aacute;cter de letrado apoderado del actor apelado, por su intervenci&oacute;n en esta instancia\r\nen el Veinticinco Por Ciento (25%) de la regulaci&oacute;n que recaiga y adquiera firmeza en la\r\nbaja instancia, (art. 15 de la Ley de Aranceles). Debiendo aclararse que para el caso que las\r\nsumas resultantes de la aplicaci&oacute;n de tales porcentajes fuere inferior al m&iacute;nimo legal (8\r\n-JUS- al momento de la regulaci&oacute;n), los montos en concepto de regulaci&oacute;n de honorarios\r\nen esta instancia deben ajustarse a lo establecido en el art. 10 de la Ley N&ordm; 512, conforme\r\ncriterio reiteradamente sostenido por este Tribunal (Fallo N&ordm; 17.754/16, entre otros). A la\r\ntotalidad de las sumas asignadas se les adicionar&aacute; el porcentaje de IVA de as&iacute; corresponder;\r\ndebiendo una vez regulados y firmes los honorarios de la primera instancia, notificarse los\r\naqu&iacute; resueltos y conjuntamente a la Direcci&oacute;n General de Rentas.\r\nReg&iacute;strese, notif&iacute;quese y, oportunamente, bajen los autos al Juzgado de origen.\r\n\r\nDRA. TELMA C. BENTANCUR\r\nJUEZA\r\nC&Aacute;MARA CIVIL Y COMERCIAL\r\n\r\nDR. HORACIO ROBERTO ROGLAN\r\nJUEZ\r\nC&Aacute;MARA CIVIL Y COMERCIAL\r\n\r\nDRA. JUDITH E. SOSA DE LOZINA\r\nPRESIDENTA SUBROGANTE\r\nC&Aacute;MARA CIVIL Y COMERCIAL\r\n\r\nA N T E M &Iacute;\r\nDR. RAM&Oacute;N ULISES C&Oacute;RDOVA\r\nSECRETARIO\r\nC&Aacute;MARA CIVIL Y COMERCIAL\r\n",
            "magistrados": [],
            "sumarios_relacionados": [
                {
                    "uid_sumario": "6824",
                    "id_sumario": "6824",
                    "titulo_sumario": "TIERRAS FISCALES-CESIÓN DE DERECHOS-AUTORIZACIÓN DEL ÓRGANO ADMINISTRATIVO-DESALOJO",
                    "texto_sumario": "[]",
                    "magistrados": [
                        {
                            "nombre": "Dres. Telma Carlota Bentancur, Horacio Roberto Roglan, Judith Elizabeth Sosa de Lozina-Presidenta subrogante-. Sala I.-",
                            "voto": null
                        }
                    ]
                },
                {
                    "uid_sumario": "6825",
                    "id_sumario": "6825",
                    "titulo_sumario": "DESALOJO-INMUEBLE FISCAL-LEGITIMACIÓN ACTIVA-CRITERIO DEL TRIBUNAL",
                    "texto_sumario": "[]",
                    "magistrados": [
                        {
                            "nombre": "Dres. Telma Carlota Bentancur, Horacio Roberto Roglan, Judith Elizabeth Sosa de Lozina-Presidenta subrogante-.\r\nSala I.-",
                            "voto": null
                        }
                    ]
                }
            ],
            "referencias-normativas": [],
            "fecha_umod": "2023-05-09"
        }
    }
}
```
### 4. 2. Lectura de fallos por listado 
Devuelve el detalle del fallo (sea sentencia o auto interlocutorio) buscado, según los criterios proporcionados en los parámetros, más el token de autenticación.
Llamada básica: GET https://api-biblioteca.jusformosa.gob.ar/api/v1.0/jurisprudencia/fallos/

```html
GET https://api-biblioteca.jusformosa.gob.ar/api/v1.0/jurisprudencia/fallos?publicacion_desde=2022-01-01&publicacion_hasta=2022-12-30&tribunal=CAMARA CIVIL Y COMERCIAL&texto=JUICIO ORDINARIO&offset=357&limit=5 
```


**Respuesta**
```json
{
    "document": {
        "SearchResultList": {
            "results": 359,
            "query": "<string>",
            "offset": "357",
            "pageSize": "5"
        },
        "DocumentResultList": {
            "fallos": [
                {
                    "metadata": {
                        "uuid": "17354",
                        "document-type": "jurisprudencia"
                    },
                    "content": {
                        "id_fallo": "17354",
                        "tribunal": "EXCMA. CAMARA CIVIL Y COMERCIAL",
                        "tipo_fallo": "SENTENCIA",
                        "fecha": "2022-12-22",
                        "jurisdiccion": {
                            "tipo": "LOCAL",
                            "pais": "Argentina",
                            "provincia": "FORMOSA",
                            "localidad": "FORMOSA",
                            "id_pais": 11
                        },
                        "caratula": {
                            "actor": null,
                            "demandado": null,
                            "sobre": "SUBELD&Iacute;A, ESTELA ALEJANDRA C/ CARRIZO, ANDREA CARINA FLORA Y/U OTROS S/ JUICIO ORDINARIO (DA&Ntilde;OS Y PERJUICIOS)"
                        },
                        "sumarios_relacionados": [],
                        "descriptores": null,
                        "fecha_umod": "2023-03-21"
                    }
                },
                {
                    "metadata": {
                        "uuid": "17355",
                        "document-type": "jurisprudencia"
                    },
                    "content": {
                        "id_fallo": "17355",
                        "tribunal": "EXCMA. CAMARA CIVIL Y COMERCIAL",
                        "tipo_fallo": "SENTENCIA",
                        "fecha": "2022-12-22",
                        "jurisdiccion": {
                            "tipo": "LOCAL",
                            "pais": "Argentina",
                            "provincia": "FORMOSA",
                            "localidad": "FORMOSA",
                            "id_pais": 11
                        },
                        "caratula": {
                            "actor": null,
                            "demandado": null,
                            "sobre": "SUBELD&Iacute;A, ESTELA ALEJANDRA C/ CARRIZO, ANDREA CARINA FLORA Y/U OTROS S/ JUICIO ORDINARIO (DA&Ntilde;OS Y PERJUICIOS)"
                        },
                        "sumarios_relacionados": [],
                        "descriptores": null,
                        "fecha_umod": "2023-03-21"
                    }
                }
            ]
        }
    }
}
```

### 4. 3. Lectura de sumarios por id 
Devuelve el detalle del fallo (sea sentencia o auto interlocutorio) buscado, según los criterios proporcionados en los parámetros, más el token de autenticación.
Llamada básica: GET https://api-biblioteca.jusformosa.gob.ar/api/v1.0/jurisprudencia/fallos/

```html
GET https://api-biblioteca.jusformosa.gob.ar/api/v1.0/jurisprudencia/sumarios/fulldocument/?id=5504
```

**Respuesta**
```json
{
    "document": {
        "metadata": {
            "uuid": "5504",
            "document-type": "sumario"
        },
        "content": {
            "id_sumario": "5504",
            "titulo": "\"A., H.N. y L., P.A. c/A., C.F. y otros s/Apelación Jdo. Civil, Comercial del Trabajo y de Menores -Las Lomitas-\"\nTRIBUNAL DE FAMILIA",
            "texto": "La guarda judicial es un instituto de carácter altruista, y que de otorgarse no desobliga a\r\nlos progenitores de su responsabilidad parental.",
            "fecha": "2016-03-10",
            "id-infojus": null,
            "referencias-normativas": [],
            "descriptores": "GUARDA JUDICIAL : FUNCIÓN",
            "fallos-relacionados": [
                {
                    "metadata": {
                        "uuid": "9808",
                        "document-type": "jurisprudencia"
                    },
                    "content": {
                        "id_fallo": "9808",
                        "tipo_fallo": "AUTO INTERLOCUTORIO",
                        "tribunal": "TRIBUNAL DE FAMILIA",
                        "fecha": "2016-03-10",
                        "jurisdiccion": {
                            "tipo": "LOCAL",
                            "pais": "Argentina",
                            "provincia": "FORMOSA",
                            "localidad": "FORMOSA",
                            "id_pais": 11
                        },
                        "caratula": {
                            "actor": null,
                            "demandado": null,
                            "sobre": "A., H. N. Y L., P. A. C/ A., C. F. Y OTROS S/ APELACIÓN JDO. CIVIL, COMERCIAL DEL TRABAJO Y DE  DE MENORES – LAS LOMITAS-"
                        },
                        "urlApi": null,
                        "fecha_umod": "2016-10-17"
                    }
                }
            ]
        }
    }
}
```

### 4. 4. Lectura de sumarios por listado 
Devuelve el detalle del sumario, según los parámetros de búsqueda proporcionados, más el token de autenticación.

```html
GET https://api-biblioteca.jusformosa.gob.ar/api/v1.0/jurisprudencia/sumarios?publi-cacion_desde=2022-01-01&publicacion_hasta=2023-07-31&descriptores=CONTRATO DE AHORRO&texto=CONTRATO DE AHORRO&tribunal=CAMARA CIVIL Y COMER-CIAL&limit=1&offset=3
```

**Respuesta**
```json
{
    "document": {
        "SearchResultList": {
            "results": 9,
            "query": "<string>",
            "offset": "3",
            "pageSize": "9"
        },
        "DocumentResultList": {
            "sumarios": [
                {
                    "metadata": {
                        "document-type": "sumario"
                    },
                    "content": {
                        "id_sumario": "6687",
                        "jurisdiccion": {
                            "tipo": "LOCAL",
                            "pais": "Argentina",
                            "provincia": "FORMOSA",
                            "localidad": "FORMOSA",
                            "id_pais": 11
                        },
                        "fecha": "2022-03-28",
                        "id_interno": 6687,
                        "titulo": "Chevrolet Sociedad Anónima de Ahorro para fines determinados s/Gomez, Miguel Norberto y/u otro s/Juicio de ejecución prendaria\nEXCMA. CAMARA CIVIL Y COMERCIAL",
                        "descriptores": "EJECUCIÓN PRENDARIA-CONTRATO DE AHORRO PARA FINES DETERMINADOS-GRUPOS CERRADOS-CRITERIO DEL TRIBUNAL: RÉGIMEN JURÍDICO; ALCANCES",
                        "fecha_umod": "2022-03-28"
                    }
                },
                {
                    "metadata": {
                        "document-type": "sumario"
                    },
                    "content": {
                        "id_sumario": "6687",
                        "jurisdiccion": {
                            "tipo": "LOCAL",
                            "pais": "Argentina",
                            "provincia": "FORMOSA",
                            "localidad": "FORMOSA",
                            "id_pais": 11
                        },
                        "fecha": "2022-03-28",
                        "id_interno": 6687,
                        "titulo": "Chevrolet Sociedad Anónima de Ahorro para fines determinados s/Gomez, Miguel Norberto y/u otro s/Juicio de ejecución prendaria\nEXCMA. CAMARA CIVIL Y COMERCIAL",
                        "descriptores": "EJECUCIÓN PRENDARIA-CONTRATO DE AHORRO PARA FINES DETERMINADOS-GRUPOS CERRADOS-CRITERIO DEL TRIBUNAL: RÉGIMEN JURÍDICO; ALCANCES",
                        "fecha_umod": "2022-03-28"
                    }
                },
                {
                    "metadata": {
                        "document-type": "sumario"
                    },
                    "content": {
                        "id_sumario": "6687",
                        "jurisdiccion": {
                            "tipo": "LOCAL",
                            "pais": "Argentina",
                            "provincia": "FORMOSA",
                            "localidad": "FORMOSA",
                            "id_pais": 11
                        },
                        "fecha": "2022-03-28",
                        "id_interno": 6687,
                        "titulo": "Chevrolet Sociedad Anónima de Ahorro para fines determinados s/Gomez, Miguel Norberto y/u otro s/Juicio de ejecución prendaria\nEXCMA. CAMARA CIVIL Y COMERCIAL",
                        "descriptores": "EJECUCIÓN PRENDARIA-CONTRATO DE AHORRO PARA FINES DETERMINADOS-GRUPOS CERRADOS-CRITERIO DEL TRIBUNAL: RÉGIMEN JURÍDICO; ALCANCES",
                        "fecha_umod": "2022-03-28"
                    }
                },
                {
                    "metadata": {
                        "document-type": "sumario"
                    },
                    "content": {
                        "id_sumario": "6687",
                        "jurisdiccion": {
                            "tipo": "LOCAL",
                            "pais": "Argentina",
                            "provincia": "FORMOSA",
                            "localidad": "FORMOSA",
                            "id_pais": 11
                        },
                        "fecha": "2022-03-28",
                        "id_interno": 6687,
                        "titulo": "Chevrolet Sociedad Anónima de Ahorro para fines determinados s/Gomez, Miguel Norberto y/u otro s/Juicio de ejecución prendaria\nEXCMA. CAMARA CIVIL Y COMERCIAL",
                        "descriptores": "EJECUCIÓN PRENDARIA-CONTRATO DE AHORRO PARA FINES DETERMINADOS-GRUPOS CERRADOS-CRITERIO DEL TRIBUNAL: RÉGIMEN JURÍDICO; ALCANCES",
                        "fecha_umod": "2022-03-28"
                    }
                },
                {
                    "metadata": {
                        "document-type": "sumario"
                    },
                    "content": {
                        "id_sumario": "6687",
                        "jurisdiccion": {
                            "tipo": "LOCAL",
                            "pais": "Argentina",
                            "provincia": "FORMOSA",
                            "localidad": "FORMOSA",
                            "id_pais": 11
                        },
                        "fecha": "2022-03-28",
                        "id_interno": 6687,
                        "titulo": "Chevrolet Sociedad Anónima de Ahorro para fines determinados s/Gomez, Miguel Norberto y/u otro s/Juicio de ejecución prendaria\nEXCMA. CAMARA CIVIL Y COMERCIAL",
                        "descriptores": "EJECUCIÓN PRENDARIA-CONTRATO DE AHORRO PARA FINES DETERMINADOS-GRUPOS CERRADOS-CRITERIO DEL TRIBUNAL: RÉGIMEN JURÍDICO; ALCANCES",
                        "fecha_umod": "2022-03-28"
                    }
                },
                {
                    "metadata": {
                        "document-type": "sumario"
                    },
                    "content": {
                        "id_sumario": "6687",
                        "jurisdiccion": {
                            "tipo": "LOCAL",
                            "pais": "Argentina",
                            "provincia": "FORMOSA",
                            "localidad": "FORMOSA",
                            "id_pais": 11
                        },
                        "fecha": "2022-03-28",
                        "id_interno": 6687,
                        "titulo": "Chevrolet Sociedad Anónima de Ahorro para fines determinados s/Gomez, Miguel Norberto y/u otro s/Juicio de ejecución prendaria\nEXCMA. CAMARA CIVIL Y COMERCIAL",
                        "descriptores": "EJECUCIÓN PRENDARIA-CONTRATO DE AHORRO PARA FINES DETERMINADOS-GRUPOS CERRADOS-CRITERIO DEL TRIBUNAL: RÉGIMEN JURÍDICO; ALCANCES",
                        "fecha_umod": "2022-03-28"
                    }
                }
            ]
        }
    }
}
```

### 4. 5. Lectura de tribunales
Devuelve el detalle de un tribunal o más, según los criterios proporcionados en los parámetros, más el token proporcionado en la autenticación.
Llamada básica: GET https://api-biblioteca.jusformosa.gob.ar/api/v1.0/tribunales/

```html
GET https://api-biblioteca.jusformosa.gob.ar/api/v1.0/tribunales
```

**Respuesta**
```json
[
    {
        "id_tribunal": 2,
        "tribunal": "EXCMA. CAMARA CIVIL Y COMERCIAL"
    },
    {
        "id_tribunal": 28,
        "tribunal": "EXCMA. CAMARA CRIMINAL Y CORRECCIONAL"
    },
    {
        "id_tribunal": 3,
        "tribunal": "EXCMA. CAMARA CRIMINAL Y CORRECCIONAL Nº1"
    },
    {
        "id_tribunal": 4,
        "tribunal": "EXCMA. CAMARA CRIMINAL Y CORRECCIONAL Nº2"
    },
    {
        "id_tribunal": 24,
        "tribunal": "JGDO INST. Y CORRECC.  N° 1 - CLORINDA"
    },
    {
        "id_tribunal": 26,
        "tribunal": "JGDO INST. Y CORRECC. - LAS LOMITAS "
    },
    {
        "id_tribunal": 29,
        "tribunal": "JUZGADO CIVIL Y COMERCIAL"
    },
    {
        "id_tribunal": 12,
        "tribunal": "JUZGADO CIVIL Y COMERCIAL N° 1"
    },
    {
        "id_tribunal": 13,
        "tribunal": "JUZGADO CIVIL Y COMERCIAL N° 2"
    },
    {
        "id_tribunal": 15,
        "tribunal": "JUZGADO CIVIL Y COMERCIAL N° 3"
    },
    {
        "id_tribunal": 14,
        "tribunal": "JUZGADO CIVIL Y COMERCIAL N° 4"
    },
    {
        "id_tribunal": 11,
        "tribunal": "JUZGADO CIVIL Y COMERCIAL N° 5"
    },
    {
        "id_tribunal": 16,
        "tribunal": "JUZGADO CIVIL Y COMERCIAL N° 6"
    },
    {
        "id_tribunal": 17,
        "tribunal": "JUZGADO CIVIL Y COMERCIAL N° 7 - EC"
    },
    {
        "id_tribunal": 10,
        "tribunal": "JUZGADO DE EJECUCION PENAL"
    },
    {
        "id_tribunal": 37,
        "tribunal": "JUZGADO DE INSTRUCCIÓN Y CORRECCIONAL DEL FUERO CONTRA NARCOCRIMEN "
    },
    {
        "id_tribunal": 9,
        "tribunal": "JUZGADO DE MENORES"
    },
    {
        "id_tribunal": 33,
        "tribunal": "JUZGADO DE PAZ N° 1"
    },
    {
        "id_tribunal": 34,
        "tribunal": "JUZGADO DE PAZ N° 2"
    },
    {
        "id_tribunal": 35,
        "tribunal": "JUZGADO DE PAZ N° 3"
    },
    {
        "id_tribunal": 36,
        "tribunal": "JUZGADO DE PAZ N° 4"
    },
    {
        "id_tribunal": 18,
        "tribunal": "JUZGADO INSTRUCCION Y CORRECCIONAL N° 1"
    },
    {
        "id_tribunal": 19,
        "tribunal": "JUZGADO INSTRUCCION Y CORRECCIONAL N° 2"
    },
    {
        "id_tribunal": 20,
        "tribunal": "JUZGADO INSTRUCCION Y CORRECCIONAL N° 3"
    },
    {
        "id_tribunal": 21,
        "tribunal": "JUZGADO INSTRUCCION Y CORRECCIONAL N° 4"
    },
    {
        "id_tribunal": 22,
        "tribunal": "JUZGADO INSTRUCCION Y CORRECCIONAL N° 5"
    },
    {
        "id_tribunal": 23,
        "tribunal": "JUZGADO INSTRUCCION Y CORRECCIONAL N° 6"
    },
    {
        "id_tribunal": 25,
        "tribunal": "JZDO CIVIL, COMER. Y TRAB. - CLORINDA"
    },
    {
        "id_tribunal": 32,
        "tribunal": "STJ - SECRETARIA DE RECURSOS"
    },
    {
        "id_tribunal": 31,
        "tribunal": "STJ - SECRETARIA DE TRAMITES"
    },
    {
        "id_tribunal": 1,
        "tribunal": "SUPERIOR TRIBUNAL DE JUSTICIA"
    },
    {
        "id_tribunal": 5,
        "tribunal": "TRIBUNAL DE FAMILIA"
    },
    {
        "id_tribunal": 27,
        "tribunal": "TRIBUNAL DEL TRABAJO"
    },
    {
        "id_tribunal": 6,
        "tribunal": "TRIBUNAL DEL TRABAJO - SALA I"
    },
    {
        "id_tribunal": 7,
        "tribunal": "TRIBUNAL DEL TRABAJO - SALA II"
    },
    {
        "id_tribunal": 8,
        "tribunal": "TRIBUNAL DEL TRABAJO - SALA III"
    }
]
```

### 4. 6. Lectura de tribunales
Devuelve el detalle del reporte, según los parámetros de búsqueda proporcionados, más el token de autenticación.
Llamada básica: GET https://api-biblioteca.jusformosa.gob.ar/api/v1.0/reporte

**Lectura general de fallos y sumarioss**
```html
GET https://api-biblioteca.jusformosa.gob.ar/api/v1.0/reporte
```

**Respuesta**
```json
[
    {
        "fallos": 17866,
        "sumarios": 6590
    }
]
```

**Lectura por año de cantidad de fallos y sumarios**

**Lectura general de fallos y sumarioss**
```html
GET https://api-biblioteca.jusformosa.gob.ar/api/v1.0/reporte/anio
```

**Respuesta**
```json
[
    {
        "anio": "2023",
        "fallos": 529,
        "sumarios": 64
    },
    {
        "anio": "2022",
        "fallos": 1082,
        "sumarios": 243
    },
    {
        "anio": "2021",
        "fallos": 840,
        "sumarios": 250
    },
    {
        "anio": "2020",
        "fallos": 868,
        "sumarios": 0
    },
    {
        "anio": "2019",
        "fallos": 1344,
        "sumarios": 10
    },
    {
        "anio": "2018",
        "fallos": 1497,
        "sumarios": 365
    },
    {
        "anio": "2017",
        "fallos": 1192,
        "sumarios": 242
    },
    {
        "anio": "2016",
        "fallos": 1253,
        "sumarios": 464
    },
    {
        "anio": "2015",
        "fallos": 1006,
        "sumarios": 181
    },
    {
        "anio": "2014",
        "fallos": 1066,
        "sumarios": 304
    },
    {
        "anio": "2013",
        "fallos": 375,
        "sumarios": 414
    },
    {
        "anio": "2012",
        "fallos": 1423,
        "sumarios": 312
    },
    {
        "anio": "2011",
        "fallos": 1085,
        "sumarios": 1
    },
    {
        "anio": "2010",
        "fallos": 1273,
        "sumarios": 5
    },
    {
        "anio": "2009",
        "fallos": 819,
        "sumarios": 2
    },
    {
        "anio": "2008",
        "fallos": 1191,
        "sumarios": 3
    },
    {
        "anio": "2007",
        "fallos": 302,
        "sumarios": 6
    },
    {
        "anio": "2006",
        "fallos": 267,
        "sumarios": 0
    },
    {
        "anio": "2005",
        "fallos": 149,
        "sumarios": 1
    },
    {
        "anio": "2004",
        "fallos": 48,
        "sumarios": 0
    },
    {
        "anio": "2003",
        "fallos": 57,
        "sumarios": 507
    },
    {
        "anio": "2002",
        "fallos": 60,
        "sumarios": 316
    },
    {
        "anio": "2001",
        "fallos": 98,
        "sumarios": 344
    },
    {
        "anio": "2000",
        "fallos": 19,
        "sumarios": 289
    },
    {
        "anio": "1999",
        "fallos": 8,
        "sumarios": 216
    },
    {
        "anio": "1998",
        "fallos": 13,
        "sumarios": 363
    },
    {
        "anio": "1994",
        "fallos": 2,
        "sumarios": 809
    }
]
```