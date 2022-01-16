import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../assets/icons/github.svg";
import Gitbook from "../../assets/icons/gitbook-icon.png";
import { ReactComponent as Twitter } from "../../assets/icons/twitter.svg";
import { ReactComponent as Discord } from "../../assets/icons/discord.svg";

export default function Social() {
  return (
    <div className="social-row">
      <Link href="https://pentagon-finance.gitbook.io/welcome/" target="_blank">
        <img color="primary" src={Gitbook} style={{height: '30px', width: '30px'}}/>
      </Link>

      <Link href="https://twitter.com/FinancePentagon" target="_blank">
        <SvgIcon color="primary" component={Twitter} />
      </Link>

      <Link href="https://discord.gg/wdw55xkNY3" target="_blank">
        <SvgIcon color="primary" component={Discord} />
      </Link>
    </div>
  );
}
