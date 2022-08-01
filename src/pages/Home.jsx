import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import qs from 'qs';

import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
// import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { list } from '../components/Sort';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.pizzas);
  const { categoryId, sort } = useSelector((state) => state.filter);
  const sortType = sort.sort;

  const { searchValue } = React.useContext(SearchContext);
  const isMounted = useRef(false);

  // const [currentPage, setCurrentPage] = useState(1);

  const onClickCategoryId = (id) => {
    dispatch(setCategoryId(id));
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const qsString = qs.stringify({
        sort: sortType,
        categoryId,
      });
      navigate(`?${qsString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue]);

  //Если был первый рендер, по прверяем URL параметры и сохраняем в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sort === params.sort);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
    }
  }, [categoryId, sortType, searchValue]);

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

  const pizzas = items.map((obj) => (
    <Link key={obj.id} to={`/pizza/${obj.id}`}>
      <PizzaBlock {...obj} />
    </Link>
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
