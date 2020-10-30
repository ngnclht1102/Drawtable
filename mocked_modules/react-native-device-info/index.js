const module = {}

module.getVersion = () => {
  return "1.0.0";
};
module.getBuildNumber = () => {
  return "150";
};

module.hasNotch = () => {
  return false;
};

export default module;
