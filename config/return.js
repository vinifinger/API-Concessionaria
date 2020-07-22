module.exports = function objReturn({
    data = null,
    user = null
  }) {
    const obj = {
      user,
      data
    };
  
    return obj;
  };