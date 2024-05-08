import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY

//https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=b9f792786ad37f486cf4a129f6e0d8c6

//TODO: send 2 variables to the function, and use them in the api call (lat and lon)
const getWeather  = async (lat: number, lon: number) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);

  const data = await response.json()
  console.log(data)
   return data;
}

//todo: make sure the client sees the json like we see it in the terminal
app.get("/", (req: Request, res: Response) => {
  res.send("Express + waadwadd sdsd\n" + getWeather(44.34, 10.9));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});