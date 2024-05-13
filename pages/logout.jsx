import { useDispatch } from 'react-redux';

export default function Logout(){
    const dispatch = useDispatch();
    localStorage.removeItem('user');
    dispatch({type: "LOGOUT"});
    window.location.href='/login';
}