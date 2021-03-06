import { currencyAPI } from '../dataApi';

export const loadingRequest = () => ({
  type: 'LOADING_REQUEST',
});

export const errorRequest = (error) => ({
  type: 'ERROR_REQUEST',
  error,
});

export const successRequest = (data) => ({
  type: 'SUCCESS_REQUEST',
  data,
});

export const ThunkAPI = () => async (dispatch) => {
  // chamo a actin loadingRequest para atualizar o estado global para eu ter a informação toda vez que a api estiver carregando
  dispatch(loadingRequest());

  // chama a api
  const api = await currencyAPI(); // a api é retornada em um grade objeto
  console.log(api);
  const arrayAPI = Object.entries(api); // transformo um objeto const api em um array
  console.log(arrayAPI);

  dispatch(successRequest(arrayAPI));
  // faço o dispatch para chamar a action e passar para o reducer
};

export const getExpenses = (expenses) => ({
  type: 'GET_EXPENSES',
  expenses,
});

export const exchangeRates = (data) => ({
  type: 'GET_EXCHANGE_RATES',
  data,
});

export const ThunkAPI2 = () => async (dispatch) => {
  // chamo a actin loadingRequest para atualizar o estado global para eu ter a informação toda vez que a api estiver carregando
  dispatch(loadingRequest());

  // chama a api
  const api = await currencyAPI(); // a api é retornada em um grade objeto
  console.log(api);

  dispatch(exchangeRates(api));
  // faço o dispatch para chamar a action e passar para o reducer
};

export const getTotalValue = (value) => ({
  type: 'GET_TOTAL_VALUE',
  value,
});

export const deleteExpenses = (id) => ({
  type: 'DELETE',
  id,
});
