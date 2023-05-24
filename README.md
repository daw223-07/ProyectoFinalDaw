//PASO 1: Tener los archivos y directorios que contiene el repositorio en local

Opción 1: Abre el cmd, desde el directorio donde quieres que esté el repositorio: git clone https://github.com/daw223-07/ProyectoFinalDaw.git

Opción 2: Si lo prefieres puedes descargarte el zip: dentro del respositorio pulsa el botón Code, te desplegará un menú con la url del repositorio (para hacer el git clone que explico anteriormente) y debajo del todo Download ZIP.
A continuación ve a descargas y descomprímelo.


//PASO 2: Creación de la jerarquía de carpetas (desde S.O. Linux/Debian)
(Recuerda que estos pasos son siguiendo el docker-compose.yml y el Dockerfile que están en el repositorio, si deseas crear carpetas diferentes debes indicarlo en los archivos mencionados anteriormente)

Abre el cmd desde root:
mkdir ProyectoFinalAllMovies (crea la carpeta donde estarán todos los archivos necesarios para desplegar la app)

cd ProyectoFinalAllmovies

mkdir AllMoviesApp (crea la carpeta donde estarán todos los archivos que contiene dist/all-movies)


//PASO 3: Copiar los arhivos necesarios a las carpetas del PASO 2

Opción 1: Copia los siguientes archivos: docker-compose.yml y Dockerfile, y pégalos dentro de la carpeta ProyectoFinalAllMovies. Después abre la carpeta dist, luego all-movies y copia todos los archivos y carpetas que contiene, y pégalos en la carpeta AllMoviesApp.

Opción 2: Si deseas hacerlo por comandos:
Abre el cmd desde la carpeta donde tengas el docker-compose.yml y Dockerfile: cp docker-compose.yml /root/ProyectoFinalAllMovies (copia el archivo docker-compose.yml en la carpeta ProyectoFinalAllMovies)
                                                                              cp Dockerfile /root/ProyectoFinalAllMovies (copia el archivo Dockerfile en la carpeta ProyectoFinalAllMovies)

cd dist

cd all-movies

cp -r * /root/ProyectoFinalAllMovies/AllMoviesApp (copia todos los archivos y directoros en la carpeta AllMoviesApp)


//PASO 3: ¿Tienes docker y docker-compose instalado?

Comprueba con este comando "docker -v" si tienes docker instalado. Si no te devuelve la versión de docker ejecuta:

sudo apt update (actualiza los paquetes del sistema)

sudo apt install apt-transport-https ca-certificates curl gnupg2 software-properties-common (instala los paquetes necesarios para permitir que APT utilice repositorios sobre HTTPS)

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg (importa la clave GPG oficial de Docker)

echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null (agrega el repositorio de Docker a las fuentes de APT)

sudo apt update (actualiza los paquetes del sisitema nuevamente para incluir el repositorio de Docker)

sudo apt install docker-ce docker-ce-cli containerd.io (instala Docker)

docker -v (comprueba que Docker se ha instalado correctamente devolviendo la versión actual instalada)


Una vez que sabes que docker está instalado, comprueba con este comando "docker-compose -v" si tienes docker-compose instalado. Si no te devuelve la versión de docker-compose ejecuta:

sudo apt update (actualiza los paquetes del sistema)

apt install curl (instala el paquete curl)

sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose (descarga la versión más reciente de Docker Compose)

sudo chmod +x /usr/local/bin/docker-compose (da permisos de ejecución al archivo descargado)

docker-compose -v (comprueba que Docker Compose se ha instalado correctamente devolviendo la versión actual instalada)


//PASO 4: ¡Despliega la aplicación!

Abre el cmd y dirígete a la carpeta ProyectoFinalAllMovies y ejecuta el siguiente comando: docker-compose up -d

Pon tu IP en el navegador y podrás disfrutar de AllMovies.

Aquí te dejo una cuenta de prueba por si no quieres registrarte:
Usuario: pruebaAllMovies2
Contraseña: prueba123
