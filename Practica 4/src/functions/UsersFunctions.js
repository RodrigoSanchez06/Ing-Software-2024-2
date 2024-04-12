import users from '../data/DataUser'

function generateUniqueId() {
    if (users.length === 0) {
        return 1;
    }
    const maxId = users.reduce((max, user) => {
        return user.idUser > max ? user.idUser : max;
    }, 0);
    return maxId + 1;
}

export function userExist(idUser){
    return users.find(user => user.idUser === idUser);
}

export function create(name, lastName, middleName, password, email, superUser) {
    // Expresión regular para validar que el nombre y los apellidos contengan solo letras
    const nameRegex = /^[A-Za-z]+$/;
    
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Verificar si el nombre, apellidos y email cumplen con las validaciones
    if (!nameRegex.test(name)) {
        alert('El nombre debe contener solo letras.');
        return;
    }

    if (!nameRegex.test(lastName)) {
        alert('El apellido paterno debe contener solo letras.');
        return;
    }

    if (!nameRegex.test(middleName)) {
        alert('El apellido materno debe contener solo letras.');
        return;
    }

    if (!emailRegex.test(email)) {
        alert('El formato del correo electrónico no es válido.');
        return;
    }
    console.log(superUser + 'se paso el super user a la funcion');
    // Agregar el nuevo usuario a la lista de usuarios
    users.push({
        idUser: generateUniqueId(),
        name: name,
        lastName: lastName,
        middleName: middleName,
        password: password,
        email: email,
        profilePicture: null,
        superUser: superUser
    });
    
    return true;
}

export function update(idUser, name, lastName, middleName, password, email, superUser){

    const user = userExist(idUser);
    if(userExist(idUser)){

        const nameRegex = /^[A-Za-z]+$/;
    
        // Expresión regular para validar el formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Verificar si el nombre, apellidos y email cumplen con las validaciones
        if (!nameRegex.test(name)) {
            alert('El nombre debe contener solo letras.');
            return;
        }

        if (!nameRegex.test(lastName)) {
            alert('El apellido paterno debe contener solo letras.');
            return;
        }

        if (!nameRegex.test(middleName)) {
            alert('El apellido materno debe contener solo letras.');
            return;
        }

        if (!emailRegex.test(email)) {
            alert('El formato del correo electrónico no es válido.');
            return;
        }
        
        const index = users.indexOf(user);
        const newUser = {
            idUser : idUser,
            name : name,
            lastName : lastName,
            middleName : middleName,
            password : password,
            email : email,
            superUser : superUser
        };
        users[index] = newUser;
        return true;
    } else {
        return false;
    }
}

//No delete porque al parecer es una palabra reservada
export function deleteUser(idUser) {
    // Encuentra el índice de la película con el ID proporcionado
    const index = users.findIndex(user => user.idUser === idUser);
    
    // Si se encuentra la película
    if (index !== -1) {
        // Elimina la película del array de películas
        users.splice(index, 1);
        return true; // Devuelve verdadero para indicar que la película fue eliminada con éxito
    }
    
    return false; // Devuelve falso si la película no se encontró
}
