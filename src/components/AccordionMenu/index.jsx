import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import InfoIcon from "@material-ui/icons/Info"
import StylesContext from "contexts/Styles"
import { SaberStyles } from "contexts/Styles"
import { useContext } from "react"

import useStyles from "./styles"

const AccordionMenu = ({ children }) => {
  const classes = useStyles()

  const { addStyle, styles } = useContext(StylesContext)

  const handleAddStyle = (style) => (e) => {
    addStyle(style)
  }

  return (
    <Box
      height="100%"
      width="100%"
      maxWidth="320px"
      flexShrink={0}
      bgcolor="#fff"
      overflow="auto"
    >
      <Accordion square elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Styles</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <List dense disablePadding className={classes.list}>
            {Object.keys(SaberStyles).map((style) => (
              <ListItem
                key={style}
                button
                disabled={styles.find((s) => s.title === style)}
                onClick={handleAddStyle(style)}
              >
                <ListItemText primary={style} />
                <ListItemSecondaryAction
                  className={classes.listSecondaryAction}
                >
                  <Tooltip
                    title={SaberStyles[style].description}
                    placement="right"
                  >
                    <InfoIcon style={{ fontSize: "1rem" }} />
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion square elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </Box>
  )
}

export default AccordionMenu
