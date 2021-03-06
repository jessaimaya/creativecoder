---
layout: post
title: Color Walker I
description: "Algoritmo random walker conectado al API de colourlovers.com"
modified: 2015-07-13
tags: [random walker, processing, canvas, API, javascript]
draft: true
image:
  feature: colorWalker.jpg
  credit: jessaí maya
  creditlink: creativecoder.me/images/colorWalker.jpg
custom_js:
- processing
- sketch1
---

El siguiente sketch es una implementación de uno de mis algoritmos favoritos [**Random Walk**](https://en.wikipedia.org/wiki/Random_walk) en processing.js. Para hacerlo más interesante usé el API de [colourlovers.com](http://www.colourlovers.com/) para traer paletas de colores. Teniendo la respuesta del API selecciono una aleatoriamente y dependiendo del número de colores que contenga se crea un *walker* con la propiedad de ese color.



<div markdown="0" class="wrapper">
<canvas id="sketch1"></canvas>

<div markdown="0">
<a href="#" title="Agregar" id="btnReset" class="btn">Reset</a>
<a href="#" title="Agregar" id="newColor" class="btn">Otros colores</a>
<a href="#" title="Agregar" id="saveImage" class="btn">Guardar</a>
</div>
</div>

Con el botón **_Reset_** se limpia la pantalla y comienza a dibujarse.

Para cambiar de paleta de colores se tiene que presionar **_Otros colores_**

El botón **_Guardar_** se renderea la imagen y se descarga automáticamente.

