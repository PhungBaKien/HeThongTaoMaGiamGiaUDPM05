import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RegisterUser from './RegisterUser';
import CreateCollection from './CreateCollection';
import CreateNFT from './CreateNFT';
import CollectionManager from './CollectionManager';
import CollectionDetail from './CollectionDetail';
import NftDetail from './NftDetail';
import MarketNft from './MarketNft';
import SellNftPage from './SellNftPage';
import BuyNftPage from './BuyNftPage';
import StopSellingNFT from './StopSellingNFT';
import ListNftToBuy from './ListNftToBuy';
import ListNftToSell from './ListNftToSell'; // Import ListNftToSell

const App = () => (
  <Routes>
    <Route path="/" element={<RegisterUser />} />
    <Route path="/create-collection" element={<CreateCollection />} />
    <Route path="/create-nft" element={<CreateNFT />} />
    <Route path="/manage-collections" element={<CollectionManager />} />
    <Route path="/collection/:id" element={<CollectionDetail />} />
    <Route path="/nft/:nftId" element={<NftDetail />} />
    <Route path="/manage-nft" element={<MarketNft />} />
    <Route path="/sell-nft/:nftId" element={<SellNftPage />} />
    <Route path="/buy-nft/:nftId" element={<BuyNftPage />} />
    <Route path="/stop-selling-nft/:nftId" element={<StopSellingNFT />} />
    <Route path="/nft-to-buy" element={<ListNftToBuy />} />
    <Route path="/nft-to-sell" element={<ListNftToSell />} /> {/* Thêm Route cho ListNftToSell */}
  </Routes>
);

export default App;
