import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Linking, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { getSearch, SearchResult } from '../services/api';
import { Ionicons } from '@expo/vector-icons';

const IMAGE_MAX_H = 400;     // tune to your design
const FILTER_MAX_H = 48;     // height of the chip row
const HEADER_MAX_H = 120;
const COLLAPSE_DIST = 250;   // how much scroll to fully collapse

const PADDING_H = 20;
const CARD_MAX_H = 91; // tune
const CARD_BORDER_RADIUS = 16;
const SCREEN_W = Dimensions.get('window').width;
const CARD_MAX_W = SCREEN_W - PADDING_H * 2; // full-bleed minus padding

const PRE_OWNED_SITES = [
  "https://www.therealreal.com",
  "https://www.vestiairecollective.com",
  "https://www.rebag.com",
  "https://www.fashionphile.com",
  "https://www.grailed.com",
  "https://www.goat.com",
  "https://www.stockx.com",
  "https://www.depop.com",
  "https://poshmark.com",
  "https://www.thredup.com",
  "https://www.chairish.com",
  "https://www.1stdibs.com",
  "https://www.aptdeco.com",
  "https://www.kaiyo.com",
  "https://www.ebay.com",
  "https://www.facebook.com/marketplace",
  "https://www.mercari.com",
  "https://offerup.com",
  "https://www.craigslist.org",
  "https://www.vinted.com",
  "https://www.olx.com",
  "https://www.marktplaats.nl",
  "https://www.trademe.co.nz",
  "https://carousell.com",
  "https://www.yoopies.com",
  "https://www.rakuma.rakuten.co.jp",
  "https://fril.jp",
  "https://www.mercari.jp"
];

