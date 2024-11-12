import React from "react";
import { useParams } from "react-router-dom";
import NftGeneralInformation from "@/pages/nft/components/NftGeneralInformation";

function NftDetail() {
  const { nftId } = useParams();

  return (
    <>
      <div className="container mx-auto">
        <NftGeneralInformation />
        <p>{nftId}</p>
      </div>
    </>
  );
}

export default NftDetail;
