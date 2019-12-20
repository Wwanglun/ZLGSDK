import 'package:flutter/material.dart';

import 'empty.dart';

typedef String StringFn<T>(T data);
typedef void IndexBoolCallback(int index, bool value);
typedef void ListCallback<T>(List<T> items);

class MultiSelector<T> extends StatefulWidget {
  final List<T> items;
  final List<T> selectedItems;
  final StringFn<T> titleFn;
  final IndexBoolCallback onChange;

  MultiSelector(
      {@required this.items,
      @required this.titleFn,
      this.onChange,
      this.selectedItems});

  @override
  State createState() => _MultiSelectorState<T>(itemTitleFn: titleFn);
}

class _MultiSelectorState<T> extends State<MultiSelector> {
  List<T> selectedItems;
  StringFn<T> itemTitleFn;

  _MultiSelectorState({this.itemTitleFn});

  @override
  void initState() {
    super.initState();
    selectedItems = [];
    widget.selectedItems.forEach((item) => selectedItems.add(item));
  }

  @override
  Widget build(BuildContext context) {
    if (widget.items.length > 0) {
      return ListView.separated(
          itemCount: widget.items.length,
          separatorBuilder: (context, state) {
            return Divider(height: 0);
          },
          itemBuilder: (context, index) {
            var data = widget.items[index];
            return CheckboxListTile(
                title: Text(itemTitleFn(data)),
                value: selectedItems.indexOf(data) >= 0,
                onChanged: (val) {
                  setState(() {
                    if (val) {
                      selectedItems.add(data);
                    } else {
                      selectedItems.remove(data);
                    }
                  });
                  if (widget.onChange != null) {
                    widget.onChange(index, val);
                  }
                });
          });
    } else {
      return Empty(title: '没有数据');
    }
  }
}

class SingleSelector<T> extends StatefulWidget {
  final List<T> items;
  final T selectedItem;
  final StringFn<T> itemTitleFn;
  final ValueChanged<T> onChange;

  SingleSelector(
      {@required this.items,
      this.selectedItem,
      this.itemTitleFn,
      this.onChange});

  @override
  State createState() => _SingleSelectorState<T>(
      titleFn: itemTitleFn, selectedItem: selectedItem, onChange: onChange);
}

class _SingleSelectorState<T> extends State<SingleSelector> {
  final StringFn<T> titleFn;
  final ValueChanged<T> onChange;
  T selectedItem;

  _SingleSelectorState({this.titleFn, this.onChange, this.selectedItem});

  @override
  Widget build(BuildContext context) {
    if (widget.items.length > 0) {
      return ListView.separated(
          shrinkWrap: true,
          itemBuilder: (context, index) {
            var data = widget.items[index];
            return RadioListTile<T>(
                title: Text(titleFn(data)),
                value: data,
                groupValue: selectedItem,
                controlAffinity: ListTileControlAffinity.trailing,
                onChanged: (item) {
                  setState(() {
                    selectedItem = item;
                  });
                  if (onChange != null) {
                    onChange(item);
                  }
                });
          },
          separatorBuilder: (context, index) {
            return Divider(height: 0);
          },
          itemCount: widget.items.length);
    } else {
      return Empty(title: '没有数据');
    }
  }
}

final EdgeInsets _dialogContentPadding =
    EdgeInsets.only(left: 10, right: 10, top: 10, bottom: 0);

void showSingleSelectorDialog<T>(BuildContext context,
    {double contentHeight = 250,
    Widget title,
    ValueChanged<T> onChange,
    @required List<T> items,
    T selectedItem,
    @required StringFn<T> itemTitleFn}) {
  showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
            title: title,
            titleTextStyle: Theme.of(context)
                .textTheme
                .title
                .copyWith(color: Colors.grey[700]),
            actions: <Widget>[
              FlatButton(
                  child: Text('取消'),
                  onPressed: () {
                    Navigator.of(context).pop();
                  })
            ],
            contentPadding: _dialogContentPadding,
            content: SizedBox(
              height: contentHeight,
              width: MediaQuery.of(context).size.width * 0.9,
              child: SingleSelector<T>(
                items: items,
                selectedItem: selectedItem,
                itemTitleFn: itemTitleFn,
                onChange: onChange,
              ),
            ));
      });
}

