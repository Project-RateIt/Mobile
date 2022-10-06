export const goToIndex = (flatListRef, index) => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index
    })
  }