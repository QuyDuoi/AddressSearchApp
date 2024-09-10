import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 20,
    color: '#888',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 18,
  },
  clearIcon: {
    fontSize: 20,
    color: '#888',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  locationIcon: {
    fontSize: 20,
    color: '#888',
    marginRight: 10,
  },
  labelContainer: {
    flex: 1,
  },
  highlight: {
    backgroundColor: 'yellow',
  },
  navigateIconContainer: {
    padding: 5,
  },
  navigateIcon: {
    fontSize: 20,
    color: '#007AFF',
  },
});
