const groupChange = {
  status: ({ sourceValue, destinationObject }) => {
    sourceValue.status = destinationObject.groupHeading;
    sourceValue.statusColor = destinationObject.headingColor;
    return sourceValue;
  },

  assignee: ({sourceValue,destinationObject}) => {
    sourceValue.assignee=destinationObject.groupKey || null;
    return sourceValue
  },
};

export default groupChange;
