import Image from "next/image";
import LogoBlack from "../../images/logo-black.svg";

export function LogoWithQiroFinanceBlack() {
  return (
    <div className="flex items-center gap-3.5">
      <Image src={LogoBlack} alt="Logo White" />
      <p className="text-[#000000] text-2xl font-semibold font-mont">
        Qiro Finance
      </p>
    </div>
  );
}
