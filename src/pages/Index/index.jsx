import { Box } from "@material-ui/core"
import AccordionMenu from "components/AccordionMenu"
import AppBar from "components/AppBar"
import Controls from "components/Controls"
import PropertyArea from "components/PropertyArea"
import SaberViewer from "components/SaberViewer"
import StyleListArea from "components/StyleListArea"
import { StylesContainer } from "contexts/Styles"
import EditTokenDialog from "dialogs/EditToken"
import Page from "pages/Page"

import useStyles from "./styles"

const Index = () => {
  const classes = useStyles()

  return (
    <Page>
      <AppBar />
      <Box className={classes.mainPageArea}>
        <StylesContainer>
          <AccordionMenu />
          <Box display="flex" flex="1 1 auto" flexDirection="column">
            <SaberViewer />
            <Box flex="0 0 auto">
              <Controls />
            </Box>
            <Box display="flex" flexGrow="1" overflow="hidden">
              <StyleListArea />
              <PropertyArea />
            </Box>
          </Box>
          <EditTokenDialog />
        </StylesContainer>
      </Box>
    </Page>
  )
}

export default Index
