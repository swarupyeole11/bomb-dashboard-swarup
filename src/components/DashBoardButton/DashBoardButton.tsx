import React from 'react';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import TokenSymbol from '../TokenSymbol';

interface DashboardButtonInfo {
  imageUrl?: string;
  text?: string;
}

const DashBoardButton: React.FC<DashboardButtonInfo> = ({ imageUrl, text }) => {
  return (
    <>
      <button className="flex p-1 text-[15] border-white border rounded-3xl">
        <div className="mr-4"> {text}</div>
        <img src={imageUrl} alt="Uparrow" />
      </button>
    </>
  );
};

export default DashBoardButton;
