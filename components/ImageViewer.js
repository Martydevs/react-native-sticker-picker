import { Image, View } from "react-native";
import EmojiSticker from "./EmojiSticker";
import { styles } from "../styles";

function ImageViewer({ placeHolderImageSource, selectedImage, referenceView, pickedEmoji }) {
  const imageSource = selectedImage ? { uri: selectedImage } : placeHolderImageSource

  return (
    <View style={styles.imageContainer}>
      <View ref={referenceView} collapsable={false}>
        <Image style={styles.image} source={imageSource} />
        {
          pickedEmoji ? (
            <EmojiSticker imageSize={58} stickerSource={pickedEmoji} />
          ) : null
        }
      </View>
    </View>
  );
};

export default ImageViewer