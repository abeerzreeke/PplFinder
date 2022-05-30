import React, { useEffect, useState, useRef, useCallback } from "react";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import * as S from "./style";
import UserCard from "components/UserCard";

const UserList = ({ users = [], isLoading, favoritesView = false, fetchMoreUsers }) => {
  const [userSelectedFilters, setUserSelectedFilters] = useState([]);
  const [usersToView, setUsersToView] = useState([]);
  const [favoriteUsers, setFavoriteUsers] = useState([]);

  const observer = useRef();
  const lastUserElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && fetchMoreUsers && !isLoading) {
          fetchMoreUsers();
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading]
  );

  useEffect(() => {
    if (userSelectedFilters.length) {
      setUsersToView(
        users.filter((user) => userSelectedFilters.includes(user?.location?.country))
      );
    } else {
      setUsersToView(users);
      if (favoritesView && !favoriteUsers.length) {
        setFavoriteUsers(JSON.parse(localStorage.getItem("favoriteUsers")));
      }
    }
  }, [userSelectedFilters, users]);

  const favoriteUserHandler = (clickedUserUid) => {
    if (!localStorage.getItem("favoriteUsers")) {
      localStorage.setItem("favoriteUsers", JSON.stringify(favoriteUsers));
    }

    let savedFavUsers = JSON.parse(localStorage.getItem("favoriteUsers"));
    if (savedFavUsers.find((user) => user?.login?.uuid == clickedUserUid?.login?.uuid)) {
      let filterUsers = savedFavUsers.filter(
        (user) => user?.login?.uuid !== clickedUserUid?.login?.uuid
      );
      localStorage.setItem("favoriteUsers", JSON.stringify(filterUsers));
      setFavoriteUsers(filterUsers);
      if (favoritesView) {
        setUsersToView(filterUsers);
      }
    } else {
      setFavoriteUsers([...savedFavUsers, clickedUserUid]);
      localStorage.setItem(
        "favoriteUsers",
        JSON.stringify([...savedFavUsers, clickedUserUid])
      );
    }
  };

  const filters = [
    { value: "BR", label: "Brazil" },
    { value: "AU", label: "Australia" },
    { value: "CA", label: "Canada" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
  ];
  return (
    <S.UserList>
      <S.Filters>
        {filters.map((filter, index) => (
          <CheckBox
            key={index}
            value={filter.value}
            label={filter.label}
            userSelectedFilters={userSelectedFilters}
            setUserSelectedFilters={setUserSelectedFilters}
          />
        ))}
      </S.Filters>
      <br />
      <S.List>
        {usersToView.map((user, index) => {
          return (
            <UserCard
              key={index}
              userDetails={user}
              ref={index + 1 == usersToView.length ? lastUserElementRef : null}
              isFavoriteUser={favoriteUsers.find(
                (favUser) => favUser?.login?.uuid == user?.login?.uuid
              )}
              addToFavoritesHandler={favoriteUserHandler}
            />
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;