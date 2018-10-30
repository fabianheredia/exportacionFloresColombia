# Exportacion de Flores Colombia al Mundo

 Analisis de las exportaciones de flores de los departamentos de colombia a los diferentes paices del mundo.


         # Como Instalar
clonar o descargar el repositorio
 ``` git clone [repo] ```
copiar y pegar el contenido en un servidor de aplicaciones
* tomcat
* IIS
* ...

ejecutar la aplicación desde el explorador

# Tecnologias usadas
* D3 V5
* BulmaJs

# **_Insight:_** :shipit:
 * Bogotá, Cundinamarca y Antioquia son los lugrares que mas flores exportaron en Colombia para el periodo de 2017.
 * Exieten algunos paices que solo consumen flores de un solo lugar, como Bahamas que solo importa flores de Antioquia o Tailandia que solo importa flores de Bogotá.
 * el departemento del Magdalena solo exporto flores al Reino Unido.
       


# De donde vienen los Datos

Los datos provienen de [Datos Abiertos](https://www.datos.gov.co/Agricultura-y-Desarrollo-Rural/Cadena-Productiva-Flores-Exportaciones/hieb-cqrb) y son suministrados por **Ministerio de Agricultura y Desarrollo Rural**

# What
Dataset Availability: Static

Data Types: Items -> Attributes -> Links

Data and Dataset Types: Networks

Dataset Types: Network

_Attributes:_

### links

| item   |      Type      |  Description |
|----------|:-------------:|------:|
| souce |  Categorical | origen de las flores |
| target |   Categorical | destino de las flores|
| Exportacion |  Ordered -> Quantitative -> Sequential   |   cantidad en toneladas exportadas|

### nodes

| item   |      Type      |  Description |
|----------|:-------------:|------:|
| Pais |  Categorical | departamentod de donde salen las flores y paices a donde llegan |
| Cantidad |   Ordered -> Quantitative -> Sequential   |  Cantidad de toneladas que se exportaron o importaron |
| tipo | Ordered -> Ordinal  |   variable de orden para la grafica|


# Why
Tarea Principal:

Presentar a donde se exporta la mayor cantidad de flores del pais, y mostrar que paises son los mayores sonsumidores de este producto.

Search -> Explore


Tarea Secundaria:

Transformar la informacion para poder representarla de forma de redes donse de establece una relacion de los orignes, los destinos y las cantidades en toneladas del producto exportado.

_Analyze -> Produce -> Derive 

# How
| Encode | Manipulate | Facet | Reduce |
| ---|---|---|---|
|Express | Select |Superimpose| |
|Separate Order Aling | select | Superimpose||



# Marcas
puntos : oriegenes y destipos de exportacion e importacion de flores
lineas: relacion entre los lugares de importacion y exportacion

# Canales
Color: diferencia entre origen y destino