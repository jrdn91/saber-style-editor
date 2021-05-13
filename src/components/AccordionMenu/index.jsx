import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Popover,
  Tooltip,
  Typography,
} from "@material-ui/core"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import InfoIcon from "@material-ui/icons/Info"
import ColorDot from "components/Common/ColorDot"
import { AppContext } from "contexts/App"
import StylesContext from "contexts/Styles"
import { Functions, LayerTypes, SaberStyles } from "contexts/Styles"
import { isEmpty } from "lodash"
import { observer } from "mobx-react"
import { getType } from "mobx-state-tree"
import { useCallback, useContext, useState } from "react"
import Colors from "store/models/Colors"
import BaseLayer from "store/models/LayerTypes/BaseLayer"

import useStyles from "./styles"

const AccordionMenu = ({ children }) => {
  const classes = useStyles()

  const [expanded, setExpanded] = useState([0, 1, 3])

  const handleChange = (index) => (e, isExpanded) => {
    setExpanded((prevValue) => {
      if (isExpanded) {
        return [...prevValue, index]
      } else {
        return prevValue.filter((v) => v !== index)
      }
    })
  }

  const { openDialog } = useContext(AppContext)
  const { addStyle, store, selectedProperty, setColor } = useContext(
    StylesContext
  )

  const handleAddStyle = (style) => (e) => {
    addStyle(style)
  }

  const handleCreateNewToken = () => {
    openDialog("editToken")
  }

  const handleTokenClick = (token) => () => {
    if (!isEmpty(selectedProperty)) {
      selectedProperty.updateValue(token)
    }
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const [deleteToken, setDeleteToken] = useState()

  const handleConfirmDeleteToken = (token) => (event) => {
    setDeleteToken(token)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setDeleteToken(null)
  }

  const handleDeleteToken = () => {
    store.removeToken(deleteToken.id)
    handleClose()
  }

  const handleEditToken = (token) => () => {
    openDialog("editToken", token)
  }

  const handleAddLayer = (layer) => () => {
    const newLayer = LayerTypes[layer].create()
    store.addLayer(newLayer)
  }

  const open = Boolean(anchorEl)

  const getLayerDisabled = useCallback(
    (layerType) => {
      if (store?.layers?.length) {
        return (
          store?.layers?.find((l) => getType(l).name === layerType) !==
          undefined
        )
      } else {
        return layerType !== "BaseLayer"
      }
    },
    [store?.layers]
  )

  return (
    <Box className={classes.accordionMenu}>
      <Accordion
        expanded={expanded.indexOf(0) > -1}
        onChange={handleChange(0)}
        square
        elevation={0}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="layers-content"
          id="layers-header"
        >
          <Typography className={classes.heading}>Layers</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <List dense disablePadding className={classes.list}>
            {Object.keys(LayerTypes).map((type) => (
              <ListItem
                key={type}
                button
                disabled={getLayerDisabled(type)}
                onClick={handleAddLayer(type)}
              >
                <ListItemText primary={type} />
                <ListItemSecondaryAction
                  className={classes.listSecondaryAction}
                >
                  <Tooltip
                    title={
                      LayerTypes[type].properties.description._defaultValue
                    }
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
      <Accordion
        expanded={expanded.indexOf(1) > -1}
        onChange={handleChange(1)}
        square
        elevation={0}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="styles-content"
          id="styles-header"
        >
          <Typography className={classes.heading}>Styles</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <List dense disablePadding className={classes.list}>
            {Object.keys(SaberStyles).map((style) => (
              <ListItem
                key={style}
                button
                disabled={store?.layers?.length === 0 || !selectedProperty}
                onClick={handleAddStyle(style)}
              >
                <ListItemText primary={style} />
                <ListItemSecondaryAction
                  className={classes.listSecondaryAction}
                >
                  <Tooltip
                    title={
                      SaberStyles[style].properties.description._defaultValue
                    }
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
      <Accordion
        expanded={expanded.indexOf(1) > -1}
        onChange={handleChange(1)}
        square
        elevation={0}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="styles-content"
          id="styles-header"
        >
          <Typography className={classes.heading}>Functions</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <List dense disablePadding className={classes.list}>
            {Object.keys(Functions).map((style) => (
              <ListItem
                key={style}
                button
                disabled={store?.layers?.length === 0 || !selectedProperty}
                onClick={handleAddStyle(style)}
              >
                <ListItemText primary={style} />
                <ListItemSecondaryAction
                  className={classes.listSecondaryAction}
                >
                  <Tooltip
                    title={
                      Functions[style].properties.description._defaultValue
                    }
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
      <Accordion
        expanded={expanded.indexOf(2) > -1}
        onChange={handleChange(2)}
        square
        elevation={0}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="styles-content"
          id="styles-header"
        >
          <Typography className={classes.heading}>Colors</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <List dense disablePadding className={classes.list}>
            {Colors.map((color) => (
              <ListItem
                key={color.value}
                button
                // disabled={store?.layers?.length === 0 || !selectedProperty}
                onClick={() => setColor(color)}
              >
                <ListItemText primary={color.value} />
                <ListItemSecondaryAction
                  className={classes.listSecondaryAction}
                >
                  <ColorDot color={color.background} />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded.indexOf(3) > -1}
        onChange={handleChange(3)}
        square
        elevation={0}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="tokens-content"
          id="tokens-header"
        >
          <Typography className={classes.heading}>Tokens</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <Typography
            variant="caption"
            style={{
              textAlign: "center",
              padding: "0 8px",
              marginBottom: 16,
              opacity: 0.5,
            }}
          >
            Tokens are repeatable values you can use and compose to create
            styles that share similar values much easier
          </Typography>
          <List dense disablePadding className={classes.list}>
            <ListItem button onClick={handleCreateNewToken}>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Create new Token" />
            </ListItem>
            {store?.tokens?.map((token) => {
              console.log(token.toJSON())
              return (
                <ListItem
                  key={token.id}
                  button
                  disabled={store?.layers?.length === 0}
                  onClick={handleTokenClick(token)}
                  className={classes.tokenListItem}
                >
                  <ListItemIcon>
                    <IconButton
                      size="small"
                      edge="start"
                      aria-label="edit"
                      onClick={handleEditToken(token)}
                    >
                      <EditIcon />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography variant="body2">{token.title}</Typography>
                    }
                    secondary={
                      <div style={{ display: "flex" }}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          style={{ marginRight: 8 }}
                        >
                          {token?.value?.displayValue || ""}
                        </Typography>
                        {(token?.value?.title === "Color" ||
                          token?.value?.title === "Rgb") && (
                          <ColorDot color={token?.value?.valueToString} />
                        )}
                      </div>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={handleConfirmDeleteToken(token)}
                      size="small"
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </List>
        </AccordionDetails>
      </Accordion>
      <Popover
        id="Delete token"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <Box p={2}>
          <Typography>Are you sure you want to remove this token?</Typography>
          <Box display="flex" justifyContent="flex-end" paddingTop={2}>
            <Button size="small" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              size="small"
              onClick={handleDeleteToken}
              className={classes.confirmButton}
            >
              Yes, Delete
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  )
}

export default observer(AccordionMenu)
