import React, { useMemo, useState } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
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

const Home = () => {
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


      {/*Component 2: Read Investment Startegy component */}
      {/* The logic is that divided the grid into two parts and and then made one part another grid */}

      <div className='grid grid-cols-3 my-5 gap-6 text-white  '>

        {/* 2/3 part of the grid */}
        <div className='col-span-2 grid grid-cols-2 gap-2'>

          <a className='col-span-2 place-self-end mr-4 '>Read Investment Strategy {'>'} </a>

          {/* Investment Now  Button */}
          <a href={buyBombAddress} className=' text-center bg-[#00ADE8] col-span-2 rounded-md font-extrabold text-2xl p-2'>Invest Now</a>

          {/*Chat on Discord tag */}
          <a className='mt-1 text-center p-2 justify-center items-center flex bg-[#FFFFFF] rounded-md bg-opacity-50	text-black font-semibold' href="https://docs.bomb.money/">
            <img src={DiscordLogo} alt="documentImage" />
            <h6 className='ml-2'> Chat On Discord</h6>
          </a>

          {/*Reas Docs tag */}
          <a className='mt-1 text-center p-2 justify-center items-center flex bg-[#FFFFFF] rounded-md bg-opacity-50	text-black font-semibold' href="https://docs.bomb.money/">
            <img src={DocumentImage} alt="documentImage" />
            <h6 className='ml-2'> Read Docs</h6>
          </a>

          {/* BoardRoom Component */}
          <div className='col-span-2 bg-[#23284B]  bg-opacity-75 border border-[#728CDF] pr-10 pl-6 py-2 text-base'>

            <div className='flex'>
              <img className='h-12 w-12' src={BshareImage} alt="Bomb Share" />
              <div className='mr-auto'>
                <h6 className='font-bold text-2xl'>BoardRoom</h6>
                <h6>Stake BSHARE and earn BOMB every epoch</h6>
              </div>
              <div className='mt-auto text-[16px]'> TVL : $1,008,430</div>

            </div>


            <hr className='border-[#C3C5CB] bg-opacity-50 my-2' />

            {/* Total Staked Class*/}
            <h6 className='flex justify-end '>Total Staked : <span><img className='h-[20px] w-[20px]' src={BshareImage} /></span> 7232</h6>

            {/* 4 component flexbox */}
            <div className=' flex justify-between mt-4 '>

              <div>
                Daily Returns:
                <br />
                <h6 className='font-semibold text-2xl'>2%</h6>
              </div>

              {/** Your Stake Componnet */}
              <div className='w-24'>
                Your Stake :
                {/* The Image and Text */}
                <div className='flex '>
                  <img className='w-[20px] h-[20px]' src={BshareImage} alt="" />
                  6.0000
                </div>
                ≈ $1171.62
              </div>

              {/** Earned Componnet */}
              <div className='w-24'>
                Earned :
                {/* The Image and Text */}
                <div className='flex '>
                  <img className='w-[20px] h-[20px]' src={BombImage} alt="" />
                  6.4413
                </div>
                ≈ $298.88
              </div>

              <div className='grid grid-cols-2 gap-y-2'>
                <div className='col-span-1 place-self-center'><DashBoardButton text="Deposit" imageUrl={UpArrowImage} /></div>
                <div className='col-span-1 place-self-center'><DashBoardButton text="Withdraw" imageUrl={DownArrowImage} /></div>
                <div className='col-span-2 place-self-center'><DashBoardButton text="Claim Rewards" imageUrl={BombImage} /></div>
              </div>

            </div>

          </div>

        </div>

        {/*1/3 part of the grid */}
        <div className='bg-[#23284B] bg-opacity-75 border border-[#728CDF] font-extrabold rounded-md p-2'>
          Latest News
        </div>

      </div>



      {/* //TODO : Make Component 3 BombFarms  */}




      <div className='flex flex-col text-white text-[18px] bg-[#23284B]  bg-opacity-75 border border-[#728CDF]'>

        <div className='flex justify-between text-[20px] p-4'>
          <div>
            <span className='font-bold '>Bomb Farms</span>
            <br />
            Stake your LP tokens in our farms to start earning $BSHARE
          </div>
          <div>
            <div className='col-span-2 place-self-center'><DashBoardButton text="Claim All" imageUrl={BshareImage} /></div>
          </div>
        </div>


        {/* BombBTCB Component */}
        <div className='col-span-2   pr-10 pl-6 py-2 text-base'>

          <div className='flex'>
            <img className='h-6 w-6' src={BshareImage} alt="Bomb Share" />
            <div className='mr-auto'>
              <h6 className='font-bold text-2xl'>BOMB-BTCB</h6>
            </div>
            <div className='mt-auto text-[16px]'> TVL : $1,008,430</div>

          </div>


          <hr className='border-[#C3C5CB] bg-opacity-50 my-2' />


          {/* 4 component flexbox */}
          <div className=' flex justify-between mt-4 '>

            <div>
              Daily Returns:
              <br />
              <h6 className='font-semibold text-2xl'>2%</h6>
            </div>

            {/** Your Stake Componnet */}
            <div className='w-24'>
              Your Stake :
              {/* The Image and Text */}
              <div className='flex '>
                <img className='w-[20px] h-[20px]' src={BshareImage} alt="" />
                124.21
              </div>
              ≈ $1171.62
            </div>

            {/** Earned Componnet */}
            <div className='w-24'>
              Earned :
              {/* The Image and Text */}
              <div className='flex '>
                <img className='w-[20px] h-[20px]' src={BombImage} alt="" />
                6.4413
              </div>
              ≈ $298.88
            </div>

            <div className='flex justify-between '>
              <div className=' place-self-center mx-2'><DashBoardButton text="Deposit" imageUrl={UpArrowImage} /></div>
              <div className=' place-self-center mx-2'><DashBoardButton text="Withdraw" imageUrl={DownArrowImage} /></div>
              <div className=' place-self-center mx-2'><DashBoardButton text="Claim Rewards" imageUrl={BombImage} /></div>
            </div>

          </div>


        </div>

        {/* Blue Horizontal Line foe separtion */}
        <hr className='border-[#00ADE8] ' />


        {/* BombBTCB Component */}
        <div className='col-span-2 pr-10 pl-6 py-2 text-base mt-4'>

          <div className='flex'>
            <img className='h-6 w-6' src={BshareImage} alt="Bomb Share" />
            <div className='mr-auto'>
              <h6 className='font-bold text-2xl'>Bshare-BNB</h6>
            </div>
            <div className='mt-auto text-[16px]'> TVL : $1,008,430</div>

          </div>


          <hr className='border-[#C3C5CB] bg-opacity-50 my-2' />


          {/* 4 component flexbox */}
          <div className=' flex justify-between mt-4 '>

            <div>
              Daily Returns:
              <br />
              <h6 className='font-semibold text-2xl'>2%</h6>
            </div>

            {/** Your Stake Componnet */}
            <div className='w-24'>
              Your Stake :
              {/* The Image and Text */}
              <div className='flex '>
                <img className='w-[20px] h-[20px]' src={BshareImage} alt="" />
                124.21
              </div>
              ≈ $1171.62
            </div>

            {/** Earned Componnet */}
            <div className='w-24'>
              Earned :
              {/* The Image and Text */}
              <div className='flex '>
                <img className='w-[20px] h-[20px]' src={BombImage} alt="" />
                6.4413
              </div>
              ≈ $298.88
            </div>

            <div className='flex justify-between '>
              <div className=' place-self-center mx-2'><DashBoardButton text="Deposit" imageUrl={UpArrowImage} /></div>
              <div className=' place-self-center mx-2'><DashBoardButton text="Withdraw" imageUrl={DownArrowImage} /></div>
              <div className=' place-self-center mx-2'><DashBoardButton text="Claim Rewards" imageUrl={BombImage} /></div>
            </div>

          </div>


        </div>







      </div>



      <br />
      <br />
      <br />

      {/* //TODO : Make Component 4 Bonds */}


      <div className='flex flex-col text-white text-[20px]'>

        {/* BoardRoom Component */}
        <div className='col-span-2 bg-[#23284B]  bg-opacity-75 border border-[#728CDF] pr-10 pl-6 py-2 text-base'>

          <div className='flex'>
            <img className='h-12 w-12' src={BshareImage} alt="Bomb Share" />
            <div className='mr-auto'>
              <h6 className='font-bold text-2xl'>BoardRoom</h6>
              <h6>Stake BSHARE and earn BOMB every epoch</h6>
            </div>
            <div className='mt-auto text-[16px]'> TVL : $1,008,430</div>

          </div>


          <hr className='border-[#C3C5CB] bg-opacity-50 my-2' />

          {/* Total Staked Class*/}
          <h6 className='flex justify-end '>Total Staked : <span><img className='h-[20px] w-[20px]' src={BshareImage} /></span> 7232</h6>

          {/* 4 component flexbox */}
          <div className=' flex justify-between mt-4 '>

            <div>
              Daily Returns:
              <br />
              <h6 className='font-semibold text-2xl'>2%</h6>
            </div>

            {/** Your Stake Componnet */}
            <div className='w-24'>
              Your Stake :
              {/* The Image and Text */}
              <div className='flex '>
                <img className='w-[20px] h-[20px]' src={BshareImage} alt="" />
                6.0000
              </div>
              ≈ $1171.62
            </div>

            {/** Earned Componnet */}
            <div className='w-24'>
              Earned :
              {/* The Image and Text */}
              <div className='flex '>
                <img className='w-[20px] h-[20px]' src={BombImage} alt="" />
                6.4413
              </div>
              ≈ $298.88
            </div>

            <div className='grid grid-cols-2 gap-y-2'>
              <div className='col-span-1 place-self-center'><DashBoardButton text="Deposit" imageUrl={UpArrowImage} /></div>
              <div className='col-span-1 place-self-center'><DashBoardButton text="Withdraw" imageUrl={DownArrowImage} /></div>
              <div className='col-span-2 place-self-center'><DashBoardButton text="Claim Rewards" imageUrl={BombImage} /></div>
            </div>

          </div>

        </div>




      </div>



      <Grid container spacing={3}>

        {/* Explanation text */}


        {/* TVL */}
        <Grid item xs={12} sm={4}>
          <Card style={{ 'paddingTop': '10px' }}>
            <CardContent align="center">
              <h2>Total Value Locked</h2>
              <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" />
            </CardContent>
          </Card>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={8}>
          <Card style={{ height: '100%' }}>
            <CardContent align="center" style={{ marginTop: '2.5%' }}>
              {/* <h2 style={{ marginBottom: '20px' }}>Wallet Balance</h2> */}
              <Button href="https://bomb.farm/" className="shinyButtonGreen" style={{ margin: '5px' }}>
                Autovaults
              </Button>
              <Button
                href={buyBombAddress}
                style={{ margin: '5px' }}
                target="_blank"
                className={'shinyButton ' + classes.button}
              >
                Buy BOMB
              </Button>
              <Button
                href={buyBShareAddress}
                className={'shinyButton ' + classes.button}
                target="_blank"
                style={{ margin: '5px' }}
              >
                Buy BSHARE
              </Button>
              <Button
                href={buyBusmAddress}
                className={'shinyButton ' + classes.button}
                target="_blank"
                style={{ margin: '5px' }}
              >
                Buy BUSM
              </Button>
              <Button
                target="_blank"
                href="https://dexscreener.com/bsc/0x84392649eb0bc1c1532f2180e58bae4e1dabd8d6"
                className="shinyButton"
                style={{ margin: '5px' }}
              >
                BOMB Chart
              </Button>
              <Button
                target="_blank"
                href="https://dexscreener.com/bsc/0x1303246855b5b5ebc71f049fdb607494e97218f8"
                className="shinyButton"
                style={{ margin: '5px' }}
              >
                BSHARE Chart
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* BOMB */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="BOMB" />
                </CardIcon>
              </Box>
              <Button
                onClick={() => {
                  bombFinance.watchAssetInMetamask('BOMB');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px', filter: 'grayscale(100%)' }} src={MetamaskFox} />
              </Button>
              <h2 style={{ marginBottom: '10px' }}>BOMB</h2>
              10,000 BOMB (1.0 Peg) =
              <Box>
                <span style={{ fontSize: '30px', color: 'white' }}>
                  {bombPriceInBNB ? bombPriceInBNB : '-.----'} BTC
                </span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px', alignContent: 'flex-start' }}>
                  ${bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--'} / BOMB
                </span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${roundAndFormatNumber(bombCirculatingSupply * bombPriceInDollars, 2)} <br />
                Circulating Supply: {roundAndFormatNumber(bombCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(bombTotalSupply, 2)}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* BSHARE */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Button
                onClick={() => {
                  bombFinance.watchAssetInMetamask('BSHARE');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px', filter: 'grayscale(100%)' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="BSHARE" />
                </CardIcon>
              </Box>
              <h2 style={{ marginBottom: '10px' }}>BSHARE</h2>
              Current Price
              <Box>
                <span style={{ fontSize: '30px', color: 'white' }}>
                  {bSharePriceInBNB ? bSharePriceInBNB : '-.----'} BNB
                </span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>
                  ${bSharePriceInDollars ? bSharePriceInDollars : '-.--'} / BSHARE
                </span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${roundAndFormatNumber((bShareCirculatingSupply * bSharePriceInDollars).toFixed(2), 2)}{' '}
                <br />
                Circulating Supply: {roundAndFormatNumber(bShareCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(bShareTotalSupply, 2)}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* BBOND */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Button
                onClick={() => {
                  bombFinance.watchAssetInMetamask('BBOND');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px', filter: 'grayscale(100%)' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="BBOND" />
                </CardIcon>
              </Box>
              <h2 style={{ marginBottom: '10px' }}>BBOND</h2>
              10,000 BBOND
              <Box>
                <span style={{ fontSize: '30px', color: 'white' }}>
                  {tBondPriceInBNB ? tBondPriceInBNB : '-.----'} BTC
                </span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'} / BBOND</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${roundAndFormatNumber((tBondCirculatingSupply * tBondPriceInDollars).toFixed(2), 2)} <br />
                Circulating Supply: {roundAndFormatNumber(tBondCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(tBondTotalSupply, 2)}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="BOMB-BTCB-LP" />
                </CardIcon>
              </Box>
              <h2>BOMB-BTCB PancakeSwap LP</h2>
              <Box mt={2}>
                <Button disabled onClick={onPresentBombZap} className="shinyButtonDisabledSecondary">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {bombLPStats?.tokenAmount ? bombLPStats?.tokenAmount : '-.--'} BOMB /{' '}
                  {bombLPStats?.ftmAmount ? bombLPStats?.ftmAmount : '-.--'} BTCB
                </span>
              </Box>
              <Box>${bombLPStats?.priceOfOne ? bombLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${bombLPStats?.totalLiquidity ? roundAndFormatNumber(bombLPStats.totalLiquidity, 2) : '-.--'}{' '}
                <br />
                Total Supply: {bombLPStats?.totalSupply ? roundAndFormatNumber(bombLPStats.totalSupply, 2) : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="BSHARE-BNB-LP" />
                </CardIcon>
              </Box>
              <h2>BSHARE-BNB PancakeSwap LP</h2>
              <Box mt={2}>
                <Button onClick={onPresentBshareZap} className="shinyButtonSecondary">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {bshareLPStats?.tokenAmount ? bshareLPStats?.tokenAmount : '-.--'} BSHARE /{' '}
                  {bshareLPStats?.ftmAmount ? bshareLPStats?.ftmAmount : '-.--'} BNB
                </span>
              </Box>
              <Box>${bshareLPStats?.priceOfOne ? bshareLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: $
                {bshareLPStats?.totalLiquidity ? roundAndFormatNumber(bshareLPStats.totalLiquidity, 2) : '-.--'}
                <br />
                Total Supply: {bshareLPStats?.totalSupply ? roundAndFormatNumber(bshareLPStats.totalSupply, 2) : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
