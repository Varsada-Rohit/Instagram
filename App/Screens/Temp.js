import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

function Temp() {
  const [left, setLeft] = useState(0);
  let lastmovex = 0;
  const onMove = (event) => {
    if (event.nativeEvent.changedTouches.length === 1) {
      if (lastmovex === 0) {
        lastmovex = event.nativeEvent.changedTouches[0].pageX;
      } else {
        //   console.log('lasmovex', lastmovex);
        //   console.log(lastmovex - event.nativeEvent.changedTouches[0].pageX);
        let l = event.nativeEvent.changedTouches[0].pageX - lastmovex + left;

        setLeft(l);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View
        onStartShouldSetResponder={() => true}
        onResponderMove={(event) => onMove(event)}
        onResponderRelease={() => {
          lastmovex = 0;
        }}
        style={{
          position: 'absolute',
          height: 100,
          width: 100,
          borderWidth: 3,
          left: left,
        }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
});

export default Temp;
