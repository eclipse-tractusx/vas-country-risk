import { MainNavigation, Logo } from "cx-portal-shared-components";
import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoSVG from '../../../resources/cxlogo.svg'
import { CompanyUserContext } from "../../../contexts/companyuser";

const NavigationBar = () => {

  const { companyUser, updateCompanyUser } = useContext(CompanyUserContext);

  return (
    <div>
      <MainNavigation
        /*items={[
          {
            //href: '/home',
            title: 'Home'
          },
          {
            //href: '/appmarktplace',
            title: 'App Marktplace'
          },
          {
            //href: '/datamanagement',
            title: 'Data Management'
          },
          {
            //href: '/partnernetwork',
            title: 'Partner Network'
          }
        ]}*/
      >
        <a href="https://portal.dev.demo.catena-x.net/"> 
        <Box
          component="img"
          src={LogoSVG}
          sx={{
            display: 'inline-block',
            height: '40px',
            width: '170px'
          }}
        />
        </a>
        <Box>
          <Button
            color="secondary"
            size="small"
            sx={{
              backgroundColor: 'white',
              marginRight: '16px'
            }}
            variant="contained"
          >
            Help
          </Button>
          <IconButton
            color="primary"
            size="medium"
          >
          </IconButton>
        </Box>
      </MainNavigation>
    </div>
  );
}

export default NavigationBar;
