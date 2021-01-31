import { geoData } from "./geoData.js";

export function fakeData(callback) {
  setTimeout(() => {
    const data = [];

    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Updated to slow down and add more variety
    for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
      let score = randomNumber(0, 100);


      data.push({
        model: `Model_${randomNumber(0, 200)}`,
        score: score / 100,
        user: `User_${randomNumber(0, 100)}`,
        geodata: geoData[Math.floor(Math.random() * 51)]
      });
    }

    return callback(data);
  }, 3000);
}

// ORIGINAL FAKE DATA
// export function fakeData(callback) {
//   setTimeout(() => {
//     const data = [],
//       users = [
//         "User_1",
//         "User_2",
//         "User_3",
//         "User_4",
//         "User_5",
//         "User_6",
//         "User_7",
//         "User_8",
//         "User_9",
//         "User_10",
//         "User_11",
//         "User_12",
//         "User_13",
//         "User_14",
//         "User_15",
//         "User_16",
//         "User_17",
//         "User_18",
//         "User_19",
//         "User_20",
//       ],
//       models = [
//         "Model_1",
//         "Model_2",
//         "Model_3",
//         "Model_4",
//         "Model_5",
//         "Model_6",
//         "Model_7",
//         "Model_8",
//         "Model_9",
//         "Model_10",
//         "Model_11",
//         "Model_12",
//         "Model_13",
//         "Model_14",
//         "Model_15",
//         "Model_16",
//         "Model_17",
//         "Model_18",
//         "Model_19",
//         "Model_20",
//       ];

//     function randomNumber(min, max) {
//       return Math.floor(Math.random() * (max - min + 1)) + min;
//     }

//     // for (let i = 0; i < 100; i++) {
//     for (let i = 0; i < 10; i++) {
//       let score = randomNumber(0, 100),
//         userIndex = randomNumber(0, 19),
//         modelIndex = randomNumber(0, 19);

//       data.push({
//         model: models[modelIndex],
//         score: score / 100,
//         user: users[userIndex],
//       });
//     }

//     return callback(data);
//   }, 1000);
// };
