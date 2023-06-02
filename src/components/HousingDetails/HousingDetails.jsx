import React from 'react'
import { useParams } from "react-router-dom"

export const HousingDetails = () => {
    const { slug } = useParams(); // Recibiendo los parámetros del slug
  return (
    <>
        <div>HousingDetails</div>
        <p>valor de slug: {slug}</p>
    </>
  )
}
