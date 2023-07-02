import React from 'react'
import { sendEmail } from './apiService/apiService';

export const SendEmail = () => {

    const emailContent = {
        to: 'destinatario@example.com',
        subject: 'Asunto del correo',
        body: 'Contenido del correo'
    };

    const sendEmailHandler = async () => {       
        try {
          const response = await sendEmail(emailContent);
          console.log(response);
        } catch(error) {
          console.error(error);
        }
      };
      
    return (
      <div>
        <button onClick={sendEmailHandler}>Enviar correo</button>
      </div>
    );
}
