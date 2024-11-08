const checkIfHit = ({ allChildren, goingUp }) => {
  const flippedArray = [...allChildren].reverse();

  const top = intersects[0].object.userData.top;
  const bottom = intersects[0].object.userData.bottom;

  // Array to track whether each child should stop
  const stopArray = flippedArray.map((child, index) => {
    const childY = child.children[1].position.y;
    const extra = child.children[1].userData.scale[1];
    
    // Calculate the new Y position for this child based on goingUp or not
    const newY = goingUp 
      ? index === 0 ? childY : childY + extra + (index * 14)
      : index === 0 ? childY : childY - extra - (index * 14);
    
    // Determine if this child has reached the boundary
    if (goingUp) return parseInt(top) <= parseInt(newY);
    else return parseInt(bottom) >= parseInt(newY);
  });

  return stopArray; // Array indicating which children should stop
};

const pushInSpace = ({ currentY, currentSection, currentIndex }) => {
  const goingUp = dragStateRef.current.goingUp;
  const allChildren = selectChildren({ currentY, currentSection, currentIndex, goingUp });

  if (!allChildren.length) return;

  const stopArray = checkIfHit({ allChildren, goingUp });

  allChildren.forEach((child, index) => {
    const {svId, scale} = child.userData;
    const thisChildObj = allfurnishing.current.children.find(e => e.userData.svId === svId);
    const thisChildY = child.children[1].position.y;
    if (index === 0) pushChildRef.current = parseInt(child.children[1].position.y);
    const adjustment = ((minDis + scale[1]) * (index + 1));
    const distance = goingUp ? thisChildY - currentY : currentY - thisChildY;

    if (Math.abs(distance) <= adjustment && !stopArray[index]) {
      const newY = goingUp ? currentY + adjustment : currentY - adjustment;
      updatePosition(svId, newY, child)
      thisChildObj.children[1].position.set(
        child.userData.position[0],
        newY,
        child.userData.position[2]
      );
    };
  });
  moveRef.current.pushUp = !stopArray.every(Boolean);
  moveRef.current.pushDown = !stopArray.every(Boolean);
};

const handleDrag = useCallback((state) => {
  if (state.delta[0] === 0 && state.delta[1] === 0) return;
  document.body.style.cursor = "grabbing";

  setDirection(state);
  setShowMeasure(true);

  const {goingUp} = dragStateRef.current;
  const {up, down, pushUp, pushDown} = moveRef.current;

  pointer.x = ((state.values[0] - size.left) / size.width) * 2 - 1;
  pointer.y = -((state.values[1] - size.top) / size.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  intersects = raycaster.intersectObjects(spaceRef.children, true);

  const elementsTop = height - Config.plate.thickness
  const elementsBottom = (baseType == Config.baseType.panel
    ? Config.plate.plinthHeight
    : Config.glider.height) + Config.plate.thickness;

  if (!intersects[0]) return;

  const currentIndex = allfurnishing.current.children.findIndex(e => e.userData.svId === svId);

  const {
    top,
    bottom,
    topAsset,
    bottomAsset,
    availableTop,
    availableBottom,
    xIndex,
    type
  } = intersects[0].object.userData;

  const result = getDraggingInfo({
    type,
    top,
    bottom,
    topAsset,
    bottomAsset,
    initialPosY: intersects[0].point.y * 100 + height / 2,
    raster: Config.furnishing.default.raster,
    availableWidth: intersects[0].object.geometry.parameters.width,
    objectHeight: scale[1],
  });

  const cursor = intersects[0].point.y * 100 + height / 2; // = current mouse position save as product

  // before update position we need to detect pushUp/pushDown
  // with distance ?


  // before releasing the lock, we need to make sure distance >= minDistance
  if (!goingUp && !moveRef.current.pushUp) moveRef.current.pushUp = true;
  if (goingUp && !moveRef.current.pushDown) moveRef.current.pushDown = true;

  if (goingUp && !pushUp) return;
  if (!goingUp && !pushDown) return;

  if (goingUp && !up) return;
  if (!goingUp && !up && (cursor + minDis + scale[1]) > elementsTop) return;

  if (!goingUp && !down) return;
  if (goingUp && !down && (cursor - minDis - scale[1]) < elementsBottom) return;

  if (goingUp && parseInt(cursor + minDis) >= parseInt(elementsTop)) {
    moveRef.current.up = false;
    ref.current.position.set( // set to limit
      intersects[0].object.position.x,
      elementsTop - addY - minDis - (scale[1] / 2),
      position[2]
    );
    return;
  } else {
    if (!up) moveRef.current.up = true;
  }

  if (!goingUp && parseInt(cursor - minDis) <= parseInt(elementsBottom)) {
    moveRef.current.down = false;
    ref.current.position.set( // set to limit
      intersects[0].object.position.x,
      elementsBottom + addY + minDis + (scale[1] / 2),
      position[2]
    );
    return;
  } else {
    if (!down) moveRef.current.down = true;
  }

  if (intersects[0].object.name === "available") {
    ref.current.position.set(
      intersects[0].object.position.x,
      result.posY - addY,
      position[2]
    );
  } else {
    if (shelfTypes.includes(type)) {
      ref.current.position.set(
        intersects[0].object.position.x,
        result.posY - addY,
        position[2]
      );
    } else {
      setShowMeasure(false);
      ref.current?.position.set(
        intersects[0].point.x * 100 + width / 2,
        intersects[0].point.y * 100 + height / 2 - addY,
        depth + depth / 2
      );
    }
  }

  updateRuler(availableTop, availableBottom, result);

  const currentY = ref.current.position.y;

  if (scale[0] !== result.objectWidth && intersects[0].object.name !== "other") {
    updateAsset({ // ! can we change to update ref ??
      index,
      newData: {scale: [result.objectWidth, scale[1], scale[2]]}
    });
  }

  pushInSpace({currentY, currentSection: xIndex, currentIndex});
}, [spaceRef, dragStateRef, ref, moveRef, allfurnishing, scale, measureInfo, hanging, withFeet, intersects]);