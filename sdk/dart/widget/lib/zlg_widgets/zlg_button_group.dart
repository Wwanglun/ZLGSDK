import 'package:flutter/material.dart';
import 'package:meta/meta.dart';

typedef IndexCallback = void Function(int index);

class ZLGButtonGroup extends StatefulWidget {
  final List<String> texts;
  final IndexCallback onSelect;
  final bool roundEnd;

  final Color selectedBackgroundColor;
  final Color selectedTextColor;
  final Color backgroundColor;
  final Color textColor;

  ZLGButtonGroup(
      {this.texts,
      this.onSelect,
      this.roundEnd = false,
      this.selectedBackgroundColor,
      this.selectedTextColor,
      this.backgroundColor,
      this.textColor})
      : assert(texts != null);

  @override
  _ZLGButtonGroupState createState() => _ZLGButtonGroupState();
}

class _ZLGButtonGroupState extends State<ZLGButtonGroup> {
  int currentIndex;
  final double height = 32.0;

  @override
  void initState() {
    super.initState();
    currentIndex = 0;
  }

  @override
  Widget build(BuildContext context) {
    final BorderSide borderSide =
        BorderSide(color: Theme.of(context).accentColor, width: 0.5);

    return Row(
        children: widget.texts.asMap().keys.map((index) {
      return Expanded(
          flex: 1,
          child: Material(
            child: InkWell(
                onTap: () {
                  if (index != currentIndex) {
                    setState(() {
                      currentIndex = index;
                    });
                    if (widget.onSelect != null) {
                      widget.onSelect(index);
                    }
                  }
                },
                splashColor: Colors.grey[400],
                borderRadius: BorderRadius.all(Radius.circular(16)),
                child: Ink(
                  height: height,
                  decoration: BoxDecoration(
                      border: Border.all(
                          color: Theme.of(context).accentColor, width: 0.5),
                      borderRadius: BorderRadius.only(
                        topLeft: (widget.roundEnd && index == 0)
                            ? Radius.circular(height / 2)
                            : Radius.zero,
                        bottomLeft: (widget.roundEnd && index == 0)
                            ? Radius.circular(height / 2)
                            : Radius.zero,
                        topRight: (widget.roundEnd &&
                                index == widget.texts.length - 1)
                            ? Radius.circular(height / 2)
                            : Radius.zero,
                        bottomRight: (widget.roundEnd &&
                                index == widget.texts.length - 1)
                            ? Radius.circular(height / 2)
                            : Radius.zero,
                      ),
                      color: index == currentIndex
                          ? widget.selectedBackgroundColor ??
                              Theme.of(context).accentColor
                          : widget.backgroundColor ?? Colors.white),
                  child: Center(
                      child: Text(
                    widget.texts[index],
                    style: TextStyle(
                        color: index == currentIndex
                            ? widget.selectedTextColor ?? Colors.white
                            : widget.textColor ?? Colors.grey[700]),
                  )),
                )),
          ));
    }).toList());
  }
}
