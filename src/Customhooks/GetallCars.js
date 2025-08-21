
import { carApi } from "../Api";

const getCars = async (setCars) => {
  try {
    const { data } = await axios.get(carApi);
    setCars(data); // update state with fetched data
  } catch (err) {
    console.log(err);
    setCars([]); // fallback to empty array
  }
};

export default getCars;

// console.log(data)
