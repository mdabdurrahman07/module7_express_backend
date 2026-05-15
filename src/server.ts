import app from "./app";
import config from "./config/env.config";
import { initDB } from "./db/db";
const port = config.PORT;
export const main = () =>{
  // Calling the dataBase
initDB();
  // port is listening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
}

main()