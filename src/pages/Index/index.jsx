import { Box } from "@material-ui/core"
import AccordionMenu from "components/AccordionMenu"
import AppBar from "components/AppBar"
import PropertyEditor from "components/PropertyEditor"
import SaberViewer from "components/SaberViewer"
import StyleParts from "components/StyleParts"
import { StylesContainer } from "contexts/Styles"
import Page from "pages/Page"

import useStyles from "./styles"

const Index = () => {
  const classes = useStyles()

  return (
    <Page>
      <AppBar />
      <Box flexGrow="1" display="flex">
        <StylesContainer>
          <AccordionMenu />
          <Box display="flex" flex="1 1 auto" flexDirection="column">
            <SaberViewer />
            <Box display="flex" flexGrow="1">
              <StyleParts />
              <PropertyEditor />
            </Box>
          </Box>
        </StylesContainer>
      </Box>
    </Page>
  )
}

export default Index