void showSingleSelectorBottomSheet<T>(BuildContext context,
    {String title,
    ValueChanged<T> onChange,
    @required List<T> items,
    T selectedItem,
    @required StringFn<T> itemTitleFn,
    double height = double.infinity}) {
  showModalBottomSheet(
      context: context,
      builder: (_) {
        return Container(
            height: height,
            child: Column(mainAxisSize: MainAxisSize.min, children: <Widget>[
              Container(
                  width: double.infinity,
                  alignment: Alignment.center,
                  child: Text(title, style: Theme.of(context).textTheme.title),
                  padding: EdgeInsets.symmetric(vertical: 12, horizontal: 15),
                  color: Colors.grey[200]),
              Expanded(
                  child: SingleSelector<T>(
                items: items,
                selectedItem: selectedItem,
                itemTitleFn: itemTitleFn,
                onChange: onChange,
              ))
            ]));
      });
}

void showMultiSelectorDialog<T>(BuildContext context,
    {double contentHeight = 250,
    Widget title,
    @required List<T> items,
    List<T> selectedItems,
    @required StringFn<T> titleFn,
    ListCallback<T> onConfirm}) {
  showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
            title: title,
            titleTextStyle: Theme.of(context)
                .textTheme
                .title
                .copyWith(color: Colors.grey[700]),
            actions: <Widget>[
              FlatButton(
                  child: Text('取消'),
                  onPressed: () {
                    Navigator.of(context).pop();
                  }),
              FlatButton(
                  child: Text('确定'),
                  onPressed: () {
                    Navigator.of(context).pop();
                    if (onConfirm != null) {
                      onConfirm(selectedItems);
                    }
                  })
            ],
            contentPadding: _dialogContentPadding,
            content: SizedBox(
                height: 250,
                width: MediaQuery.of(context).size.width * 0.9,
                child: MultiSelector<T>(
                    items: items,
                    selectedItems: selectedItems,
                    titleFn: titleFn,
                    onChange: (index, val) {
                      if (val) {
                        selectedItems.add(items[index]);
                      } else {
                        selectedItems.remove(items[index]);
                      }
                    })));
      });
}

void showMultiSelectorBottomSheet<T>(BuildContext context,
    {double height = double.infinity,
    String title,
    @required List<T> items,
    List<T> selectedItems,
    @required StringFn<T> titleFn,
    ListCallback<T> onConfirm}) {
  var buttonTextStyle =
      TextStyle(color: Theme.of(context).accentColor, fontSize: 16);
  showModalBottomSheet(
      context: context,
      builder: (_) {
        return Container(
            height: height,
            child: Column(mainAxisSize: MainAxisSize.min, children: <Widget>[
              Container(
                  color: Colors.grey[200],
                  padding: EdgeInsets.symmetric(horizontal: 5),
                  child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        FlatButton(
                            onPressed: () {
                              Navigator.of(context).pop();
                            },
                            child: Text('取消', style: buttonTextStyle)),
                        Text(
                          title ?? '',
                          style: Theme.of(context).textTheme.subhead,
                        ),
                        FlatButton(
                            onPressed: () {
                              Navigator.of(context).pop();
                              if (onConfirm != null) {
                                onConfirm(selectedItems);
                              }
                            },
                            child: Text('确定', style: buttonTextStyle)),
                      ])),
//              Container(
//                  width: double.infinity,
//                  alignment: Alignment.center,
//                  child: Text(title, style: Theme.of(context).textTheme.title),
//                  padding: EdgeInsets.symmetric(vertical: 12, horizontal: 15),
//                  color: Colors.grey[200]),
              Expanded(
                  child: MultiSelector<T>(
                      items: items,
                      selectedItems: selectedItems,
                      titleFn: titleFn,
                      onChange: (index, val) {
                        if (val) {
                          selectedItems.add(items[index]);
                        } else {
                          selectedItems.remove(items[index]);
                        }
                      }))
            ]));
      });
}
