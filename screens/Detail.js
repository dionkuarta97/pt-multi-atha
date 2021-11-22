import React, { useCallback } from "react";
import { Heading, Text, Box, VStack, Button, ScrollView } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/core";
import { getBreed } from "../store/actions";

function Detail(props) {
  const dispatch = useDispatch();
  const { route, navigation } = props;
  const { breed: key } = route.params;
  const { breed } = useSelector((state) => state);

  useFocusEffect(
    useCallback(() => {
      dispatch(getBreed(key));
    }, [])
  );

  const goToImages = (val) => {
    navigation.navigate("Images", {
      breed: val,
    });
  };

  return (
    <>
      <ScrollView>
        {breed?.length === 0 ? (
          <Box bg="primary.100" p="2" mt={10} marginLeft={3} marginRight={3} borderRadius={10}>
            <Heading>Sub Breed Not Found</Heading>
          </Box>
        ) : (
          <>
            <Box bg="primary.100" p="2" mt={10} mb={5} marginLeft={3} marginRight={3} borderRadius={10}>
              <Heading>Sub Breed</Heading>
            </Box>
            <Button m={3} colorScheme="success" onPress={() => goToImages(key)} borderRadius={10} mt={2}>
              See Images
            </Button>
          </>
        )}

        <VStack mt={5} mb={20} space={2}>
          {breed?.map((el) => (
            <Box borderWidth="1" p="3" marginLeft={3} marginRight={3} borderRadius={10}>
              <Heading>{el}</Heading>
            </Box>
          ))}
        </VStack>
      </ScrollView>
    </>
  );
}

export default Detail;
