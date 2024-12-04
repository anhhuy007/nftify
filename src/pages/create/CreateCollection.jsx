import React from "react";

const user = {
  name: "John Doe",
  address: "0x1234567890",
  isConnected: true,
};

function CreateCollection() {
  return (
    <>
      <div className="flex flex-col min-h-screen my-20 mx-56 ">
        <h1 className="text-primary-foreground text-6xl font-bold">
          Create New NFT
        </h1>
        <span className="text-muted-foreground mt-5 text-2xl">
          Once your item is minted you will not be able to change any of its
          information.
        </span>
        <div className="grid grid-cols-[60%_5%_35%] mt-10">
          <div className="space-y-10">
            {/* Blockchain connection */}
            <div className="bg-card p-5 rounded-xl">
              <div className="flex gap-10">
                <img
                  src="/EthereumIcon.svg"
                  alt="Ethereum Icon"
                  className="w-10 h-10"
                />
                <span className="text-primary-foreground text-2xl font-bold">
                  {user.address} <br /> Ethereum
                </span>
              </div>
            </div>
          </div>
          <div></div>
          {/* Preview */}
          <div className="border-2"></div>
        </div>
      </div>
    </>
  );
}

export default CreateCollection;
