import React from 'react';

// Componente para mostrar las estrellas
const Rating = ({ rating }) => {
  const totalStars = 5; // Total de estrellas a mostrar
  const fullStar = '★'; // Estrella llena
  const emptyStar = '☆'; // Estrella vacía

  // Determina cuántas estrellas completas mostrar
  const fullStarsCount = Math.floor(rating); // Número de estrellas completas
  const emptyStarsCount = totalStars - fullStarsCount; // Número de estrellas vacías

  return (
    <div style={{ fontSize: '25px', color: 'black' }}>
      {/* Mostrar las estrellas completas */}
      {Array(fullStarsCount).fill(fullStar)}
      {/* Mostrar las estrellas vacías */}
      {Array(emptyStarsCount).fill(emptyStar)}
    </div>
  );
};

export default Rating;
