import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import classnames from "clsx"
import StylesContext from "contexts/Styles"
import { isEmpty } from "lodash"
import { observer } from "mobx-react"
import { useCallback, useContext } from "react"

import useStyles from "./styles"

const StyleParts = ({ children }) => {
  const classes = useStyles()

  const { store, expanded, setExpanded } = useContext(StylesContext)

  const handleToggle = useCallback(
    (id) => {
      if (expanded.includes(id)) {
        setExpanded(expanded.filter((i) => i !== id))
      } else {
        setExpanded([...expanded, id])
      }
    },
    [expanded, setExpanded]
  )

  const handleDeleteLayer = (layer) => () => {
    store.removeLayer(layer.id)
  }

  if (isEmpty(store?.layers)) {
    return (
      <Box p={1} className={classes.styleParts}>
        <Typography>
          Start by adding a BaseLayer to build your Saber style off of
        </Typography>
      </Box>
    )
  }

  const generateListItems = (item, index = 1) => {
    const handleListItemIconClicked = () => {
      if (item.properties) {
        handleToggle(item.id)
      }
    }

    return (
      <div key={item.id}>
        <ListItem
          selected={store?.selectedLayer === item}
          className={classes.nested}
          style={{ paddingLeft: 8 * index }}
        >
          <ListItemIcon
            style={{ cursor: "pointer" }}
            onClick={handleListItemIconClicked}
          >
            {item.properties && (
              <ExpandMoreIcon
                className={classnames(classes.expandIcon, {
                  [classes.expanded]: expanded.includes(item.id),
                })}
              />
            )}
          </ListItemIcon>
          <ListItemText
            style={{ cursor: "pointer" }}
            primary={item.title}
            onClick={() => store.setSelectedLayer(item)}
          />
          <ListItemSecondaryAction>
            <IconButton size="small" onClick={handleDeleteLayer(item)}>
              <DeleteIcon style={{ fontSize: "1rem" }} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {item.properties && (
          <Collapse
            in={expanded.includes(item.id)}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {item.properties.map((prop, innerIndex) =>
                generateListItems(prop, index + 2)
              )}
            </List>
          </Collapse>
        )}
      </div>
    )
  }

  return (
    <Paper elevation={1} square className={classes.styleParts}>
      <List component="nav" aria-labelledby="saber-style-layer-list">
        <ListItem button onClick={() => handleToggle(-1)}>
          <ListItemText primary="Base Saber" />
          {expanded.includes(-1) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={expanded.includes(-1)} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {store.layers.map((layer, index) => generateListItems(layer, 2))}
          </List>
        </Collapse>
      </List>
    </Paper>
  )
}

export default observer(StyleParts)
