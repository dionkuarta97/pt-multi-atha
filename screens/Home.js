import React, { useCallback, useState } from "react";
import { Box, Button, Heading, ScrollView, VStack, Input, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds } from "../store/actions";
import { useFocusEffect } from "@react-navigation/native";
import { RefreshControl } from "react-native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function Home({ navigation }) {
  const dispatch = useDispatch();
  const { breeds } = useSelector((state) => state);
  const [slice, setSlice] = useState(10);
  const [key, setKey] = useState("");
  const [search, setSearch] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000)
      .then(() => setSlice(10))
      .then(() => setSearch([]))
      .then(() => setRefreshing(false));
  }, []);

  const searching = (keyword, arr) => {
    let query = keyword.toLowerCase();
    return arr.filter((item) => item.toLowerCase().indexOf(query) >= 0);
  };

  const handleChange = (e) => {
    if (e === "") {
      setKey("");
      setSearch([]);
    } else {
      setKey(e);
      setSearch(searching(key, breeds));
    }
  };

  function handleInfinityScroll(e) {
    let mHeight = e.nativeEvent.layoutMeasurement.height;
    let cSize = e.nativeEvent.contentSize.height;
    let Y = e.nativeEvent.contentOffset.y;
    if (Math.ceil(mHeight + Y) >= cSize) return true;
    return false;
  }

  useFocusEffect(
    useCallback(() => {
      dispatch(getBreeds());
      setSearch([]);
      setSlice(10);
      setKey("");
    }, [])
  );

  const handleSearch = (val) => {
    navigation.navigate("Detail", {
      breed: val,
    });
  };

  const goToDetail = (val) => {
    navigation.navigate("Detail", {
      breed: val,
    });
  };

  return (
    <>
      <Input
        value={key}
        onChangeText={handleChange}
        bg="purple.50"
        borderWidth="1"
        borderColor="amber.900"
        mt="3"
        mx="3"
        placeholder="keyword"
        w={{
          base: "95%",
          md: "25%",
        }}
      />
      {search.length > 0 ? (
        <Box mr={3} ml={3} bg="primary.50" p="3">
          {search?.map((el) => (
            <Button variant="outline" colorScheme="dark" onPress={() => handleSearch(el)}>
              {el}
            </Button>
          ))}
        </Box>
      ) : (
        <></>
      )}

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onScroll={(e) => {
          if (handleInfinityScroll(e)) {
            if (slice < breeds?.length) {
              setSlice(slice + 10);
            }
          }
        }}
      >
        <Box bg="primary.100" p="2" mt={10} marginLeft={3} marginRight={3} borderRadius={10}>
          <Heading>List All Breeds </Heading>
        </Box>

        <VStack mt={10} mb={20} space={2}>
          {breeds?.slice(0, slice).map((el) => (
            <Box borderWidth="1" p="3" marginLeft={3} marginRight={3} borderRadius={10}>
              <Heading>{el}</Heading>
              <Button onPress={() => goToDetail(el)} borderRadius={10} mt={2}>
                Detail Breed
              </Button>
            </Box>
          ))}
        </VStack>
      </ScrollView>
    </>
  );
}

export default Home;
