const request = require("request");
const forecast = (lat, lon, callback) => {
  const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=119f05d8b61b400eab777b567f4d7958`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback(`Unable to find location`);
    } else {
      const arr = body.data[0];
      callback(
        undefined,
        `On ${arr.city_name} it is currently ${arr.temp}℃  and sky is ${arr.weather.description}`
      );
    }
  });
};

module.exports = forecast;
