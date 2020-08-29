import React, { createContext, useReducer } from 'react'

const initialState = { 
  husbandName: '', spouseName: '', expectingGender: '', actualGender: '',
  isVideoRecorded: false, videoContent: undefined, videoURL: undefined
};
const StoreUserDataContext = createContext(initialState);

let reducer = (state, action) => {
  if(action.type === "POST_USER_DATA") {
      return { ...action.payload };
  }
  return {...state}
};

function StoreUserDataProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreUserDataContext.Provider value={{ userGlobalData: state, storeUserGlobalData: dispatch }}>
      {props.children}
    </StoreUserDataContext.Provider>
  );
}
export { StoreUserDataContext, StoreUserDataProvider };