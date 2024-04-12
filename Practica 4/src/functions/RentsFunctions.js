import rents from '../data/DataRents'


function generateUniqueId() {
    if (rents.length === 0) {
        return 1;
    }
    const maxId = rents.reduce((max, rent) => {
        return rent.rentalId > max ? rent.rentalId : max;
    }, 0);
    return maxId + 1;
}


export function rentExist(rentalId){
    return rents.find(rent => rent.rentalId === rentalId);
}

export function create(userId, movieId, rentalDate, rentalDays, status) {
    // Validar que rentalDate sea mayor o igual a la fecha actual
    const currentDate = new Date();
    if (rentalDate < currentDate) {
        alert("La fecha de alquiler debe ser igual o posterior a la fecha actual.");
        return false;
    }

    // Validar que rentalDays sea mayor o igual a 1
    if (rentalDays < 1) {
        alert("Los días de alquiler deben ser al menos 1.");
        return false;
    }

    // Agregar la renta si las validaciones pasan
    rents.push({
        rentalId: generateUniqueId(),
        userId: userId,
        movieId: movieId,
        rentalDate: new Date(2021, 4, 2),
        rentalDays: rentalDays,
        status: status,
    });
    
    return true;
}

export function update(rentalId, userId, movieId, rentalDate, rentalDays, status) {
    const rent = rentExist(rentalId);

    if (rent) {
        // Validaciones de los campos
        const currentDate = new Date();
        if (rentalDate < currentDate) {
            alert("La fecha de alquiler debe ser igual o posterior a la fecha actual.");
            return false;
        }

        if (rentalDays < 1) {
            alert("Los días de alquiler deben ser al menos 1.");
            return false;
        }

        // Buscar el índice de la renta en el array
        const rentIndex = rents.findIndex(rent => rent.rentalId === rentalId);

        // Actualizar la renta si se encuentra en el array
        if (rentIndex !== -1) {
            rents[rentIndex] = {
                rentalId: rentalId,
                userId: userId,
                movieId: movieId,
                rentalDate: rentalDate,
                rentalDays: rentalDays,
                status: status
            };
            return true;
        } else {
            console.error("No se encontró la renta en el sistema.");
            return false;
        }
    } else {
        console.error("La renta no existe.");
        return false;
    }
}
