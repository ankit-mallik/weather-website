const request = require("request");
const geocode = (address, callback) => {
  const geocodeUrl = `https://geocode.maps.co/search?q=${encodeURIComponent(
    address
  )}&api_key=665ec33349320374781445rpn7f8f3a`;
  request({ url: geocodeUrl, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (body.length === 0) {
      callback("Unable to find location, Try another search", undefined);
    } else {
      const data = body[0];
      callback(undefined, {
        latitude: data.lat,
        longitude: data.lon,
      });
    }
  });
};

module.exports = geocode;
