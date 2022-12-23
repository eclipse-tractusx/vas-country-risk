import { MainNavigation, Logo } from 'cx-portal-shared-components'
import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import LogoSVG from '../../../resources/cxlogo.svg'
import { CompanyUserContext } from '../../../contexts/companyuser'
import { getPortalLink } from '../../services/EnvironmentService'
import Dialog from '@mui/material/Dialog'
import './styles.scss'
import CloseIcon from '@mui/icons-material/Close'

const NavigationBar = () => {
  const { companyUser, updateCompanyUser } = useContext(CompanyUserContext)

  const [open, setOpen] = React.useState(false)

  const openHelpDialog = () => {
    setOpen(!open)
  }

  return (
    <div>
      <MainNavigation
        items={[
          {
            title: 'Country Risk Dashboard',
          },
        ]}
      >
        <a href={getPortalLink()}>
          <Box className="logosvg" component="img" src={LogoSVG} />
        </a>
        <div className="btn-right">
          <div className="help-btn">
            <Button
              color="secondary"
              size="small"
              onClick={openHelpDialog}
              variant="contained"
            >
              Help
            </Button>
          </div>
          <div className="user-btn">
            <IconButton color="primary" size="medium"></IconButton>
          </div>
        </div>
      </MainNavigation>

      <Dialog
        className="Dialog-Help"
        open={open}
        aria-labelledby="customized-dialog-title"
        onClose={openHelpDialog}
      >
        <div className="Dialog-Help-Expand-Div">
          <div className="closeButton">
            <IconButton variant="primary">
              <CloseIcon onClick={openHelpDialog} />
            </IconButton>
          </div>
          <h3 className="header">How to use the tool</h3>
          <ul className="text">
            <li>
              <p>What does the Catena-X Automotive Network work on?</p>
              <p>
                The Catena-X Automotive Network aims to create the conditions
                for the rapid and successful development of an open ecosystem
                for the efficient and secure exchange of information between
                companies in the automotive industry.
              </p>
            </li>
            <li>
              <p>What is the goal of the Catena-X Automotive Network?</p>
              <p>
                The aim of the Catena-X Automotive Network is to create
                standardized data and information flows along the entire
                automotive value chain. The focus here is on the benefits and
                added value for each participant in the network while
                maintaining data sovereignty in accordance with the standards of
                the European Union (GAIA-X).
              </p>
            </li>
            <li>
              <p>
                What happens, if Contract Terms are getting changed after my
                service subscription?
              </p>
              <p>
                {' '}
                Wenn Vertragsrichtlinien sich ändern, werden Sie hierüber
                informieren. Soweit diese geänderten Nutzungsbedingungen
                Regelungen enthalten, die sich auf eine laufende
                Vertragsbeziehung mit dem Provider auswirken, gilt das Folgende:
                Sie werden frühzeitig über die Vertragsänderung informieren und
                Ihnen die Möglichkeit einräumen, den Vertrag mindestens 30 Tage
                zuvor zu kündigen, bevor die Änderung wirksam wird. Wir werden
                Sie ferner besonders informieren, dass die Änderung wirksam
                wird, sollten Sie den Vertrag nicht kündigen. Widerspricht der
                Nutzer, kann der Provider fristlos kündigen. Abgeschlossene
                Transaktionen bleiben davon unberührt.
              </p>
            </li>
          </ul>
        </div>
      </Dialog>
    </div>
  )
}

export default NavigationBar
