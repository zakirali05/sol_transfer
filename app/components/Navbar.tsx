import Image from "next/image";
import WalletMultiButtonComp from "./WalletMultiButtonComp";

const Navbar = () => {
  return (
    <header className="p-4 border-b border-zinc-800 flex items-center justify-between">
      <Image
        alt="Solana"
        height={100}
        width={100}
        src={"/solana.png"}
        className="h-8 w-auto"
      />
      <WalletMultiButtonComp />
    </header>
  );
};

export default Navbar;
