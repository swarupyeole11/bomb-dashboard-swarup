import React, { useMemo, useState } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';

import Component3 from './components/Component3';

import BombInfo from '../../components/BombInfo';
import DashBoardButton from '../../components/DashBoardButton';
import useBombStats from '../../hooks/useBombStats';
import useLpStats from '../../hooks/useLpStats';
import useLpStatsBTC from '../../hooks/useLpStatsBTC';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usebShareStats from '../../hooks/usebShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
// import { Bomb as bombTesting } from '../../bomb-finance/deployments/deployments.testing.json';
//import { Bomb as bombProd } from '../../bomb-finance/deployments/deployments.mainnet.json';
import { roundAndFormatNumber } from '../../0x';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';
import { Alert } from '@material-ui/lab';
import { IoCloseOutline } from 'react-icons/io5';
import { BiLoaderAlt } from 'react-icons/bi';
import { makeStyles } from '@material-ui/core/styles';
import useBombFinance from '../../hooks/useBombFinance';
//import { ReactComponent as IconTelegram } from '../../assets/img/telegram.svg';
import { Helmet } from 'react-helmet';
import BombImage from '../../assets/img/bomb.png';
import BshareImage from '../../assets/img/bshares.png';
import BbondImage from '../../assets/img/bbond.png';
import DocumentImage from '../../assets/img/documentImage.png'
import DiscordLogo from '../../assets/img/discordLogo.png'
import UpArrowImage from '../../assets/img/arrowUpCircle.png'
import DownArrowImage from '../../assets/img/arrowDownCircle.png'
//import useBombMaxiStats from '../../hooks/useBombMaxiStats';
import HomeImage from '../../assets/img/background.jpg';
import Component4 from './components/Component4';
import Component2 from './components/Component2';


const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;
const TITLE = 'bomb.money | BTC pegged algocoin';

