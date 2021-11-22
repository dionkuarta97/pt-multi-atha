import React, { useCallback, useState } from "react";
import { Box, Heading, ScrollView, VStack, Image, Center } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../store/actions";
import { useFocusEffect } from "@react-navigation/native";
import { RefreshControl } from "react-native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function ImagesSubBreed(props) {
  const dispatch = useDispatch();
  const { route } = props;
  const { breed } = route.params;
  const { images, loading } = useSelector((state) => state);
  const [slice, setSlice] = useState(10);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000)
      .then(() => setSlice(10))
      .then(() => setRefreshing(false));
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(getImages(breed));
    }, [])
  );

  function handleInfinityScroll(e) {
    let mHeight = e.nativeEvent.layoutMeasurement.height;
    let cSize = e.nativeEvent.contentSize.height;
    let Y = e.nativeEvent.contentOffset.y;
    if (Math.ceil(mHeight + Y) >= cSize) return true;
    return false;
  }

  if (loading) {
    return (
      <Center>
        <Heading>Loading ...</Heading>
      </Center>
    );
  }

  return (
    <>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onScroll={(e) => {
          if (handleInfinityScroll(e)) {
            if (slice < images?.length) {
              setSlice(slice + 10);
            }
          }
        }}
      >
        <Box bg="primary.100" p="2" mt={10} mb={5} marginLeft={3} marginRight={3} borderRadius={10}>
          <Heading>Images {breed}</Heading>
        </Box>
        <VStack mt={5} mb={20} space={2}>
          {images?.slice(0, slice).map((el) => (
            <Center flex={1} px="3">
              <Image
                borderRadius={20}
                source={{
                  uri: el,
                }}
                alt="Alternate Text"
                size="2xl"
              />
            </Center>
          ))}
        </VStack>
      </ScrollView>
    </>
  );
}

export default ImagesSubBreed;
