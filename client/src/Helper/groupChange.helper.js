const groupChange = {
  status: ({ sourceValue, destinationObject }) => {
    sourceValue.status = destinationObject.groupHeading;
    return sourceValue;
  },

  assignee: ({ sourceValue, destinationObject }) => {
    sourceValue.assignee = destinationObject.groupKey || null;
    return sourceValue;
  },

  priority: ({ sourceValue, destinationObject }) => {
    if(destinationObject.groupHeading==="Unassigned"){
      sourceValue.priority = null;
    }else{
      sourceValue.priority = destinationObject.groupHeading;
    }
    return sourceValue;
  },
};

export default groupChange;
