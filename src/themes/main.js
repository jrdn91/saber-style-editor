import Blue from "@material-ui/core/colors/blue"
import { createMuiTheme } from "@material-ui/core/styles"

const primary = {}
const secondary = {}
const error = {}

const spacing = (factor) => factor * 8

export default createMuiTheme({
  spacing,
  palette: {},
  typography: {},
  overrides: {
    MuiDialog: {
      paper: {
        width: "100%",
        // height: '50%'
      },
    },
    MuiAccordion: {
      root: {
        border: "none",
        borderBottom: "1px solid #e4e4e4",
        "&$expanded": {
          margin: 0,
        },
        "&:before": {
          backgroundColor: "transparent",
        },
      },
    },
    MuiAccordionSummary: {
      root: {
        "&$expanded": {
          minHeight: "initial",
        },
      },
      content: {
        "&$expanded": {
          margin: "initial",
        },
      },
    },
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: Blue[100],
          "&:hover": {
            backgroundColor: Blue[100],
          },
        },
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32,
      },
    },
  },
})
