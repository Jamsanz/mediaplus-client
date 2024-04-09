import axios from "axios";
import Cookies from "js-cookie";
import toastr from "toastr";
import "toastr/build/toastr.css";
import Swal from "sweetalert2";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://mediaplus-server.onrender.com/";

    
export const http = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

export const Alert = () =>
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
  });
export const DeleteAlert = () =>
  Swal.fire({
    title: "Delete Record",
    text: "Are you sure you want to delete this record?",
    icon: "warning",
    cancelButtonText: "CANCEL",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "DELETE",
    confirmButtonColor: "red",
  });

export const LogOut = () =>
  Swal.fire({
    title: "Sign Out",
    text: "Are you sure you want to sign out?",
    icon: "warning",
    cancelButtonText: "CANCEL",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "Sign out",
    confirmButtonColor: "red",
  });

export const data = [
  {
    name: "Ibrahim Jimoh, Ph.D. (C.E.O)",
    description: `is a lecturer with the Department of Mass Communication, Ahmadu
        Bello University, Zaria, Nigeria. He was educated at Bishop Johnson Primary School and
        Uhriapele Mixed Secondary School, Sapele, Delta State. He holds B.Sc., M.Sc. and Ph.D.
        degrees in Mass Communication from the Ahmadu Bello University (ABU), Zaria and Bayero
        University, Kano (BUK) respectively. He is of Print Media stream with key interest in Media
        Management, Development Communication, Health Communication and Media Research and
        Theories, PR and Advertising including Online and Social Media. He is married and blessed 
        with
        children. He is a member of the National Risk Communication Technical Working Group
        (NRCTWG) of the Nigeria Centre for Disease Control (NCDC). He has worked with many
        institutions on social research like the Nigeria Institute for Policy and Strategic Studies 
        (NIPSS),
        Action Aid Nigeria, Measure Evaluation, Ministry of Health etc.`,
    img: "/images/ibrahim_jimoh.jpg",
    alt: "@Media+ CEO",
  },
  {
    name: "Kabiru Danladi (Partner)",
    description: `is a lecturer with the Department of Mass Communication, Ahmadu Bello
        University, Zaria, Nigeria. He was at Lawanti Primary School and Government Arts Secondary
        School, Gombe State. He holds B.Sc. and M.Sc. degrees in Mass Communication from the
        Ahmadu Bello University (ABU), Zaria and now at 4 th year of PhD studies at Bayero 
        University,
        Kano (BUK) respectively. He is of Social Media stream with key interest in Activism, Social
        Protest, Political Communication, Media Research and Theories, including social media PR and
        Advertising. He is married and blessed with children. He is a member of the African 
        Council of
        Communication Education. He has worked with many institutions on social research like the
        Nigeria Broadcasting Commission, Centre for Information Technology Development, and
        participated in social media political communication trainings.`,
    img: "/images/2.jpg",
    alt: "@Media+ Managing Partner",
  },
  {
    name: "Hashim Mohammed Suleiman, PhD (Partner)",
    description: `lectures with Mass Communication Department, Ahmadu
        Bello University, Zaria. He is a holder of B. Sc and M. Sc Mass Communication (ABU, Zaria)
        and PhD Mass Communication, Bayero University, Kano. Hashim has a decade (+) experience
        of research and teaching in Media/Communication Research, Media/Communication Theory,
        Data Journalism, Online Journalism, Media Criticism/Media &amp; Gender Issues, Computer
        Assisted Journalism and Entrepreneurial Journalism at both under graduate and post graduate
        levels. His scholarly interest is on Post-Feminist Media/Communication research, 
        particularly
        how communication is used to socially construct and sustain misogyny and misandry at both
        micro and macro levels of mass communication. Hashim has conducted researches and published
        outcomes of his researches in many journals, conferences and book chapters. He has also
        attended many conferences and workshops on social scientific and communication research.`,
    img: "/images/3.jpg",
    alt: "@Media+ Managing Partner",
  },
];

export default toastr;
