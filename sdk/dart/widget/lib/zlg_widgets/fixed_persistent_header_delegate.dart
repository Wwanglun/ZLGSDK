import 'package:flutter/material.dart';

class FixedPersistentHeaderDelegate extends SliverPersistentHeaderDelegate {
  FixedPersistentHeaderDelegate({
    @required this.height,
    @required this.child,
  });

  final double height;
  final Widget child;

  @override
  double get minExtent => height;

  @override
  double get maxExtent => height;

  @override
  Widget build(
      BuildContext context, double shrinkOffset, bool overlapsContent) {
    return new SizedBox.expand(child: child);
  }

  @override
  bool shouldRebuild(FixedPersistentHeaderDelegate oldDelegate) {
    return height != oldDelegate.height || child != oldDelegate.child;
  }
}
