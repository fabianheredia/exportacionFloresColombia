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
* 

* 

* 
* 

* 

# De donde vienen los Datos

Los datos provienen de [Datos Abiertos](https://www.datos.gov.co/Agricultura-y-Desarrollo-Rural/Cadena-Productiva-Flores-Exportaciones/hieb-cqrb) y son suministrados por **Ministerio de Agricultura y Desarrollo Rural**

# What
Dataset Availability: 

Data Types: Table -> Items -> Attributes

Data and Dataset Types: Temporal

Dataset Types: Temporal

_Attributes:_

| item   |      Type      |  Description |
|----------|:-------------:|------:|
| Tproductor |  Categorical (Pequeño Productor; Grandes Productores) | Son los productores a los que el Bango Agrario y Finagro han otorgado creditos |
| Departamento |    Categorical (Todos los Departamentos de Colombia)   |   Division politica de Colombia |
| Anio | Time (Ordered -> Quantitative -> Sequential) |    Variable de tiempo que indica el periodo en el cual fue otorgado el credito |
| Valor | Ordered -> Quantitative -> Sequential |    valor del credito en millones de pesos |

# Why
Tarea Principal:

Presentar a donde se exporta la mayor cantidad de flores del pais, y mostrar que paises son los mayores sonsumidores de este producto.

_Query -> Compare -> Trends_ | montos otorgados a traves del tiempo


Tarea Secundaria:

Transformar la informacion para poder representarla de forma de redes donse de establece una relacion de los orignes, los destinos y las cantidades en toneladas del producto exportado.

_Analyze -> Consume -> Discover -> Outliers_ | valores extraños en los creditos otorgados

# How
| Encode | Manipulate | Facet | Reduce |
| ---|---|---|---|
|Express | Select |Superimpose| |
|Separate Order Aling | select | Superimpose||



# Marcas
puntos : monto de credito otorgado para el periodo
barras comparacion entre departamentos

# Canales
X -> Años credito
Y -> Valores de creditos en millones de pesos
Color: definir el tipo de productor