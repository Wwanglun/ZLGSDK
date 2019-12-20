import 'package:flutter/material.dart';

class ZLGIconButton extends StatelessWidget {
  final int value;
  final String title;
  final Icon icon;
  final Color color;
  final VoidCallback onTap;

  final double imageContainerSize = 50;

  ZLGIconButton(
      {@required this.title,
      @required this.icon,
      this.value,
      this.color = Colors.cyan,
      this.onTap});

  @override
  Widget build(BuildContext context) {
    return Material(
      type: MaterialType.transparency,
      child: InkWell(
          onTap: onTap,
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 8, vertical: 8),
            child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Container(
                      width: imageContainerSize,
                      height: imageContainerSize,
                      decoration: BoxDecoration(
                          color: color,
                          borderRadius: BorderRadius.all(
                              Radius.circular(imageContainerSize / 2))),
                      child: IconTheme(
                        data: Theme.of(context)
                            .iconTheme
                            .copyWith(color: Colors.white),
                        child: icon,
                      )),
                  value == null
                      ? SizedBox(height: 8)
                      : Padding(
                          padding: EdgeInsets.only(top: 10, bottom: 2),
                          child: Text(
                            value.toString(),
                            style: TextStyle(
                                fontSize: 25, fontWeight: FontWeight.w400),
                          )),
                  Text(title,
                      style: TextStyle(color: Colors.grey[600], fontSize: 15))
                ]),
          )),
    );
  }
}
