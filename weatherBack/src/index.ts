import { City } from './App.tsx';
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const cors = require("cors");
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const LOCATION_API_KEY = process.env.LOCATION_API_KEY;

app.use(cors()); // Enable CORS

const getLocation = async (city: string, country: string) => {
  const response1 = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${WEATHER_API_KEY}`
  );
  const LocationData = await response1.json().catch((e) => "error");

  return LocationData;
};

const getWeather = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  );
  const weatherData = await response.json().catch((e) => "error");

  return weatherData;
};

app.get("/", async (req: Request, res: Response) => {
  const city = req.query.city as string;
  const country = req.query.country as string;
  if (!city || !country) {
    return res.status(400).json({ error: "City and country are required" });
  }
  const locationData = await getLocation(city, country);
  if (locationData === "error" || !locationData.length) {
    return res.status(500).json({ error: "Error fetching location data" });
  }
  const data = await getWeather(locationData[0].lat, locationData[0].lon);
  res.json(data); // Send JSON response
});

app.get("/weather", async (req: Request, res: Response) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }
  const data = await getWeather(
    parseFloat(lat as string),
    parseFloat(lon as string)
  );
  res.json(data); // Send JSON response
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
