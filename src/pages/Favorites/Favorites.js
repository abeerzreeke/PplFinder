import React, { useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "../../hooks/usePeopleFetch";
import * as S from "./style";

const Favorites = () => {
var savedFavUsers = JSON.parse(localStorage.getItem('favoriteUsers'));


  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites Users
          </Text>
        </S.Header>
        <UserList isLoading={false} favoritesView={true} />
        
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;