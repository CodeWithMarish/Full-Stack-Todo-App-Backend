const whiteList = ["http://localhost:3000", undefined];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1) callback(null, true);
    else callback(null, false);
  },
};

module.exports = corsOptions