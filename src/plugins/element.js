import Vue from 'vue';
import {
  Button,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Select,
  Option,
  Table,
  TableColumn,
  MessageBox,
  Message,
} from 'element-ui';

Vue.use(Button);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
// Vue.use(MessageBox);
Vue.use(Message);

// Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
