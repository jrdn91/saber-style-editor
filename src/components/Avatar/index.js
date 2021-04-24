import { Avatar } from "@material-ui/core"

// avatar components for rendering profile_image or initials
const AvatarComponent = ({ user, ...props }) => {
  const avatarProps = {}
  if (user.profile_image) {
    // only attempt to add a src attribute if there is a profile_image
    // this prevents from showing a broken image indicator and defaults to the users initials
    avatarProps["src"] = user.profile_image
  }
  return (
    <Avatar {...avatarProps} {...props}>
      {/* renders the users initials from the user model in the circle in the instance there is no profile_image */}
      {user.initials}
    </Avatar>
  )
}

export default AvatarComponent
