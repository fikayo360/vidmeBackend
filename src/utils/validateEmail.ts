 const validateEmail = (email:string):boolean => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  
export default validateEmail