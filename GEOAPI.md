APi: geoapi.es

Community: Comunidad
    ENDPOINT: https://apiv1.geoapi.es/comunidades?type=JSON&key=&sandbox=0
    PARÁMETROS: -
    CÓDIGO: CCOM (numérico, 2 dígitos)
    NOMBRE: COM

Province: Provincia
    ENDPOINT: https://apiv1.geoapi.es/provincias?type=JSON&key=&sandbox=0
    PARÁMETROS: CCOM (no obligatorio)
    CÓDIGO: CPRO (numérico, 2 dígitos)
    NOMBRE: PRO

Municipality: Municipio
    ENDPOINT: https://apiv1.geoapi.es/municipios?CPRO=##&type=JSON&key=&sandbox=0
    PARÁMETROS: CPRO
    CÓDIGO: CMUM (numérico, 3 dígitos)
    NOMBRE: DMUN50
    
Population: Población
    ENDPOINT: https://apiv1.geoapi.es/poblaciones?CPRO=##&CMUM=###&type=JSON&key=&sandbox=0
    PARÁMETROS: CPRO, CMUM
    CÓDIGO: CUN (numérico, 7 dígitos)
    NOMBRE: NENTSI50 (string)

Neighborhood: Núcleo
    ENDPOINT: https://apiv1.geoapi.es/nucleos?CPRO=##&CMUM=###&NENTSI50=NOMBRE%20NOMBRE&type=JSON&key=&sandbox=0
    PARÁMETROS: CPRO, CMUM, NENTSI50
    CÓDIGO: ??
    NOMBRE: NNUCLE50 (string)

zipCode: Código Postal
    ENDPOINT: https://apiv1.geoapi.es/cps?CPRO=04&CMUM=902&CUN=0002201&type=JSON&key=&sandbox=0
    PARÁMETROS: CPRO, CMUM, CUN
    CÓDIGO: CPOS (numérico, 5 dígitos)
    NOMBRE: -

Road: Calles
    ENDPOINT: https://apiv1.geoapi.es/calles?CPRO=04&CMUM=902&CUN=0002201&CPOS=04700&type=JSON&key=&sandbox=0
    PARÁMETROS: CPRO, CMUM, CUN, CPOS
    CÓDIGO: CVIA
    NOMBRE: NVIAC (string)
    TIPO: TVIA (string)

