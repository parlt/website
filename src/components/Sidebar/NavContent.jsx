import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./Social";

import { Trans } from "@lingui/macro";
import { trim, shorten } from "../../helpers";
import { useAddress, useWeb3Context } from "src/hooks/web3Context";
import { Paper, Link, Box, Typography, SvgIcon } from "@material-ui/core";
import "./sidebar.scss";

import LogoImg from '../../assets/logo_pic.png';
import NodeIcon from '../../assets/icons/node-icon.png';
import FuseIcon from '../../assets/icons/fusion-icon.png';
import BuyIcon from '../../assets/icons/quickswap_icon.png';

function NavContent() {
  const [isActive] = useState();
  const address = useAddress();
  const { chainID } = useWeb3Context();

  const checkPage = useCallback((match, location, page) => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
      return true;
    }
    if (currentPath.indexOf("stake") >= 0 && page === "stake") {
      return true;
    }
    return false;
  }, []);

  return (
    <Paper className="dapp-sidebar">
      <Box className="dapp-sidebar-inner" display="flex" justifyContent="space-between" flexDirection="column">
        <div className="dapp-menu-top">
          <Box className="branding-header">
            <Link href="https://pentagon.financial/" target="_blank">
              <img alt="" src={LogoImg} style={{maxWidth:200}}/>
              {/* <SvgIcon
                color="primary"
                component={MemeDAOIcon}
                viewBox="0 0 151 100"
                style={{ minWdth: "151px", minHeight: "98px", width: "151px" }}
              /> */}
            </Link>

            {address && (
              <div className="wallet-link">
                <Link href={`https://mumbai.polygonscan.com/address/${address}`} target="_blank">
                  {shorten(address)}
                </Link>
              </div>
            )}
          </Box>

          <div className="dapp-menu-links">
            <div className="dapp-nav" id="navbarNav">
              <Link
                component={NavLink}
                id="dash-nav"
                to="/stake"
                isActive={(match, location) => {
                  return checkPage(match, location, "dashboard");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6" style={{display: "flex"}}>
                  <img alt="" src={NodeIcon} style={{width:'30px', height: '30px', verticalAlign: 'text-bottom', marginRight: '13px', marginLeft: '4px'}}/>
                  <Trans>Node</Trans>
                </Typography>
              </Link>
            </div>
          </div>

          <div className="dapp-menu-links">
            <div className="dapp-nav" id="navbarNav">
              <Link
                component={NavLink}
                id="dash-nav"
                to="/fusion"
                isActive={(match, location) => {
                  return checkPage(match, location, "dashboard");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6" style={{display: "flex"}}>
                  <img alt="" src={FuseIcon} style={{width:'30px', height: '30px', verticalAlign: 'text-bottom', marginRight: '12px'}}/>
                  <Trans>Fusion</Trans>
                </Typography>
              </Link>
            </div>
          </div>
        </div>

        <Box className="dapp-menu-bottom" display="flex" justifyContent="space-between" flexDirection="column">
          <Link
            component={NavLink}
            to="/"
            className={`button-dapp-menu ${isActive ? "active" : ""}`}
            style={{alignSelf: 'center'}}
          >
            <Typography variant="h6" style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
              <img alt="" src={BuyIcon} style={{width:'30px', height: '30px', verticalAlign: 'text-bottom', marginRight: '12px'}}/>
              Buy $PENT
            </Typography>
          </Link>
          <div className="dapp-menu-social">
            <Social />
          </div>
        </Box>
      </Box>
    </Paper>
  );
}

export default NavContent;
