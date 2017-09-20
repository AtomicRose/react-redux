import getDocList from 'ACTION/Document/getDocList';
const DocList = {
  initialState: {
    list: [6, 7]
  },
  reducers: {
    [getDocList]: function (state, payload) {
      return Object.assign({}, state, { list: payload.list });
    }
  }
};
export default DocList;