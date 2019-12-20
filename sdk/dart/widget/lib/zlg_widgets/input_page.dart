import 'package:flutter/material.dart';
import 'package:meta/meta.dart';

typedef SaveCallback = Function(String value);

class InputModel {
  final String title;
  final String actionName;
  final String hint;
  final String value;
  final SaveCallback onSave;
  final TextInputType keyboardType;
  final bool obscureText;

  InputModel(
      {@required this.title,
      this.hint = '',
      this.actionName = '保存',
      this.value,
      this.onSave,
      this.keyboardType = TextInputType.text,
      this.obscureText = false});
}

class InputPage extends StatefulWidget {
  final InputModel inputModel;

  InputPage({this.inputModel});

  @override
  _InputPageState createState() => _InputPageState();
}

class _InputPageState extends State<InputPage> {
  String value;
  TextEditingController controller;
  InputModel inputModel;

  @override
  void initState() {
    super.initState();
    inputModel = widget.inputModel;
  }

  @override
  void dispose() {
    super.dispose();
    controller.removeListener(_editTextListener);
  }

  void _editTextListener() {
    value = controller.text;
  }

  void _initTextEditingController() {
    controller = TextEditingController.fromValue(TextEditingValue(
        text: value,
        selection: TextSelection.fromPosition(TextPosition(
            affinity: TextAffinity.downstream, offset: value.length))))
      ..addListener(_editTextListener);
  }

  void _save() {
    inputModel.onSave(controller.text);
  }

  @override
  Widget build(BuildContext context) {
    RouteSettings settings = ModalRoute.of(context).settings;
    if (settings.arguments != null) {
      inputModel = settings.arguments as InputModel;
    }
    if (value == null) {
      value = inputModel.value;
    }
    assert(inputModel != null && inputModel.title != null);
    _initTextEditingController();

    return Scaffold(
        appBar: AppBar(
            title: Text(inputModel.title),
            centerTitle: true,
            actions: <Widget>[
              Center(
                  child: Padding(
                      padding: EdgeInsets.only(right: 10),
                      child: ButtonTheme(
                          minWidth: 54,
                          height: 32,
                          child: RaisedButton(
                              padding: EdgeInsets.symmetric(horizontal: 0),
                              color: Colors.green,
                              textColor: Colors.white,
                              child: Text(inputModel.actionName,
                                  style: TextStyle(fontSize: 16)),
                              onPressed: _save))))
            ]),
        body: Padding(
            padding: EdgeInsets.only(top: 20, left: 10, right: 10),
            child: Form(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  TextFormField(
                    controller: controller,
                    keyboardType: inputModel.keyboardType,
                    obscureText: inputModel.obscureText,
                    autofocus: true,
                    decoration: InputDecoration(
                        focusedBorder: UnderlineInputBorder(
                            borderSide: BorderSide(
                                color: Theme.of(context).accentColor))),
                  ),
                  Container(height: 10),
                  Text(
                    inputModel.hint,
                    style: TextStyle(fontSize: 14, color: Colors.grey),
                  )
                ],
              ),
            )));
  }
}
