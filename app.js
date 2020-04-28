const axios = require("axios");
const sendAlert = require("./mail");

const CheckRingFit = async () => {
  try {
    const response = await axios.post(
      "https://dh94dkedtwoao.cloudfront.net/FulfilmentPlan/API/FulfilmentOptions",
      {
        LineItems: [{ SKU: "405713", Quantity: 1, LineItemFreightPrice: 1.99 }],
        Address: {
          Postcode: "2121",
          Coordinates: { Latitude: -33.7739, Longitude: 151.075 },
        },
      }
    );
    let storeAddress = [];
    validStore = response.data.CashAndCarry.Presentation[0];
    for (store of validStore) {
      distance = +store.Message.split("(")[1].split(" ")[0].split("k")[0];
      if (distance <= 30) {
        storeAddress.push(store.Message);
      }
    }
    return storeAddress;
  } catch (error) {
    (error) => console.log(error);
  }
};

setInterval(async () => {
  const validStoreAddress = await CheckRingFit();
  if (validStoreAddress.length > 0) {
    sendAlert(validStoreAddress.join("<br />"));
  }
}, 900000);
