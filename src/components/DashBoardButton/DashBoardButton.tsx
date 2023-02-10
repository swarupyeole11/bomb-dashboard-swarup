import React from 'react';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import TokenSymbol from '../TokenSymbol';


interface DashboardButtonInfo {
  imageUrl?: string;
  text?: string;

}

const DashBoardButton: React.FC<DashboardButtonInfo> = ({imageUrl,text }) => {
  
    
    return (
    <>
      <button className='flex justify-between'>
         {text}
      </button>
    </>
  );
};

export default DashBoardButton;
