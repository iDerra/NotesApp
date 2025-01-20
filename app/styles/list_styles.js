import { StyleSheet } from 'react-native';

const stylesList = StyleSheet.create({
  listItem: {
    fontSize: 16,
    marginTop: 5,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonList: {
    backgroundColor: '#00d68f',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 15,
  },
  listItemBullet: {
    width: 6,
    height: 6,
    backgroundColor: '#000',
    borderRadius: 4,
    marginRight: 10,
  },

  checkbox: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemText: {
      fontSize: 18,
      flex: 1,
  },
  inputItem: {
    flex: 1, 
    marginRight: 20,
    height: 40,
    borderColor: '#d1d1d1',
    borderWidth: 1,
    marginLeft: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
},
});

export default stylesList;