export default function ResultsScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Results'>) {
  const { searchId } = route.params;
  const [data, setData] = useState<SearchResult[]>([]);
  const [filteredData, setFilteredData] = useState<SearchResult[]>([]);
  const [headerImage, setHeaderImage] = useState<string | undefined>();
  const [activeFilter, setActiveFilter] = useState<'All' | 'New' | 'Pre-Owned'>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // useRef so the value persists across renders
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const res = await getSearch(searchId);
      console.log(res.results);

      // Remove duplicates based on normalized title
      setData(res.results);
      setHeaderImage(res.original_cloudinary_url || (res.image_path.startsWith('http') ? res.image_path : undefined));
      setFilteredData(res.results);  // Set initial filtered data to all items
    })();
  }, [searchId]);


  const checkIfPreOwned = (link: string | undefined) => {
    if (!link) return false;

    // Check if the link belongs to one of the pre-owned sites
    return PRE_OWNED_SITES.some(site => link.includes(site));
  };

  const filterResults = (filter: 'All' | 'New' | 'Pre-Owned') => {
    let filtered = [...data];
    if (filter === 'Pre-Owned') {
      filtered = filtered.filter(item => checkIfPreOwned(item.link));
    } else if (filter === 'New') {
      filtered = filtered.filter(item => !checkIfPreOwned(item.link));
    }
    setFilteredData(filtered);
  };

  const sortResults = (order: 'asc' | 'desc') => {
    const sorted = [...filteredData].sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ''));
      const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ''));
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    });
    setFilteredData(sorted);
  };

  const handleSortToggle = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    sortResults(newSortOrder);
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, COLLAPSE_DIST],
    outputRange: [HEADER_MAX_H, 0],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, COLLAPSE_DIST],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const imageHeight = scrollY.interpolate({
    inputRange: [0, COLLAPSE_DIST],
    outputRange: [IMAGE_MAX_H, 0],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, COLLAPSE_DIST],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const filterHeight = scrollY.interpolate({
    inputRange: [0, COLLAPSE_DIST],
    outputRange: [FILTER_MAX_H, 0],
    extrapolate: 'clamp',
  });

  const filterOpacity = scrollY.interpolate({
    inputRange: [0, COLLAPSE_DIST],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false } // height can't use native driver
  );

  // When to start/finish the grow animation
  const CARD_GROW_START = COLLAPSE_DIST * 0.35;
  const CARD_GROW_END = COLLAPSE_DIST * 0.85;

  // A single progress value from 0 -> 1 over the chosen scroll window
  const cardProgress = scrollY.interpolate({
    inputRange: [CARD_GROW_START, CARD_GROW_END],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // Map progress to width/height/opacity/radius
  const cardWidth = cardProgress.interpolate({ inputRange: [0, 1], outputRange: [0, CARD_MAX_W] });
  const cardHeight = cardProgress.interpolate({ inputRange: [0, 1], outputRange: [0, CARD_MAX_H] });
  const cardOpacity = cardProgress.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
  const cardRadius = cardProgress.interpolate({ inputRange: [0, 1], outputRange: [0, CARD_BORDER_RADIUS] });

  const renderItem = ({ item }: { item: SearchResult }) => {
    return (
      <Pressable style={styles.card} onPress={() => item.link && Linking.openURL(item.link!)}>
        {item.image_url ? <Image source={{ uri: item.image_url }} style={styles.thumb} /> : null}
        <Text numberOfLines={2} style={styles.title}>{item.title || 'Item'}</Text>
        {item.price ? <Text style={styles.price}>{item.price}</Text> : null}
        {item.brand ? <Text style={styles.brand}>{item.brand}</Text> : null}
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      {/* Animated TOP CARD (grows in as you scroll) */}
      <Animated.View
        style={[styles.topCardWrapper, {
          width: cardWidth,
          height: cardHeight,
          opacity: cardOpacity,
          borderRadius: cardRadius,
        }]}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Pressable style={{ position: 'absolute', top: 0, left: 10 }} onPress={() => navigation.navigate('Uploads')}>
            <Ionicons name="arrow-back" size={18} color="black" />
          </Pressable>
          <Text style={{ marginBottom: 10, fontWeight: '600', fontSize: 14, fontFamily: 'EthicNew-Medium', color: 'rgba(0,0,0,0.6)' }}>
            {filteredData.length} Result{filteredData.length !== 1 ? 's' : ''}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', justifyContent: 'space-between' }}>
            {(['All', 'New', 'Pre-Owned'] as const).map(f => (
              <TouchableOpacity
                key={f}
                style={[styles.filterButton, activeFilter === f && styles.activeButton]}
                onPress={() => {
                  setActiveFilter(f);
                  filterResults(f);
                }}
                activeOpacity={0.8}
              >
                <Text style={[styles.buttonText, activeFilter === f && { color: '#fff' }]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Image source={{ uri: headerImage }} style={{ width: 74, height: 71, borderRadius: 16 }} resizeMode="cover" />
      </Animated.View>

      {/* Static top bar (kept) */}
      <Animated.View style={[styles.header, { height: headerHeight, opacity: headerOpacity, overflow: 'hidden' }]}>
        <Pressable style={{ position: 'absolute', left: 20, top: 60 }} onPress={() => navigation.navigate('Uploads')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text style={{ fontSize: 22, fontFamily: 'EthicNew-Medium', fontWeight: '600' }}>Results</Text>
        <Text style={{ fontWeight: '600', position: 'absolute', right: 20, top: 67, fontSize: 14, fontFamily: 'EthicNew-Medium', color: 'rgba(0,0,0,0.6)' }}>
          {filteredData.length} Result{filteredData.length !== 1 ? 's' : ''}
        </Text>
      </Animated.View>

      {/* Collapsing HEADER IMAGE */}
      {headerImage ? (
        <Animated.View style={{ height: imageHeight, opacity: imageOpacity, overflow: 'hidden' }}>
          <Image source={{ uri: headerImage }} style={styles.headerImage} resizeMode="cover" />
        </Animated.View>
      ) : null}

      {/* Collapsing FILTER BAR */}
      <Animated.View style={{ height: filterHeight, opacity: filterOpacity }}>
        <View style={styles.filterContainer}>
          {(['All', 'New', 'Pre-Owned'] as const).map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.filterButton, activeFilter === f && styles.activeButton]}
              onPress={() => {
                setActiveFilter(f);
                filterResults(f);
              }}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, activeFilter === f && { color: '#fff' }]}>{f}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.sortButton}  onPress={() => handleSortToggle()}>
            <Text style={styles.sortText}>Price</Text>
            <Ionicons name={sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'} size={18} color="black" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.FlatList
        contentContainerStyle={{ padding: 12 }}
        numColumns={2}
        data={filteredData}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
        columnWrapperStyle={{ gap: 12 }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        initialNumToRender={30}
        maxToRenderPerBatch={30}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { 
    paddingTop: 60,
    paddingHorizontal: 12,
    paddingBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,    
  },
  headerImage: { 
    width: '92%',
    height: '100%', // fill the Animated container height
    borderRadius: 24,
    borderWidth: 7,
    borderColor: '#fff',
    alignSelf: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 8,
    height: FILTER_MAX_H,
  },
  filterButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1
  },
  activeButton: {
    backgroundColor: '#000',
    borderColor: '#000',
    borderWidth: 1,
  },
  sortButton: {
    marginLeft: 'auto',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  sortText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'black',
    marginRight: 10
  },
  card: { width: '48%', backgroundColor: '#f8fafc', borderRadius: 12, padding: 8 },
  thumb: { width: '100%', height: 120, borderRadius: 8, marginBottom: 6, objectFit: 'cover' as any },
  title: { fontWeight: '600' },
  price: { color: '#111827', marginTop: 2 },
  brand: { color: '#6b7280' },
  condition: { fontSize: 12, color: '#999' },
  topCardWrapper: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: PADDING_H,
    top: 80,
    zIndex: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // ✅ shadow for Android
    elevation: 6,
  },
});
