import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct, CartItem, selectCartItem } from '../../redux/slices/cartSlice';


type PizzaBlockProps = {
  id: string; price: number; title: string; imageUrl: string; sizes: number[]; types: number[];}

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, price, title, imageUrl, sizes, types }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItem(id));
  const addedCount = cartItem ? cartItem.count : 0;
  const typesName = ['тонкое', 'традиционное'];

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typesName[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addProduct(item));
  };

  return (
    <div className='pizza-block__wrapper'>
      <div className='pizza-block'>
      <Link key={id} to={`/pizza/${id}`}>
        <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
        <h4 className='pizza-block__title'>{title}</h4>
        </Link>
        <div className='pizza-block__selector'>
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? 'active' : ''}>
                {typesName[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={i}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? 'active' : ''}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>от {price} ₽</div>
          <button onClick={onClickAdd} className='button button--outline button--add'>
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                fill='white'
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
