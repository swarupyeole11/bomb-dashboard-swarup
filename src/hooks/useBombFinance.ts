import {useContext} from 'react';
import {Context} from '../contexts/BombFinanceProvider';

const useBombFinance = () => {
  const {bombFinance} = useContext(Context); /** THe bomb finance class was expoted from here */
  return bombFinance;
};

export default useBombFinance;
