import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Button from "./components/Button";
import CircleButton from "./components/CircleButton";
import EmojiList from "./components/EmojiList";
import EmojiPicker from "./components/EmojiPicker";
import IconButton from "./components/IconButton";
import ImageViewer from "./components/ImageViewer";
import { styles } from "./styles";

const PlaceHolderImage = require("./assets/images/background-image.png");

export default function App() {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [image, setImage] = useState(null);
  const [pickedEmoji, setPickedEmoji] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    if (status === null) {
      requestPermission()
    }
  }, [])

  const onReset = () => {
    setShowAppOptions(false);
    setPickedEmoji(null);
  }

  const onAddSticker = () => {
    setIsModalVisible(true)
  };

  const onModalClose = () => {
    setIsModalVisible(false)
  }

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      alert(`Oops!, error: ${e}`)
    }
  };

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 1, });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("An error have ocurred!");
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ImageViewer 
        referenceView={imageRef}
        placeHolderImageSource={PlaceHolderImage}
        selectedImage={image}
        pickedEmoji={pickedEmoji}
      />
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon={'refresh'} label={'Reset'} pressFn={onReset} />
            <CircleButton pressFn={onAddSticker} />
            <IconButton icon={'save-alt'} label={'Save'} pressFn={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label={"Choose a photo"}
            pressFn={pickImageAsync}
          />
          <Button
            label={"Use this photo"}
            pressFn={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker onClose={onModalClose} isVisible={isModalVisible}>
        <EmojiList onCloseModal={onModalClose} onSelect={setPickedEmoji} />
      </EmojiPicker>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}
