import { useEffect, useState } from "react";

// this is the final weather shape we want to show in the UI
type WeatherData = {
	temperature: number;
	condition: string;
	dateLabel: string;
};

// open-mateo returns numeric weather codes, so this helper translates those
// codes into labels people can read
const getWeatherLabel = (weatherCode: number, isDay: number) => {
	if (weatherCode === 0) {
		return isDay ? "Sunny" : "Clear Night";
	}

	if ([1, 2, 3].includes(weatherCode)) {
		return "Partly Cloudy";
	}

	if ([45, 48].includes(weatherCode)) {
		return "Floody";
	}

	if ([51, 53, 55, 56, 57].includes(weatherCode)) {
		return "Drizzly";
	}

	if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
		return "Rainy";
	}

	if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
		return "Snowy";
	}

	if ([95, 96, 99].includes(weatherCode)) {
		return "Stormy";
	}

	return "Cloudy";
};

const WeatherAPI = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [weather, setWeather] = useState<WeatherData | null>(null);

	useEffect(() => {

    // this protects against setting state after the component unmounts
		let isMounted = true;

    // error case if the browser does not suppoer geolocation
		if (!navigator.geolocation) {
			setError("Geolocation is not supported by your browser. Please change into something like Google Chrome");
			setLoading(false);
			return;
		}

    // asks the browser for the user's current location
		navigator.geolocation.getCurrentPosition(
			async (position) => {
				try {

          // pulls latitue and longitude from the browser response
					const { latitude, longitude } = position.coords;

          // this is how we request the current data depending on the latitude
          // and longitude from Open-Meteo
					const res = await fetch(
						`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,is_day&temperature_unit=fahrenheit&timezone=auto`,
					);

					if (!res.ok) {
						throw new Error("Failed to fetch weather.");
					}

					const json = await res.json();
					const current = json.current;

          // build a friendly date label for the dashboard
					const dateLabel = new Intl.DateTimeFormat("en-US", {
						weekday: "long",
						month: "long",
						day: "numeric",
					}).format(new Date());

					if (!isMounted) return;

          // save the values the UI needs
					setWeather({
						temperature: Math.round(current.temperature_2m),
						condition: getWeatherLabel(current.weather_code, current.is_day),
						dateLabel,
					});
					setLoading(false);
				} catch (error) {
					if (!isMounted) return;
					setError("Couln't load weather right now");
					setLoading(false);
				}
			},
			() => {
        // runs if the user denies the location access
				if (!isMounted) return;
				setError("Location access is needed to show local weather.");
				setLoading(false);
			},
		);

    // cleanup when the component is removed from the page
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className="weather-api glass-panel">
			{loading ? (
				<p>Loading weather...</p>
			) : error ? (
				<p>{error}</p>
			) : weather ? (
				<div>
          <p>{weather.temperature}°F</p>
          <p>{weather.condition}</p>
          <p>{weather.dateLabel}</p>
				</div>
			) : null}
		</div>
	);
};

export default WeatherAPI;
