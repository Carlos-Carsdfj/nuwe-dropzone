# DDROP 
Pagina web que implementa una Drop-zone para la simulación de subida de archivos a una web
[DDrop-live](https://nuwe-dropzone.vercel.app)
## Descripción detallada 
Esta pagina fue creada como requisíto para la [Summer-coding-league](http://nuwe.io/app)
en ella se hace uso de una zona de arrastre y suelte para subir archivos de forma facil a una web.
Puedes visitar el enlace anterior para mas detalles , tambien puedes formar parte en la comunidad de
[Nuwe.io](http://nuwe.io) y sumarte a las diversas actividades que suelen organizar.

[![SonarCloud](https://img.shields.io/badge/sonarcloud-A%2B-orange)](https://sonarcloud.io/dashboard?id=Carlos-Carsdfj_nuwe-dropzone)
[![CodeFactor](https://www.codefactor.io/repository/github/carlos-carsdfj/nuwe-dropzone/badge)](https://www.codefactor.io/repository/github/carlos-carsdfj/nuwe-dropzone)
## Install

```shell
  # Clona este repositorio
    git clone https://github.com/Carlos-Carsdfj/nuwe-dropzone.git

```
Nesecitas tener **Nodejs** y **NPM** para los siguientes pasos

```shell
  # Instalar dependencias necesarias
  npm install
```

```shell
  # Levante el servidor en modo de desarrollo 
  npm run dev
   o
  yarn dev  
```

- Visita [http://localhost:3000](http://localhost:3000) en tu explorador para ver el resultado.
Este es un proyecto hecho con Next.js
- [Next.js Documentation](https://nextjs.org/docs).

## View structure

El componente mas relevante es el de DropZone este contiene la zona de drop y toda la logica mas importante del
proyecto
Empesando a ver en este componente podemos notar el useDropzone que importamos del react-dropzone
este es el unico hoock que usamos para la zona de drop de el adquirimos lo siguiente para trabajar

```
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections
  } = useDropzone(typeFilesAccepts)
```

El  **getRootProps** y **getInputprops** son props que debemos dar a un input y al div padre de este ya con esta simple configuracion nuestra zona de drop estaria trabajando asi no utilizaramos ninguna otra configuracíon.

Los archivos capturados por nuestra dropzone los podremos obtener del **acceptedFiles**, mediante el 
**fileRejections** podemos ver si algun archivo subido no cumple con los requisitos para ser aceptado y con el **isDragActive** podemos saber cuando la zona de drag esta siendo usado.

el **typeFilesAccepts** es un objeto que le pasamos con algunas configuracíones 


```
  const typeFilesAccepts = {
    accept: 'image/*, .txt, .csv ',
    maxFiles: 3,
    noDrag: isLoading,
    noClick: isLoading
  }
```
Aqui le estamos diciendo los tipos de archivo que debe de aceptar, el maximo de archivos a la vez, 
que se pueden cargar y especificamos que la zona de drag y click estaran desactivados cuando la zona este cargando 

```
  return (
    <Box
    >
      <Paper elevation={3} className={classes.paper} {...getRootProps()}>
        <input {...getInputProps()} />
        {isLoading ? (
          <CircularProgress color="primary" />
        ) : isDragActive ? (
          <Typography
          >
            SUELTA PARA AGREGAR
          </Typography>
        ) : isFiles ? (
          <ListFiles files={files} />
        ) : (
          <Typography
          >
            ARRASTRA TUS ARCHIVOS AQUÍ
          </Typography>
        )}
      </Paper>
      <Button
        onClick={handlerSubmit}
      >
        Subir archivos
      </Button>
      <Modal className={classes.modal} open={statusFiles} onClose={modalClose}>
        {modalBody}
      </Modal>
    </Box>
  )
```

Este es el return del componente le limpiamos algunos estilos para detallarlo mejor,
podemos ver el uso de **isDragActive** para renderizar un mensaje y el **input** y **Paper**
al cual le pasamos las props antes explicadas para funcionar, podemos apreciar  un booleano **isFiles** que sirve para mostrar el componente **ListFiles** que solo es un componente que muestra de forma ordenada los archivos subidos, un **Modal** que saltara a renderizarse cuando queramos notificarle al usuario algun estatus especial de los archivos ya sea un error y que simplemente que los archivos han sido guardados correctamente.


Tenga en cuenta que la funcionalidad de este componente no se planeaba ser utilizad para subir archivos de forma real a ninguna web o store por lo que al precionar el boton para subir esto activara el loading de la pagina t activara un setTimeout por 5s para simular la carga luego se desactivara el loading y se mostrara el estatus de que los archivos han sido subidos de forma exitosa.


```
  const handlerSubmit = () => {
    if (files.length > 0) {
      setIsLoading(true)
      setFiles([])
      setTimeout(() => {
        setIsLoading(false)
        setMessage({
          title: 'Estamos listo',
          main: 'tus archivos se han subido correctamente',
          footer: '',
          style: true
        })
        setStatusFiles(true)
      }, 5000)
    } else {
      setMessage({
        title: 'Ups, algo a ido mal',
        main: 'No hemos podido subir tu arhivo, compruebe que has cargado correctamente el archivo a la dropzone',
        footer: ' tienes que cargar tus  arhivo antes de poder subirlo ',
        style: false
      })
      setStatusFiles(true)
    }
  }
```
## Tecnologías

    * **Next.js**: Framework construido sobre React. Next nos permite, instalando una sola dependencia, tener configurado todo lo que necesitamos para crear una aplicación de React usando Babel, Webpack, server render y muchas otras técnicas. Tiene la capacidad para generar sitios estáticos (SSG), usar server-side rendering (SSR) o una combinación de ambos según la necesidad de cada página por este motivo y por las ventaja de seo y velocidad de carga  que nos puede dar al poder crear paginas estaticas ya construidas desde el lado del servidor  elegi este framework para desarrollar este proyecto
 
    * **Material-ui**: Proporciona una serie de componentes para React js, agilizando el desarrollo 
del diseño de interfaz de usuario. Elegi material ui porque el diseño que se nos pedia seguir en el reto era echo siguiendo el mismo estilo que la pagina de [Nuwe.io](http://nuwe.io) y esta misma fue diseñada con material-ui, asi usaba el menos  tiempo posible al  tratar de coincidir la vista  de la pagina con la vista del reto.

    * **React-dropzone**: Libreria que nos facilita mediante hoocks la implementacíon de una zona de trabajo y un input con la propiedades de drop y una pre-configuracíon que nos de facilita el uso y diseño de una dropzone. 
    [react-dropzone]( https://react-dropzone.js.org) es una de las librerias  mas usadas descargadas para react y actualmente todavia sigue en constante mantenimiento ademas la documentacíon es bastante sencilla de entender  por lo que fue mi eleccíon para crear esta zona de drop que necesitaba en el proyecto y no darle tanto rollo creando algo parecido desde cero.  


## Info de Contacto
  * email:carsdfj@gmail.com
  * [twitter/ferreira_jardin](https://twitter.com/ferreira_jardin)
  * [linkedin/carlos-jardin](https://www.linkedin.com/in/carlos-ferreira-jardin-799bb0145/)

## Licensia 

[Common Development and Distribution License](https://opensource.org/licenses/CDDL-1.0)

