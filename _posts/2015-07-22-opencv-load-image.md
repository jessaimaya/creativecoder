---
layout: post
title: OpenCV
description: "Cargar una imagen en OpenCV y algo más."
modified: 2015-22-07
tags: [OpenCV, notas]
draft: false
image:
  feature: opencv-color.jpg
  credit: creative commons
  creditlink: creativecoder.me/images/opencv-color.jpg
---

Con este post inicio una nueva categoría en el sitio que es **Notas**. La intención de esta categoría es que serán post rápidos con notas que voy tomando mientras veo algún curso, un video, leo un libro, un post de algún otro blog, etc. Puede que incluyan código, pero la idea es que sea algo rápido, algo como un _boilerplate_ para iniciar algún proyecto más complejo o quizá sólo una función que después podré tomar en cuenta para futuros proyectos.

Del mismo modo inicio con los post de [**OpenCV**](http://opencv.org/) que desde hace mucho he querido ir probando ya quese pueden hacer muchas cosas muy interesantes. Como bien se sabe OpenCV se enfoca en el procesamiento de las imágenes, por ello tenemos que partir de lo básico y de cómo podemos cargar y leer la información de una imagen.

##IplImage
OpenCV tiene una estructura de datos enfocada en las imágenes que se llama **IplImage**, que como en muchas otras librerías o frameworks cargan las imágenes en un arreglo de pixeles.

Algunas de las propiedades que más nos interesan por el momento son:

 * **width:** variable de tipo entero que contiene el ancho de la imagen en pixeles.
 * **height:** variable de tipo entero que contiene el alto de la imagen en pixeles.
 * **imageData:** variable de tipo apuntador que apunta a un arreglo de caracteres. Cada uno representa un pixel de la imagen.
 * **nChannels:** variable de tipo entero especificando el número de colores por pixel, puede ir de 1 a 4.
 * **depth:** variable de tipo entera que representa el número de bits por pixel.
 * **origin:** variable de tipo entero indicando cuál es el orgine del sistema coordenado que se usa.
   * **0 =** el origen se ecuentra en la esquina superior izquierda.
   * **1 =** el origen se ecuentra en la esquina inferior izquierda.
 * **widthStep:** variable de tipo entero que nos dice, en bytes, el tamaño de una fila de la imagen.
 * **imageSize:** variable de tipo entero que nos dice, en bytes, el tamaño de la image. Es lo mismo que _(widthStep * height)_
 * **imageDataOrigin:** variable apuntador que apunta al origen de la imagen
 * **roi:** apuntador hacia una estructura que representa una región dentro de la imagen.

![OpenCV image loaded](/images/opencv-load-image.jpg)

Aquí el código que utilicé para cargar una imagen.

#### loadImage.cpp
{% highlight c++ %}
#include <stdio.h>
#include <opencv2/opencv.hpp>

using namespace cv;

int main(int argc, char** argv ){
    if ( argc != 2 ){
        printf("Para usarlo: loadImage <Ruta_de_la_imagen>\n");
        return -1;
    }

    Mat image;
    image = imread( argv[1], 1 );

    if ( !image.data ){
        printf("No se cargó la imagen \n");
        return -1;
    }
    namedWindow("Load Image", WINDOW_AUTOSIZE );
    imshow("Load Image", image);

    waitKey(0);

    return 0;
}
{% endhighlight %}

#### CMakeLists.txt
{% highlight cmake %}
cmake_minimum_required(VERSION 2.8)
project( loadImage )
find_package( OpenCV REQUIRED )
include_directories( ${OpenCV_INCLUDE_DIRS} )
add_executable( loadImage loadImage.cpp )
target_link_libraries( loadImage ${OpenCV_LIBS} )
{% endhighlight %}

#### Terminal
{% highlight bash %}
$ cmake CMakeLists.txt
$ make
$ ./loadImage <Ruta_de_la_imagen>
{% endhighlight %}


