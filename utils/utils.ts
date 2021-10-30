import axios from 'axios';
import Cookies from 'js-cookie';
import toastr from 'toastr';
import 'toastr/build/toastr.css'
import Swal from 'sweetalert2';

const baseURL = process.env.NODE_ENV === 'development' ? "http://localhost:5000" : "https://mediaplus-server.herokuapp.com";

export const http = axios.create({
    baseURL,
    headers:{
        Authorization: `Bearer ${Cookies.get('token')}`
    }
});

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};


export const Alert = () => (
  Swal.fire({
    title: "Update Information",
    text: "Are you sure you want to save these changes?",
    icon: "warning",
    cancelButtonText: "CANCEL",
    cancelButtonColor: "red",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "UPDATE",
    confirmButtonColor: "green",
  })
);
export const DeleteAlert = () => (
  Swal.fire({
    title: "Delete Record",
    text: "Are you sure you want to delete this record?",
    icon: "warning",
    cancelButtonText: "CANCEL",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "DELETE",
    confirmButtonColor: "red",
  })
);

export const LogOut = () => (
  Swal.fire({
    title: "Sign Out",
    text: "Are you sure you want to sign out?",
    icon: "warning",
    cancelButtonText: "CANCEL",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "Sign out",
    confirmButtonColor: "red",
  })
);
  
export default toastr;