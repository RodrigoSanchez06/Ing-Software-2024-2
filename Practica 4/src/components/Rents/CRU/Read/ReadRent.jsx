import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';

import rents from '../../../../data/DataRents';

// Crear tema personalizado para la tabla
createTheme('customTheme', {
  text: {
    primary: '#E7E7E7',
  },
  background: {
    default: '#575757',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#9B9B9B',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
  // Agregar estilo para las celdas rojas
  rows: {
    red: {
      '&:not(:last-of-type)': {
        borderBottomStyle: 'solid',
      },
      '&:hover': {
        backgroundColor: '#9C6A6A !important',
      },
    },
  },
}, 'dark');

// Componente ReadRent
function ReadRent() {
    // Función para calcular si la renta está vencida
    const isRentalOverdue = (rentalDate, rentalDays, status) => {
        console.log("Fecha de renta:", rentalDate);
        console.log("Días de alquiler:", rentalDays);
        console.log("Estado:", status);
        
        const currentDate = new Date(); // Obtener la fecha actual en cada invocación
        console.log("Fecha actual:", currentDate);
        
        const dueDate = new Date(rentalDate);
        dueDate.setDate(dueDate.getDate() + rentalDays);
        console.log("Fecha de vencimiento:", dueDate);
        
        // Comparar solo las fechas (sin horas) para determinar si está vencida
        const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const dueDateWithoutTime = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
        console.log("Fecha actual sin hora:", currentDateWithoutTime);
        console.log("Fecha de vencimiento sin hora:", dueDateWithoutTime);
        
        const isOverdue = dueDateWithoutTime < currentDateWithoutTime && !status;
        console.log("¿Vencida?", isOverdue);
        
        return isOverdue;
      };
  
    // Definir columnas
    const columns = [
      {
        name: 'Id Renta',
        selector: row => row.rentalId,
      },
      {
        name: 'Id Usuario',
        selector: row => row.userId,
        sortable: true,
      },
      {
        name: 'Id Pelicula',
        selector: row => row.movieId,
        sortable: true,
      },
      {
        name: 'Fecha de Renta',
        selector: row => row.rentalDate,
        // Personalizar renderizado de celda para resaltar si está vencida
        cell: row => {
          const isOverdue = isRentalOverdue(row.rentalDate, row.rentalDays, row.status);
          const formattedDate = new Date(row.rentalDate).toLocaleString(); // Convertir a cadena de texto legible
          return (
            <div style={{ color: isOverdue ? 'red' : 'inherit' }}>
              {formattedDate}
            </div>
          );
        },
      },
      {
        name: 'Días de Renta',
        selector: row => row.rentalDays,
      },
      {
        name: 'Entregado',
        selector: row => (row.status ? 'Sí' : 'No'),
        // Personalizar renderizado de celda para mostrar "Sí" o "No"
      },
    ];
  
    return (
      <div className="container mt-5">
        <DataTable
          columns={columns}
          data={rents}
          theme="customTheme"
          // Agregar clase CSS condicional para filas vencidas
          conditionalRowStyles={[
            {
              when: row => isRentalOverdue(row.rentalDate, row.rentalDays, row.status),
              style: {
                backgroundColor: '#9C6A6A',
              },
            },
          ]}
        />
      </div>
    );
  }


export default ReadRent;
