



export const actions = {
    login: (data, payload) => {
      return { type: types.LOGIN, payload };
    },
    logout:()=> {
      return { type: types.LOGOUT };
    },
   
  };