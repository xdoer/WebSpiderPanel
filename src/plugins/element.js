import Vue from "vue";
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
  Card,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Select,
  Switch,
  Option,
  Table,
  Tag,
  Menu,
  MenuItem,
  TableColumn,
  Message,
  MessageBox,
  Tooltip,
  Pagination
} from "element-ui";

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
Vue.use(Switch);
Vue.use(Option);
Vue.use(Table);
Vue.use(Tag);
Vue.use(TableColumn);
Vue.use(Menu);
Vue.use(Card);
Vue.use(MenuItem);
Vue.use(Tooltip);
Vue.use(Pagination);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
