import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import {RootStackParamList} from '../../navigation/RootStackNavigator';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootBottomTabParamList} from '../../navigation/RootBottomTabNavigator';
import Header from '../../components/Header';
import RBSheet from 'react-native-raw-bottom-sheet';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import colors from '../../constants/colors';
import ShipmentItem from '../../components/ShipmentItem';
import Button from '../../components/Button';
import {SvgXml} from 'react-native-svg';
import {FILTER_SVG, SCAN_SVG} from '../../constants/svg';
import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {STATUSES} from '../../constants/data';
import SearchInput from '../../components/SearchInput';
import {UserContext} from '../../context/UserContext';
import _ from 'lodash';
import useFetchShipmentList, {
  MessageItem,
} from '../../hooks/useFetchShipmentList';
import {showMessage} from 'react-native-flash-message';

type ShipmentScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, 'Shipment'>,
  NativeStackScreenProps<RootStackParamList>
>;

const Shipment = ({navigation, route}: ShipmentScreenProps) => {
  const refRBSheet = useRef<any>(null);
  const [filters, setFilters] = useState<string[]>([]);
  const context = useContext(UserContext);
  const {data, error, fetchData, loading} = useFetchShipmentList({
    doctype: 'AWB',
    fields: ['*'],
  });
  const [searchText, setSearchText] = useState('');
  const [markAll, setMarkAll] = useState(false);

  useEffect(() => {
    if (error) {
      showMessage({
        type: 'danger',
        message: error,
        duration: 2000,
      });
    }
  }, [error]);

  const handleFilterUpdate = (item: string) => {
    let newfilters = [...filters];
    let word = newfilters.find(text => text == item);
    if (!word) {
      newfilters.push(item);
    } else {
      newfilters = newfilters.filter(text => text != item);
    }

    setFilters(newfilters);
  };

  const debouncedFetchSearchResults = useCallback(
    _.debounce(text => {
      fetchData({
        doctype: 'AWB',
        fields: ['*'],
        filters: {
          name: ['like', `%${text}%`],
        },
      });
    }, 500),
    [],
  );

  const handleSearchByName = (text: string) => {
    setSearchText(text);
    debouncedFetchSearchResults(text);
  };

  const keyExtractor = (item: MessageItem, index: number) => {
    return `${item.name}`;
  };

  const renderShipments: ListRenderItem<MessageItem> | null | undefined = ({
    item,
    index,
  }) => {
    return (
      <ShipmentItem
        status={index % 2 > 0 ? 'Received' : 'Canceled'}
        isChecked={markAll}
        originState={item.origin_state}
        originCity={item.origin_city}
        destinationCity={item.destination_city}
        destinationState={item.destination_state}
        name={item.name}
        style={{marginTop: 8}}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View style={styles.container}>
        <Text style={styles.welcomeTxt}>Hello,</Text>
        <Text style={styles.userName}>
          {context?.user?.full_name || 'Ibrahim Shaker'}
        </Text>

        <SearchInput
          style={styles.input}
          placeholder="Search by name"
          value={searchText}
          onChangeText={handleSearchByName}
        />

        <View style={styles.btnCtn}>
          <Button
            title="Filters"
            onPress={() => refRBSheet?.current?.open()}
            LeftIcon={<SvgXml xml={FILTER_SVG} />}
            titleStyle={[styles.actionBtnTxt, {color: '#58536E'}]}
            containerStyle={{flex: 1, maxWidth: 173.5}}
            style={{height: 44, backgroundColor: '#F4F2F8'}}
          />
          <Button
            title="Add Scan"
            titleStyle={styles.actionBtnTxt}
            LeftIcon={<SvgXml xml={SCAN_SVG} />}
            containerStyle={{flex: 1, maxWidth: 173.5, marginLeft: 14}}
            style={{height: 44}}
          />
        </View>

        <View style={styles.listTitleCtn}>
          <Text style={styles.listTitle}>Shipments</Text>

          <View style={styles.listCheckCtn}>
            <BouncyCheckbox
              size={20}
              isChecked={markAll}
              onPress={(check: boolean) => {
                setMarkAll(check);
              }}
              fillColor={'#D9E6FD'}
              unFillColor="transparent"
              iconImageStyle={{tintColor: colors.primary}}
              style={{width: 20, height: 20}}
              iconStyle={{borderRadius: 5}}
              innerIconStyle={{borderColor: '#D0D5DD', borderRadius: 5}}
              useNativeDriver
            />
            <Text style={styles.listCheckActionText}>Mark All</Text>
          </View>
        </View>

        <FlatList
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          data={data?.message || []}
          refreshControl={
            <RefreshControl
              tintColor={colors.primary}
              refreshing={loading}
              onRefresh={() => {
                fetchData({
                  doctype: 'AWB',
                  fields: ['*'],
                });
              }}
            />
          }
          renderItem={renderShipments}
        />

        <RBSheet
          ref={refRBSheet}
          onOpen={() => {}}
          draggable
          customStyles={{
            wrapper: styles.bottomSheetWraper,
            container: styles.bottomSheetCtn,
            draggableIcon: styles.bottomSheetDraggableIcon,
          }}
          customModalProps={{
            animationType: 'slide',
            statusBarTranslucent: true,
          }}
          customAvoidingViewProps={{
            enabled: false,
          }}>
          <View style={styles.bottomSheetHeader}>
            <TouchableOpacity onPress={() => refRBSheet?.current?.close()}>
              <Text style={styles.bottomSheetHeaderCloseBtn}>Cancel</Text>
            </TouchableOpacity>

            <Text style={styles.bottomSheetHeaderTitle}>Filters</Text>

            <TouchableOpacity onPress={() => refRBSheet?.current?.close()}>
              <Text style={styles.bottomSheetHeaderCloseBtn}>Done</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomSheetBody}>
            <Text style={styles.bottomSheetBodyTitle}>SHIPMENT STATUS</Text>
            <View style={styles.statusFilterCtn}>
              {STATUSES.map(item => {
                let exist = filters.find(text => text == item);
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={item}
                    onPress={() => handleFilterUpdate(item)}>
                    <View
                      key={item}
                      style={[
                        styles.status,
                        exist && {borderWidth: 2, borderColor: colors.primary},
                      ]}>
                      <Text
                        style={[
                          styles.statusText,
                          exist && {color: colors.primary},
                        ]}>
                        {item}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </RBSheet>
      </View>
    </SafeAreaView>
  );
};

export default Shipment;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    maxWidth: 800,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  welcomeTxt: {
    fontFamily: 'Inter-Regular',
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    letterSpacing: 0,
  },
  userName: {
    marginTop: 8,
    fontFamily: 'SF-Pro-Display-Semibold',
    color: 'black',
    fontSize: 28,
    letterSpacing: 0,
  },
  input: {
    marginTop: 24,
  },
  btnCtn: {
    marginTop: 24,
    width: '100%',
    flexDirection: 'row',
    maxWidth: 361,
  },
  actionBtnTxt: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    letterSpacing: 0,
  },
  listTitleCtn: {
    marginTop: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listTitle: {
    marginRight: 8,
    fontFamily: 'SF-Pro-Display-Semibold',
    color: 'black',
    fontSize: 22,
    letterSpacing: 0,
  },
  listCheckCtn: {
    flexDirection: 'row',
    // borderWidth: 2,
    // borderColor: 'green',
    alignItems: 'center',
  },
  listCheckActionText: {
    color: colors.primary,
    fontSize: 18,
    marginLeft: 8,
    fontFamily: 'SF-Pro-Display-Regular',
  },
  bottomSheetWraper: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bottomSheetCtn: {
    borderTopLeftRadius: 20,
    minHeight: 320,
    borderTopRightRadius: 20,
    paddingBottom: 50,
  },
  bottomSheetDraggableIcon: {
    backgroundColor: '#A7A3B3',
  },
  bottomSheetHeader: {
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderColor: '#EAE7F2',
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 20,
  },
  bottomSheetHeaderCloseBtn: {
    color: colors.primary,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: 0,
  },
  bottomSheetHeaderTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'black',
    lineHeight: 26,
    letterSpacing: 0,
  },
  bottomSheetBody: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  bottomSheetBodyTitle: {
    color: '#58536E',
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    lineHeight: 26,
    letterSpacing: 0,
  },
  statusFilterCtn: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  status: {
    backgroundColor: '#F4F2F8',
    borderRadius: 10,
    paddingVertical: 9,
    marginRight: 10,
    marginBottom: 10,
    paddingHorizontal: 14,
    // borderWidth: 2,
  },
  statusText: {
    color: '#58536E',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    letterSpacing: 0,
  },
});
