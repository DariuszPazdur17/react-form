import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';


function CustomButton({ label,icon, ...args }) {
  return (
    <Button variant="outlined"  startIcon={icon} {...args} >
      {label}
    </Button>
  );
}


const MyComponent = () => {
  const [userData, setUserData] = useState({
    name: '',
    surname: '',

    // inne pola
  });

  const handleNameChange = (e) => {
    console.log(e.target.value, e.target.id);
    setUserData({ ...userData, [e.target.id]:e.target.value})
  };

  return (
    <Box
      component="div"
      sx={{
        '& > div': { marginBottom: '20px' }, // Dodaj margines między polami tekstowymi
      }}
      noValidate
      autoComplete="off"
    >

      <div>
        <TextField name = "name"
          id = "name"
          label="Imię"
          variant="outlined"
         
        />
      </div>
      <div>
        <TextField name = "surname"
          id = "surname"
          label="Nazwisko"
          variant="outlined"
          value={userData.Surname}
          onChange={handleNameChange}
        />
      </div>

    </Box>
  );
};

export default MyComponent;
export { CustomButton, DeleteIcon, SendIcon }; // ESM export


// export function BasicTextFields({ register, errors, value, setUserData }) {
//   return (
//     <Box
//       component="div"
//       sx={{
//         '& > div': { marginBottom: '20px' }, // Dodaj margines między polami tekstowymi
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <div>
//         <TextField
//           id="filled-basic"
//           label="Imię"
//           variant="outlined"
//           value={value.name}
//           onChange={(e)=> setUserData}
         
//         />
//       </div>
//       <div>
//         <TextField
//           id="filled-basic"
//           label="Nazwisko"
//           variant="outlined"
//           value={value.surname}
//           onChange={()=> setUserData}
//           {...register("nazwisko", { required: true, minLength: 1 })}
//         />
//         {errors.nazwisko && <p>To pole jest wymagane</p>}
//       </div>
//     </Box>
//   );
// }