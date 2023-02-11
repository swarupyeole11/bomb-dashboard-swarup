import React from 'react'
import BombImage from '../../../assets/img/bomb.png';
import BombInfo from '../../../components/BombInfo';
import DashBoardButton from '../../../components/DashBoardButton';
import BshareImage from '../../../assets/img/bshares.png';
import BbondImage from '../../../assets/img/bbond.png';
import DocumentImage from '../../../assets/img/documentImage.png'
import DiscordLogo from '../../../assets/img/discordLogo.png'
import UpArrowImage from '../../../assets/img/arrowUpCircle.png'
import DownArrowImage from '../../../assets/img/arrowDownCircle.png'
import { roundAndFormatNumber } from '../../../0x';


const BombFinanceSummary = () => {
    return (
        <>
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
        </>
    )
}

export default BombFinanceSummary