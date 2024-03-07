export const carousalData = [
  {
    id: 1,
    imgUrl: require("@/assets/images/digi-logo.png"),
    price: 2345,
    cardType: "VISA",
    cardNumber: "****1234",
    backgroundColor: "#0f60d6",
    textColor: "white",
  },
  {
    id: 2,
    imgUrl: require("@/assets/images/digi-logo.png"),
    price: 4654,
    cardType: "MasterCard",
    cardNumber: "****5678",
    backgroundColor: "purple",
    textColor: "white",
  },
  {
    id: 3,
    imgUrl: require("@/assets/images/digi-logo.png"),
    price: 3300,
    cardType: "Stripe",
    cardNumber: "****9876",
    backgroundColor: "#55a630",
    textColor: "white",
  },
  {
    id: 4,
    imgUrl: require("@/assets/images/digi-logo.png"),
    price: 1700,
    cardType: "Discover",
    cardNumber: "****5432",
    backgroundColor: "gray",
    textColor: "#ea468e",
  },

  // Add more items as needed
];

export const transactionData = [
  {
    id: 1,
    name: "Netflix",
    type: "Subscription",
    amount: "KES99.00",
    date: "12 March 2024",
    imageSource: require("@/assets/images/netflix.png"),
  },
  {
    id: 2,
    name: "Amazon",
    type: "ShippingOrder",
    amount: "KES12.99",
    date: "15 March 2024",
    imageSource: require("@/assets/images/amazon.png"),
  },
  {
    id: 3,
    name: "Spotify",
    type: "Subscription",
    amount: "KES279.99",
    date: "18 March 2024",
    imageSource: require("@/assets/images/spotify.png"),
  },
  {
    id: 4,
    name: "YouTube Premium",
    type: "Subscription",
    amount: "KES11.99",
    date: "20 March 2024",
    imageSource: require("@/assets/images/youtube.png"),
  },
  {
    id: 5,
    name: "Apple Storage",
    type: "Subscription",
    amount: "KES14.99",
    date: "22 March 2024",
    imageSource: require("@/assets/images/apple.png"),
  },
];

// Format the price property to be a string with dollar formatting
carousalData.forEach((item) => {
  item.price = item.price.toLocaleString("en-US", {
    style: "currency",
    currency: "KES",
  });
});
