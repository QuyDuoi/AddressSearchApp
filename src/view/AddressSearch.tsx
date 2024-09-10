import React from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Linking, ActivityIndicator, Alert } from 'react-native';
import { useAddressViewModel } from '../viewmodel/AddressViewModel';
import { Address } from '../model/Address';
import { styles } from '../style/styleAddressSearch';
import Icon from 'react-native-vector-icons/FontAwesome';

function AddressSearch(): React.JSX.Element {
  const { query, setQuery, results, isLoading, clearQuery, userLocation } = useAddressViewModel();

  // Function to highlight search term in results
  const highlightText = (text: string, highlight: string): JSX.Element => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <Text>
        {parts.map((part, i) => (
          <Text key={i} style={part.toLowerCase() === highlight.toLowerCase() ? styles.highlight : {}}>
            {part}
          </Text>
        ))}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name={isLoading ? 'spinner' : 'search'} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Enter keyword"
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={clearQuery}>
            <Icon name="times" style={styles.clearIcon} />
          </TouchableOpacity>
        )}
      </View>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        data={results}
        keyExtractor={(item: Address) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Icon name="map-marker" style={styles.locationIcon} />
            <View style={styles.labelContainer}>
              {highlightText(item.label, query)}
            </View>
            <TouchableOpacity
              style={styles.navigateIconContainer}
              onPress={() => {
                if (userLocation) {
                  const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${item.latitude},${item.longitude}`;
                  Linking.openURL(url);
                } else {
                  Alert.alert('Location not available', 'Cannot fetch your current location.');
                }
              }}
            >
              <Icon name="location-arrow" style={styles.navigateIcon} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default AddressSearch;
