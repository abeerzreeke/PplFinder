import React, { useEffect, useState, useRef, useCallback } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { AlarmRounded, LocalLaundryService } from "@material-ui/icons";
import UserCard from "components/UserCard";

const UserList = ({ users = [], isLoading, favoritesView = false, fetchMoreUsers }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [test, setTest] = useState(0);

  const observer = useRef();
  const lastUserElementRef = useCallback(node => {
    if (isLoading) return
    if (observer.current) {
      observer.current.disconnect()
      console.log('111111')
    }
    observer.current = new IntersectionObserver(entries => {
      console.log('2222222')
      if (entries[0].isIntersecting && fetchMoreUsers) {
        console.log('333333')
        fetchMoreUsers()
      }
    })
    if (node) {
      observer.current.observe(node)
      console.log('44444444', node)
    }
  }, [isLoading])



  const [userSelectedFilters, setUserSelectedFilters] = useState([]);
  const [usersToView, setUsersToView] = useState([]);
  const [addedToFav, setAddedToFav] = useState(0);

  useEffect(() => {
    if (favoritesView) {
      if (!localStorage.getItem('favoriteUsers')) {
        localStorage.setItem('favoriteUsers', JSON.stringify(favoriteUsers))

      } else {

        // var favUsers =  JSON.parse(localStorage.getItem('favoriteUsers'))
        setFavoriteUsers(JSON.parse(localStorage.getItem('favoriteUsers')))
      }

      if (userSelectedFilters.length) {
        setUsersToView(JSON.parse(localStorage.getItem('favoriteUsers')).filter(user => userSelectedFilters.includes(user?.location?.country)))
      } else {

        setUsersToView(JSON.parse(localStorage.getItem('favoriteUsers')))
      }

    } else {
      if (userSelectedFilters.length) {
        setUsersToView([...usersToView, ...users].filter(user => userSelectedFilters.includes(user?.location.country)))
      } else {
        setUsersToView([...usersToView, ...users])
      }

    }


  }, [userSelectedFilters, addedToFav, users]);



  const [favoriteUsers, setFavoriteUsers] = useState([])

  useEffect(() => {
    if (!localStorage.getItem('favoriteUsers')) {
      localStorage.setItem('favoriteUsers', JSON.stringify(favoriteUsers))
    }
    setFavoriteUsers(JSON.parse(localStorage.getItem('favoriteUsers')))
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('favoriteUsers', JSON.stringify(favoriteUsers))
  //   }, [favoriteUsers]);

  //   const loadedTodos = localStorage.getItem("favoriteUsers")
  // ? JSON.parse(localStorage.getItem("favoriteUsers"))
  // : []; // new

  const favoriteUserHandler = (userUid) => {

    if (!localStorage.getItem('favoriteUsers')) {
      localStorage.setItem('favoriteUsers', JSON.stringify(favoriteUsers))
    }

    let savedFavUsers = JSON.parse(localStorage.getItem('favoriteUsers'));

    // let ab = savedFavUsers.find(user=>user?.login?.uuid === userUid?.login?.uuid);
    if (savedFavUsers.find(user => user?.login?.uuid == userUid?.login?.uuid)) {
      let filterUser = savedFavUsers.filter(user => user?.login?.uuid !== userUid?.login?.uuid);
      localStorage.setItem('favoriteUsers', JSON.stringify(filterUser))
      setFavoriteUsers(filterUser)
    } else {
      localStorage.setItem('favoriteUsers', JSON.stringify([...favoriteUsers, userUid]))
      setFavoriteUsers([...favoriteUsers, userUid])
    }
    setAddedToFav(addedToFav + 1)
  }

  const filters = [{ value: 'BR', label: "Brazil" }, { value: 'AU', label: "Australia" }, { value: 'CA', label: "Canada" }, { value: 'DE', label: "Germany" },{value:'FR',label:"France"}]
  return (
    <S.UserList>
      {JSON.stringify(usersToView.length)}
      <S.Filters>
        {filters.map(filter =>
          (<CheckBox 
            value={filter.value}
            label={filter.label}
            userSelectedFilters={userSelectedFilters}
            setUserSelectedFilters={setUserSelectedFilters} 
          />)
        )}
      </S.Filters>
      <S.List>
        {/* {JSON.stringify(usersToView[0]?.login?.uuid)} */}
        <h3> Please select filter from above</h3>

        {usersToView.map((user, index) => {
          if (index + 1 != usersToView.length) {
            return (
              <UserCard
                key={index}
                userDetails={user}
                isFavoriteUser={(favoriteUsers.find(favUser => favUser?.login?.uuid == user?.login?.uuid))}
                addTofavoritesHandler={favoriteUserHandler} />
            )
          } else {
            return (
              <UserCard
                key={index}
                userDetails={user}
                ref={lastUserElementRef}
                isFavoriteUser={(favoriteUsers.find(favUser => favUser?.login?.uuid == user?.login?.uuid))}
                addTofavoritesHandler={favoriteUserHandler} />
            )
          }
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
