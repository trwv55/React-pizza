import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
// import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { list } from '../components/Sort';

import { useAppDispatch } from '../redux/store';
import { selectPizzas } from '../redux/slices/pizza/selectors';
import { selectFilter } from '../redux/slices/filter/selectors';
import { setCategoryId } from '../redux/slices/filter/slice';
import { fetchPizzas } from '../redux/slices/pizza/asyncActions';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(selectPizzas);
  const { categoryId, sort } = useSelector(selectFilter);
  const sortType = sort.sort;

  const { searchValue } = React.useContext(SearchContext);
  const isMounted = useRef(false);

  // const [currentPage, setCurrentPage] = useState(1);

  const onClickCategoryId = (id: number) => {
    dispatch(setCategoryId(id));
  };

  // Если изменили параметры и был первый рендер
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const qsString = qs.stringify({
  //       sort: sortType,
  //       categoryId,
  //     });
  //     navigate(`?${qsString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sortType, searchValue]);

  //Если был первый рендер, по прверяем URL параметры и сохраняем в редуксе
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = list.find((obj) => obj.sort === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         categoryId: Number(params.category),
  //         sort: sort || list[0],
  //       }),
  //     );
  //   }
  // }, [categoryId, sortType, searchValue]);

  const getPizzas = () => {
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        category,
        order,
        search,
      }),
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue]);

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const pizzas = items.map((obj: any) => (
      <PizzaBlock key={obj.id} {...obj} /> 
  ));

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onClickCategory={onClickCategoryId} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div>
          <h2>Произошла ошибка</h2>
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeleton : pizzas}</div>
      )}
      {/* <Pagination value={currentPage} changeCurrentPage={onClickPage} /> */}
    </div>
  );
};

export default Home;
