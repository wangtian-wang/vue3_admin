export const handleGenerateFormConfig = (tableList: any) => {
  const res = tableList.map((item: any) => {
    if (item.editable) {
      return {
        field: item.prop,
        label: item.label,
        type: "text",
      };
    }
  });
  return res.filter((item: any) => item);
};
