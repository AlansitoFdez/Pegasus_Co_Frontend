# Pegasus & Co. - Sistema de Gestión Aeronáutica

Este proyecto es una solución integral para la gestión de flotas aéreas, compuesta por una API REST (Backend) y una Single Page Application (Frontend). Permite el control total sobre aerolíneas y sus respectivos vuelos.

## 👥 Autor
* **Nombre:** Alan Fernández Diosdado
* **Proyecto:** Práctica Final - Desarrollo Web Full Stack
* **Enlace:** https://github.com/AlansitoFdez/Pegasus_Co_Frontend.git


---

## 🗄️ Configuración de la Base de Datos

El sistema utiliza **MySQL** como motor de base de datos. Para su correcto funcionamiento, se deben seguir estos pasos:

### 1. Credenciales de Acceso
El backend está configurado para conectar con los siguientes datos (ver `config.js`):
* **Usuario:** `pegasus`
* **Contraseña:** `pegasus`
* **Base de Datos:** `pegasus`
* **Puerto:** `3306`

### 2. Script de Configuración Inicial
Ejecuta el siguiente código en tu terminal de MySQL o MySQL Workbench para crear el entorno:

```sql
CREATE DATABASE IF NOT EXISTS pegasus;

CREATE USER 'pegasus'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pegasus';
GRANT ALL PRIVILEGES ON pegasus.* TO 'pegasus'@'localhost';

FLUSH PRIVILEGES;