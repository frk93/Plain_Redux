console.clear();

// Action creators

const createPolicy = (name, amount) => {
  return {
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: amount
    }
  };
};

const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name
    }
  };
};

const createClaim = (name, amountToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amountToCollect: amountToCollect
    }
  };
};

// Reducers

const claimHistory = (oldList = [] , action) => {
  if(action.type === 'CREATE_CLAIM'){
    return [...oldList, action.payload]
  }
  
  return oldList;
};

const accounting = (MoneyBag = 100, action) => {
  if(action.type === 'CREATE_CLAIM'){
    return MoneyBag - action.payload.amountToCollect;
  } else if(action.type === 'CREATE_POLICY'){
    return MoneyBag + action.payload.amount;
  }
  
  return MoneyBag;
};

const Policy = (policyList = [] , action) => {
  if(action.type === 'CREATE_POLICY'){
    return [...policyList, action.payload.name]
  } else if (action.type === 'DELETE_POLICY'){
    return policyList.filter(name => name !== action.payload.name);
  };
  return policyList;
}

const { createStore , combineReducers } = Redux;

const ourDept = combineReducers({
  claimHistory,
  accounting,
  Policy
});

const store = createStore(ourDept);

store.dispatch(createPolicy('Farrukh',20))
store.dispatch(createClaim('Shahrukh',50))
store.dispatch(createClaim('Mustafa',10))

store.dispatch(deletePolicy('Farrukh'))

console.log(store.getState());
