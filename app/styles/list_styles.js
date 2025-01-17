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
  inputText: {
    fontSize: 16,
    color: 'black',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
  listItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default stylesList;
