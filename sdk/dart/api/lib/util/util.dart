class Util{
  static Map<String, dynamic> deleteEmptyMapEntity(Map<String, dynamic> data) {
    if(data == null) return null;
    List deleteKeys = List<String>();
    data.forEach((String key, dynamic value) {
      if(value == null) {
        deleteKeys.add(key);
      } else if(value is Map) {
        data[key] = Util.deleteEmptyMapEntity(value);
      }
    });
    deleteKeys.forEach((key) {
      data.remove(key);
    });
    return data;
  }
}