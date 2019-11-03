import Shared from './shared';
import Communication from './communication/app-client';

const shared = new Shared('__core__');
const microfrontendFolderName = 'microfrontends';


class Controller {
  microfrontends = null;

  areAllMicrofrontendsOnStatus(status) {
    return !Object.values(this.microfrontends).find(microfrontend => microfrontend.status !== status);
  }

  onLoadMessage = message => () => {
    const messageMicrofrontend = this.microfrontends[message.origin];
    if (messageMicrofrontend.hasBeenLoaded()) {
      this.__onMicrofrontendHotReload();
    }
    messageMicrofrontend.loaded();
  }

  onScriptMessage = message => () => {
    const messageMicrofrontend = this.microfrontends[message.origin];

    messageMicrofrontend.importScript(event.data.payload);
    if (this.areAllMicrofrontendsOnStatus(Microfrontend.STATUS.IMPORTED)) {
      this.__onMicrofrontendsLoaded(this.microfrontends);
    }
  }

  onStyleMessage = message => () => {
    const messageMicrofrontend = this.microfrontends[message.origin];
    messageMicrofrontend.setStyle(event.data.payload);
    this.__onMicrofrontendStyleChange(messageMicrofrontend.name, messageMicrofrontend.style);
  }

  initialize() {
    shared.set('registerMicrofrontend', (name, microfrontendShared) => {
      this.microfrontends[name].register(microfrontendShared);
    });

    const communication = new Communication();
    communication.onMessage((message) => {
      ({
        [Communication.TYPE.LOAD]: this.onLoadMessage(message),
        [Communication.TYPE.SCRIPT]: this.onScriptMessage(message),
        [Communication.TYPE.STYLE]: this.onStyleMessage(message)
      }[message.type] || (() => { console.info(`Unknown type ${message.type}`); }))();
    }).initialize();

    fetch(`/${microfrontendFolderName}/meta.json`).then(response => response.json()).then(meta => {
      this.microfrontends = Object.keys(meta)
        .reduce((agg, microfrontendName) => Object.assign(agg, {
          [microfrontendName] : new Microfrontend(microfrontendName, meta[microfrontendName])
        }), {});

      this.__onMicrofrontendsDiscovered(this.microfrontends);
    });
  }

  onMicrofrontendsDiscovered(callback) {
    this.__onMicrofrontendsDiscovered = callback;
    return this;
  }
  onMicrofrontendsLoaded(callback) {
    this.__onMicrofrontendsLoaded = callback;
    return this;
  }
  onMicrofrontendHotReload(callback) {
    this.__onMicrofrontendHotReload = callback;
    return this;
  }
  onMicrofrontendStyleChange(callback) {
    this.__onMicrofrontendStyleChange = callback;
    return this;
  }
}

class Microfrontend {
  static STATUS = {
    DISCOVERED: 'DISCOVERED',
    LOADED: 'LOADED',
    IMPORTED: 'IMPORTED',
    REGISTERED: 'REGISTERED',
    INITIALIZED: 'INITIALIZED'
  };

  name
  status = Microfrontend.STATUS.CREATED;
  host
  files = {
    js: null,
    css: null
  };
  style = []
  content
  isLoaded = false

  constructor(name, metaInfo) {
    this.name = name;
    this.host = metaInfo.host;
    this.files.js = metaInfo.js;
    this.files.css = metaInfo.css;
  }

  register(content) {
    this.status = Microfrontend.STATUS.REGISTERED;
    this.content = content;
  }

  loaded() {
    this.status = Microfrontend.STATUS.LOADED;
    this.isLoaded = true;
  }

  importScript(jsScripts) {
    this.files.js = jsScripts;
    this.status = Microfrontend.STATUS.IMPORTED;
  }

  hasBeenLoaded() {
    return this.isLoaded;
  }

  isReady() {
    return this.status === Microfrontend.STATUS.REGISTERED;
  }

  setStyle(style) {
    this.style = style;
  }
}

export default Controller;