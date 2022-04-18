import { createApp } from 'vue';

import App from './App.vue';
import GeneralStyle from './components/UI/GeneralStyle.vue';
import BaseCard from './components/UI/BaseCard.vue';
import BaseContainer from './components/UI/BaseContainer.vue';
import BaseScreenDivision from './components/UI/BaseScreenDivision.vue';
import BaseDialog from './components/UI/BaseDialog.vue'

const app = createApp(App);

app.component('general-style', GeneralStyle);
app.component('base-card', BaseCard);
app.component('base-container', BaseContainer);
app.component('base-screen-division', BaseScreenDivision);
app.component('base-dialog', BaseDialog);

app.mount('#app');