// const BackgroundImage = createGlobalStyle`
//   body {
//     background-color: grey;
//     background-size: cover !important;
//   }
// `;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      // marginTop: '10px'
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const bombFtmLpStats = useLpStatsBTC('BOMB-BTCB-LP');
  const bShareFtmLpStats = useLpStats('BSHARE-BNB-LP');
  const bombStats = useBombStats();
  const bShareStats = usebShareStats();
  const tBondStats = useBondStats();
  const bombFinance = useBombFinance();
  // const bombmaxi = useBombMaxiStats('0xd6f52e8ab206e59a1e13b3d6c5b7f31e90ef46ef000200000000000000000028');

  // console.log(bombmaxi);
  // let bomb;
  // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  //   bomb = bombTesting;
  // } else {
  //   bomb = bombProd;
  // }

  const buyBombAddress = //'https://app.1inch.io/#/56/swap/BTCB/BOMB';
    //  'https://pancakeswap.finance/swap?inputCurrency=0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c&outputCurrency=' +
    'https://app.bogged.finance/bsc/swap?tokenIn=0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c&tokenOut=0x522348779DCb2911539e76A1042aA922F9C47Ee3';
  //https://pancakeswap.finance/swap?outputCurrency=0x531780FAcE85306877D7e1F05d713D1B50a37F7A';
  const buyBShareAddress = //'https://app.1inch.io/#/56/swap/BNB/BSHARE';
    'https://app.bogged.finance/bsc/swap?tokenIn=BNB&tokenOut=0x531780FAcE85306877D7e1F05d713D1B50a37F7A';
  const buyBusmAddress =
    'https://app.bogged.finance/bsc/swap?tokenIn=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&tokenOut=0x6216B17f696B14701E17BCB24Ec14430261Be94A';
  const bombLPStats = useMemo(() => (bombFtmLpStats ? bombFtmLpStats : null), [bombFtmLpStats]);
  const bshareLPStats = useMemo(() => (bShareFtmLpStats ? bShareFtmLpStats : null), [bShareFtmLpStats]);
  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
  const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
  const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);

  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  const bSharePriceInBNB = useMemo(
    () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
    [bShareStats],
  );
  const bShareCirculatingSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const bombLpZap = useZap({ depositTokenName: 'BOMB-BTCB-LP' });
  const bshareLpZap = useZap({ depositTokenName: 'BSHARE-BNB-LP' });

  const [onPresentBombZap, onDissmissBombZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        bombLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissBombZap();
      }}
      tokenName={'BOMB-BTCB-LP'}
    />,
  );

  const [onPresentBshareZap, onDissmissBshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        bshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissBshareZap();
      }}
      tokenName={'BSHARE-BNB-LP'}
    />,
  );

  const [modal, setModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const openModal = () => {
    setModal(!modal);
  };

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  // const [onPresentIntroVid] = useModal(
  //   <grid>
  //     <Paper>
  //       <div>
  //         <iframe
  //           width="560"
  //           height="315"
  //           src="https://www.youtube.com/embed/nhCWmmRNNhc"
  //           title="YouTube video player"
  //           frameborder="0"
  //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //           allowfullscreen
  //         ></iframe>
  //       </div>
  //     </Paper>
  //   </grid>,
  // );

  return (
    <Page>

      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <BackgroundImage />

      <div className='bg-[#20254380] text-center text-white font-[400] text-[22px]'>
        Bomb Finance Summary
        <hr className='border-[#C3C5CBBF]' />
      </div>

      {/*Component 1 : Bomb Finance Summary Component */}
      <div className='grid grid-cols-2 bg-[#20254380]  '>
        {/*cloumn 1 of the Bomb Finance Summary gird {Current Supply Total price component} */}
        <div className='flex flex-col '>

          <div className='flex text-white text-sm mt-6 mx-36 justify-between'>
            <h6 >Current Supply</h6>
            <h6 >Total Supply</h6>
            <h6 >Price</h6>
          </div>

          <hr className='border-[#C3C5CBBF]' />


          <BombInfo imageUrl={BombImage} token="BTC" investmentAsset="$BOMB" currentSupply={roundAndFormatNumber(bombCirculatingSupply, 2)} totalSupply={roundAndFormatNumber(bombTotalSupply, 2)} price={bombPriceInDollars} priceBTCB={bombPriceInBNB} />
          <hr className='border-[#C3C5CBBF]' />

          <BombInfo imageUrl={BshareImage} token="BNB" investmentAsset="$BSHARE" currentSupply={roundAndFormatNumber(bShareCirculatingSupply, 2)} totalSupply={bShareTotalSupply} price={bSharePriceInDollars} priceBTCB={bSharePriceInBNB} />
          <hr className='border-[#C3C5CBBF]' />

          <BombInfo imageUrl={BbondImage} token="BTC" investmentAsset="$BBOND" currentSupply={roundAndFormatNumber(tBondCirculatingSupply, 2)} totalSupply={roundAndFormatNumber(tBondTotalSupply, 2)} price={tBondPriceInDollars} priceBTCB={tBondPriceInBNB} />
          <hr className='border-[#C3C5CBBF]' />

        </div>

        {/*column 2 of the Bomb Finance Summary gird Current Expoch Component*/}
        <div className='justify-self-end p-3 '>

          <div className='flex flex-col items-center text-white text-lg'>
            <h6>Current Epoch</h6>
            <h6 className='text-4xl'>258</h6>
          </div>

          <hr className='border-[#C3C5CBBF] ' />

          <div className='flex flex-col items-center text-white text-lg'>
            <h6 className='text-4xl'>03:38:36</h6>
            <h6>Next Epoch in</h6>
          </div>

          <hr className='border-[#C3C5CBBF]' />

          <div className='flex flex-col items-center text-gray-400 font-light  '>
            <h6>Live Twap : <span className='text-[#00E8A2]'>1.17</span></h6>
            <h6>TVL : <span className='text-[#00E8A2]'>${TVL}</span></h6>
            <h6>Last Epoch TWAP : <span className='text-[#00E8A2]'>1.22</span></h6>

          </div>

        </div>
      </div>

      <Component2 />

      <Component3 />

       <br />

      <Component4 />

    </Page>
  );
};

export default Dashboard;
