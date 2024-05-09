import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const cors = require("cors");
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
app.use(cors);

//https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=b9f792786ad37f486cf4a129f6e0d8c6


const getLocation = async (City: string, Country: string) => {
  const response1 = await fetch(
    `https://api.api-ninjas.com/v1/geocoding?city=${City}&country=${Country}&appid=${API_KEY}`
  );
  const LocationData = await response1.json().catch((e) => "error");

  return LocationData;
};
//TODO: send 2 variables to the function, and use them in the api call (lat and lon)
const getWeather = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  const weatherData = await response.json().catch((e) => "error");

  return weatherData;
};

//todo: make sure the client sees the json like we see it in the terminal
app.get("/", async (req: Request, res: Response) => {
  const data = await getWeather(44.34, 10.9);

  res.send(data);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
