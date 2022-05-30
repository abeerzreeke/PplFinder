import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "../UserList/style";
import Text from "components/Text";
const UserCard = React.forwardRef(
    ({ userDetails, addToFavoritesHandler, isFavoriteUser }, ref) => {
        const [hoveredUserId, setHoveredUserId] = useState();
        const handleMouseEnter = (index) => {
            setHoveredUserId(index);
        };

        const handleMouseLeave = () => {
            setHoveredUserId();
        };
        return (
            <S.User
                key={userDetails?.login?.uuid}
                onMouseEnter={() => handleMouseEnter(userDetails?.login?.uuid)}
                onMouseLeave={handleMouseLeave}
                ref={ref}
            >
                <S.UserPicture src={userDetails?.picture?.large} alt="" />
                <S.UserInfo>
                    <Text size="22px" bold>
                        {userDetails?.name?.title} {userDetails?.name?.first}{" "}
                        {userDetails?.name?.last}
                    </Text>
                    <Text size="14px">{userDetails?.email}</Text>
                    <Text size="14px">
                        {userDetails?.location?.street?.number} {userDetails?.location?.street?.name}
                    </Text>
                    <Text size="14px">
                        {userDetails?.location?.city} {userDetails?.location?.country}
                    </Text>
                </S.UserInfo>
                <S.IconButtonWrapper
                    isVisible={isFavoriteUser || userDetails?.login?.uuid === hoveredUserId}
                >
                    <IconButton onClick={() => addToFavoritesHandler(userDetails)}>
                        <FavoriteIcon color="error" />
                    </IconButton>
                </S.IconButtonWrapper>
            </S.User>
        );
    }
);

export default UserCard;