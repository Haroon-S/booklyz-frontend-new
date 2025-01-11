export const viewModalReducer = (state, action) => {
  switch (action.type) {
    case 'modal':
      return { ...state, isViewModalOpen: action.payload };

    case 'viewFile':
      return { selectedFile: action.payload, isViewModalOpen: true };

    default:
      return state;
  }
};

export const test = '';
