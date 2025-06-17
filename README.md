# Arquetipo NodeJS

  ![Badge for GitHub repo top language](https://img.shields.io/github/languages/top/connietran-dev/readme-generator?style=flat&logo=appveyor) ![Badge for GitHub last commit](https://img.shields.io/badge/npm-8.19.2-green)
  
  ## Descripcion: 
  
  Proyecto con manejo de errores y logs con formato adecuado para Azure

  ## Table of Contents
  * [Instalacion](#Instalacion)
  * [Uso](#Uso)
  * [Test](#Test)
  
  ## Instalacion
  
  *Pasos requeridos para la instalación:*
  
  En primer lugar asegúrese de poseer el archivo de variables de entorno .env, en caso de poseerlo proceda a ejecutar el siguiente comando:
  
  ```
  npm install
  ```
  Esto generará la carpeta node_modules con las dependencias instaladas, asegúrese de que se haya generado, en caso de errores verificar la version de node y npm instalada en su computador personal.

  ## Uso 
  
  *Intrucciones para el levantamiento y uso:*
  
  ```
  npm run dev
  ```
  De forma local esto levantará la aplicación en el puerto configurado, el cual por defecto debería corresponder al 3000. 
  
  Para consultar el Swagger con el detalle de servicios para cada contrato, diríjase a la ruta leventada agregando /docs.
  ```
  Ej: http://localhost:3000/docs
  ```

  Si se relizan modificaciones en el Swagger o se agregan rutas, recordar que se debe compilar nuevamente su archivo para que adopte los cambios realizados. Esto se hace con el comando:
  ```
  node swagger
  ```

  ## Test
  
  *Instrucciones para la ejecución de test:*
  
  Para la ejecución de los test unitarios alojados en la carpeta test, ejecutar el sigueinte comando:
  ```
  npm test
  ```


