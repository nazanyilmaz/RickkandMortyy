import React, { useState, useEffect } from "react";
import { useCharacterStore } from "../states/characterState";
import { useQuery } from "@tanstack/react-query";
import AntDesign from "@expo/vector-icons/AntDesign";
import { fetchCharacters } from "../states/api";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";

interface Character {
  id: number;
  name: string;
  image: string;
  episode: string[];
}

const SearchComponent = () => {
  const {
    selectedCharacters,
    query,
    setQuery,
    toggleCharacter,
    removeCharacter,
  } = useCharacterStore();

  const { data, error, isLoading } = useQuery<{ results: Character[] }>({
    queryKey: ["characters", query],
    queryFn: () => fetchCharacters(query), // fetchCharacters fonksiyonunu kullandık
    enabled: !!query,
  });

  const highlightQuery = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <Text>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <Text key={index} style={{ fontWeight: "bold" }}>
              {part}
            </Text>
          ) : (
            part
          )
        )}
      </Text>
    );
  };

  return (
    <SafeAreaView className="flex-1 p-5 justify-center mt-5 ">
      <View className=" p-2 m-3 border-2 border-gray-400 mb-2  mt-20 px-2 rounded-2xl flex-row">
        <View className=" gap-1  max-w-[80%] flex-row max-h-[30%] flex-wrap ">
          {selectedCharacters?.map((item) => {
            return (
              <View
                key={item}
                className="bg-gray-300 p-3 flex-row rounded-xl items-center gap-1 mx-2 mb-1"
              >
                <Text className="text-md font-semibold text-gray-600">
                  {item}
                </Text>
                <Pressable
                  className="w-7 h-7 rounded-lg bg-gray-400"
                  onPress={() => removeCharacter(item)}
                >
                  <Text className=" text-white  pb-1 font-semibold text-lg text-center">
                    X
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
        <TextInput
          className="flex-1 font-bold ms-2 text-gray-600 "
          value={query}
          onChangeText={setQuery}
          placeholder="Search characters..."
        />
        <TouchableOpacity>
          <AntDesign name="caretdown" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <View>
        {isLoading && <Text className=" my-6">Loading...</Text>}
        {error && <Text>Error: {error.message}</Text>}
        <View className=" border-2 border-gray-400 m-2 rounded-2xl max-h-[90%]">
          <FlatList
            key={new Date().getDate()}
            data={data?.results}
            renderItem={({ item }) => (
              <View>
                <View className="flex-row items-center border-b-2 border-b-gray-300 py-1 mx-1 mt-2">
                  <TouchableOpacity
                    className="me-2 "
                    onPress={() => toggleCharacter(item.name)}
                    key={item.id}
                  >
                    <View
                      className={` w-5 h-5 rounded-sm border border-gray-400 justify-center items-center mx-2
                  ${selectedCharacters.includes(item.name) && "bg-blue-600"}
                  `}
                    >
                      {selectedCharacters.includes(item.name) && (
                        <Text className="text-white font-bold text-sm">✓</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                  <Image
                    source={{ uri: item?.image }}
                    className=" w-20 h-20 me-3 my-2 rounded-lg"
                  />
                  <View className="flex-1 text-lg">
                    <Text className="text-xl text-gray-700">
                      {highlightQuery(item?.name, query)}
                    </Text>
                    <Text className="text-lg text-gray-500">
                      {item?.episode?.length} Episodes
                    </Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SearchComponent;
