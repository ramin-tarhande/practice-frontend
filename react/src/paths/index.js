
function adjustPath(s){
    return `${process.env.PUBLIC_URL}${s}`;
  }
  
  const Paths={
    home:adjustPath('/'),
    login:adjustPath('/login'),
    profile:adjustPath('/profile'),
    about:adjustPath('/about'),
    contactus:adjustPath('/contactus')
  };
  
export { adjustPath,Paths };