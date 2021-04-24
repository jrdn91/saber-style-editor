import { Box } from "@material-ui/core"
import AccordionMenu from "components/AccordionMenu"
import AppBar from "components/AppBar"
import Page from "pages/Page"

import useStyles from "./styles"

const Index = () => {
  const classes = useStyles()

  return (
    <Page>
      <AppBar />
      <Box flexGrow="1">
        <AccordionMenu />
      </Box>
    </Page>
  )
}

export default Index
