Probar usando postman

con POST y url http://localhost:3000/register
en body poner
{
    "username": "marcos.henrique@toptal.com",
    "password": "sup3rS3cr3tPassw0rd!23"
}

tiene que devolver "registro exitoso"

con POST y url http://localhost:3000/login
en body poner
{
    "username": "marcos.henrique@toptal.com",
    "password": "sup3rS3cr3tPassw0rd!23"
}
y devuelver "inicio de sesion exitoso"

si modificamos la contraseña devuelve "Credenciales invalidas"
si modificamos el usuario pero la contraseña es correcta devuelve "usuario no existe"