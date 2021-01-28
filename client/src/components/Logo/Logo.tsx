import Link from "next/link";
import { LogoContainer } from "./Logo.styles";

const Logo = () => (
  <Link href="/">
    <LogoContainer aria-label="Logo">
      <img alt="logo" src="/logo.svg" />
    </LogoContainer>
  </Link>
);

export default Logo;
