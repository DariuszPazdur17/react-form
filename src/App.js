import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from './components/Navbar';
import { DatePicker } from 'antd';
import { CustomButton, SendIcon } from './components/Components.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'; 

const availableContinents = ["Afryka", "Ameryka Południowa", "Ameryka Północna", "Antarktyda", "Australia", "Azja", "Europa"];

const MyForm = () => {
   // Inicjalizacja hooka useForm dla zarządzania formularzem
    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
      } = useForm();

  // Hooki stanu dla zarządzania aktywowaniem i dezaktywowaniem przycisku, oraz dla sprawdzania wieku
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Stan określający, czy przycisk ma być aktywny czy nie
  const [isOld, setIsOld] = useState(false);


   // Funkcja obsługująca zmianę daty urodzenia
  const handleDateChange = (date) => {
      const selectedDate = new Date(date);
      const currentDate = new Date();

      // Sprawdź czy wybrana data jest większa niż dzisiejsza data
      const isDateValid = selectedDate <= currentDate;

      // Ustaw stan przycisku na podstawie walidacji daty
      setIsButtonDisabled(!isDateValid);
    };
  
     // Funkcja do walidacji wieku i ustawiania stanu "isOld"
  const validateAge = (birthDate) => {
    const currentYear = new Date().getFullYear(); //Walidacja wieku
    const userBirthYear = new Date(birthDate).getFullYear();
    const age = currentYear - userBirthYear;
    const isBirthDateValid = new Date(birthDate) <= new Date();
    setIsButtonDisabled(!isBirthDateValid);

     // Ustaw "isOld" na true, jeśli wiek jest większy lub równy 60, w przeciwnym razie ustaw na false
    if (age >= 60) {
      setIsOld(true);
    } else {
      setIsOld(false);
    }
    console.log(age); // Wyświetl wiek w konsoli (opcjonalnie)
  }

  console.log(errors)

    // Funkcja obsługująca submit formularza
  const onSubmit = (data) => {
       validateAge(data.birthDate);
        
      // Sprawdź czy wybrano kontynent jako Europa
      const selectedContinent = data.continent === "Europa";

      // Sprawdź czy ilość znaków w polu nazwiska jest mniejsza niż 2
      const isSurnameValid = data.surname.length >= 2;

      // Jeśli wybrano Europę i ilość znaków w nazwisku jest mniejsza niż 2, pokaż wiadomość
      if (selectedContinent && !isSurnameValid) {
        alert("Nie spełnione kryteria");

        const isFormValid = true;
        if (isFormValid) {
          // Jeśli wszystkie walidacje są pomyślne, pokaż alert z komunikatem "sukces"
          window.alert('sukces');
        }
  }
  }

  return (
    <form className ={`form-container ${isOld ? "font-size-bigger" : "font-size-smaller"}`} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <Navbar />
        <label>Kontynent</label>
          <select {...register("continent")}>
          <option value="">Wybierz kontynent</option>
          {availableContinents.map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </select>
        {errors.kontynent && <p>Nie spełnione kryteria</p>}
      </div>
      <Box
      component="div"
      sx={{
        '& > div': { marginBottom: '20px' }, // Dodaj margines między polami tekstowymi
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField 
          label="Imię"
          variant="outlined"
          {...register('name', {
            required: {
              value: true,
            },
            pattern: {
              value: /^[A-Za-z]+$/,
              message: 'Nazwisko może zawierać tylko litery.',
            },
          })}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ''}
        />
          {errors.name && <div className="error-message">To pole jest wymagane</div>}
      </div>
      <div>
      <TextField
          label="Nazwisko"
          variant="outlined"
          {...register('surname', {
            required: {
              value: true,
            },
            pattern: {
              value: /^[A-Za-z]+$/,
              message: 'Nazwisko może zawierać tylko litery.',
            },
          })}
          error={!!errors.surname}
          helperText={errors.surname ? errors.surname.message : ''}
        />
        {errors.surname && <div className="error-message">To pole jest wymagane</div>}
      </div>
    </Box>
      <div className="form-group">
      <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              onChange={(date) => {field.onChange(date)
              handleDateChange(date);}}
            />
          )}
        />
      </div>
      <div className='Button'>
        <CustomButton type= "submit" label="Send"  icon={<SendIcon />} disabled={isButtonDisabled}/>
      </div>
    </form>
  );
};

export default MyForm;