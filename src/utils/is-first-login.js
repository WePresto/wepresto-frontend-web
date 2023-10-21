const isFirstLogin = (createdAt) => {
    const createdAtDate = new Date(createdAt);
  
    const currentTime = new Date();
  
    const timeDifference = currentTime - createdAtDate;
  
    const lessThanThree = timeDifference < 3 * 60 * 1000;
  
    return lessThanThree;
  };

  export default isFirstLogin;