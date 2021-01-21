import { Badge, IconButton } from "@material-ui/core";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@material-ui/icons";
import styled from "styled-components";

const StyledIconButton = styled(IconButton)`
  margin-left: auto;
`;

type Props = {
  open: boolean;
  total: number;
  toggle: () => void;
};

const FavoritesIcon = ({ total, open, toggle }: Props) => (
  <StyledIconButton
    color="inherit"
    data-testid="icon-button"
    disabled={!total}
    onClick={toggle}
  >
    <Badge badgeContent={total} color="secondary">
      {open ? <FavoriteBorderIcon /> : <FavoriteIcon />}
    </Badge>
  </StyledIconButton>
);

export default FavoritesIcon;
