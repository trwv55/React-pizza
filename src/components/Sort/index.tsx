import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSort } from '../../redux/slices/filter/selectors';
import { setSort } from '../../redux/slices/filter/slice';
import { SortPropertyEnum } from '../../redux/slices/filter/types';


type ListItem = {
  name: string;
  sort: SortPropertyEnum;
}

type PopUpClick = MouseEvent & {
  path: Node[];
}

export const list: ListItem[] = [
  { name: 'популярности (DESC)', sort: SortPropertyEnum.RATING_DESC },
  { name: 'популярности (ASC)', sort: SortPropertyEnum.RATING_ASC },
  { name: 'цене (DESC)', sort: SortPropertyEnum.PRICE_DESC },
  { name: 'цене (ASC)', sort: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту (DESC)', sort: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту (ASC)', sort: SortPropertyEnum.TITLE_ASC },
];

function SortPopUp() {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  function onClickList(obj: ListItem) {
    dispatch(setSort(obj));
    setIsVisible(false);
  }

  useEffect(() => {
    const handleClickBody = (event: MouseEvent) => {
      const _event = event as PopUpClick;

      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setIsVisible(false);
      }
    };
    document.body.addEventListener('click', handleClickBody);
    return () => {
      document.body.removeEventListener('click', handleClickBody);
    };
  }, []);

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{sort.name}</span>
      </div>
      {isVisible && (
        <div className='sort__popup'>
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickList(obj)}
                className={sort.sort === obj.sort ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SortPopUp;
