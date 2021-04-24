import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { TreeItem, TreeView } from "@material-ui/lab"
import StylesContext from "contexts/Styles"
import { isEmpty } from "lodash"
import { useCallback, useContext, useState } from "react"

import useStyles from "./styles"

const StyleParts = ({ children }) => {
  const classes = useStyles()

  const { styles, expanded, setExpanded, setSelectedStyle } = useContext(
    StylesContext
  )

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

  if (isEmpty(styles)) {
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
            {styles.map((style, index) => (
              <ListItem
                key={style.id}
                button
                onClick={() => setSelectedStyle(style.id)}
                className={classes.nested}
              >
                <ListItemText primary={style.title} />
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

export default StyleParts
