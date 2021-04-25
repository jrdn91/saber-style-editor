import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import DeleteIcon from "@material-ui/icons/Delete"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { TreeItem, TreeView } from "@material-ui/lab"
import StylesContext from "contexts/Styles"
import { isEmpty } from "lodash"
import { observer } from "mobx-react"
import { useCallback, useContext, useState } from "react"

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
          Add your first style, by selecting one from the left hand menu
        </Typography>
      </Box>
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
            {store.layers.map((layer, index) => (
              <ListItem
                key={layer.id}
                button
                onClick={() => store.setSelectedLayer(layer)}
                className={classes.nested}
              >
                <ListItemText primary={layer.title} />
                <ListItemSecondaryAction>
                  <IconButton size="small" onClick={handleDeleteLayer(layer)}>
                    <DeleteIcon style={{ fontSize: "1rem" }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Paper>
  )
  // return (
  //   <TreeView
  //     className={classes.treeView}
  //     defaultCollapseIcon={<ExpandMoreIcon />}
  //     defaultExpandIcon={<ChevronRightIcon />}
  //     expanded={expanded}
  //     selected={selected}
  //     onNodeToggle={handleToggle}
  //     onNodeSelect={handleSelect}
  //   >
  //     <TreeItem nodeId="-1" label="Base Saber">
  //       {styles.map((style, index) => (
  //         <TreeItem key={index} nodeId={index} label={style.title} />
  //       ))}
  //     </TreeItem>
  //   </TreeView>
  // )
}

export default observer(StyleParts)
