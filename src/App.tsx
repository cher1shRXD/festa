import { useEffect } from "react";
import { OpenApi } from "./api/openapi";

const App = () => {
  const fetchData = async () => {
    const { data } = await OpenApi.fetchData(1);
    console.log(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>App</div>
  )
}

export default App