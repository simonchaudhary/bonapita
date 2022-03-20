import axios from "axios";
import {baseURL} from "./baseURL";

const Axios = axios.create({
	baseURL: baseURL,
});

export default Axios;
