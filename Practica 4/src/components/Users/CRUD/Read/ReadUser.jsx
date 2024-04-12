import users from '../../../../data/DataUser';
import DataTable, { createTheme } from 'react-data-table-component';

createTheme('solarized', {
    text: {
      primary: '#E7E7E7',
      secondary: '#2aa198',
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
  }, 'dark');
  
  
  const columns = [
  
      {
          name : "Id Usuario",
          selector: row => row.idUser
      },
      {
          name : "Nombre",
          selector:  row => row.name,
          sortable: true
      },
      {
          name : "Apellido Paterno",
          selector:  row => row.lastName
      },
      {    
          name : "Apellido Materno",
          selector:  row => row.middleName
      },
      {    
          name : "Password",
          selector:  row => row.password
      },
      {    
        name : "email",
        selector:  row => row.email
      },
      {    
        name : "Super Usuario",
        selector: row => row.superUser ? "Sí" : "No" // Transformación de booleano a texto
      },
  ]
  
  
  
  function ReadUser(){
      return(
          <div className="container mt-5">
              <DataTable
                  columns={columns}
                  data={users}
                  theme="solarized"
              />
          </div>
      )
  }
  
  export default ReadUser;
