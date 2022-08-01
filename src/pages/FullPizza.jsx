import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pizza, setPizza] = useState();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://62a7734a97b6156bff8eaea3.mockapi.io/item/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка...';
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt='' />
      <h2>{pizza.title}</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, doloremque accusantium
        tempore quidem ea facilis tenetur ducimus. Consequatur, velit corporis.
      </p>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
