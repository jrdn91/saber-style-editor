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
import { useCallback, useContext, useMemo } from "react"

import useStyles from "./styles"

const ListItems = observer(({ item, index = 1 }) => {
  const classes = useStyles()

  const { store, expanded, setExpanded, setSelectedProperty } = useContext(
    StylesContext
  )

  const handleDeleteLayer = (layer) => () => {
    store.removeLayer(layer.id)
  }

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

  const handleListItemIconClicked = () => {
    if (item.properties) {
      handleToggle(item.id)
    }
  }

  const handleSetSelectedLayer = () => {
    store.setSelectedLayer(item)
    setSelectedProperty()
  }

  const isSelected = useMemo(() => {
    if (store?.selectedLayer) {
      if (store?.selectedLayer?.type === "Layer") {
        return store?.selectedLayer === item
      } else {
        return store?.selectedLayer === item?.value
      }
    } else {
      return false
    }
  }, [store?.selectedLayer])

  return (
    <div key={item.id}>
      <ListItem
        selected={isSelected}
        className={classes.nested}
        style={{ paddingLeft: 8 * index }}
      >
        <ListItemIcon
          style={{ cursor: "pointer" }}
          onClick={handleListItemIconClicked}
        >
          {item?.subLayers?.length > 0 && (
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
          secondary={item?.value?.title}
          onClick={handleSetSelectedLayer}
        />
        <ListItemSecondaryAction>
          <IconButton size="small" onClick={handleDeleteLayer(item)}>
            <DeleteIcon style={{ fontSize: "1rem" }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {item.properties && item?.subLayers?.length > 0 && (
        <Collapse in={expanded.includes(item.id)} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.subLayers.map((sub, innerIndex) => (
              <ListItems key={sub.id} item={sub} index={index + 2} />
            ))}
          </List>
        </Collapse>
      )}
    </div>
  )
})

const StyleListArea = ({ children }) => {
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

  if (isEmpty(store?.layers)) {
    return (
      <Box p={1} className={classes.styleListArea}>
        <Typography>
          Start by adding a BaseLayer to build your Saber style off of
        </Typography>
      </Box>
    )
  }

  return (
    <Paper elevation={1} square className={classes.styleListArea}>
      <List component="nav" aria-labelledby="saber-style-layer-list">
        <ListItem button onClick={() => handleToggle(-1)}>
          <ListItemText primary="Base Saber" />
          {expanded.includes(-1) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={expanded.includes(-1)} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {store.layers.map((layer, index) => (
              <ListItems key={layer.id} item={layer} index={2} />
            ))}
          </List>
        </Collapse>
      </List>
    </Paper>
  )
}

export default observer(StyleListArea)
