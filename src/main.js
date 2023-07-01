import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import TableControls from './components/ui/TableControls.vue';
import EmptyTable from './components/ui/EmptyTable.vue';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueAwesomePaginate);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.component('table-controls', TableControls);
app.component('empty-table', EmptyTable);


app.mount('#app');
