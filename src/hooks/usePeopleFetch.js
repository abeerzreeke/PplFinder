import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=${page}`);
    setIsLoading(false);
    setUsers(response.data.results);
  }
  
  async function fetchMoreUsers(){
    setPage(page+1)
    fetchUsers()
  }

  return { users, isLoading, fetchUsers,fetchMoreUsers };
};
