import LoginCtrl from './controllers/LoginCtrl'
import LoginService from './services/LoginService'
import MyDirective from './directives/myDirective'
import BaseService from './services/BaseService'
import StepFormWizard from './directives/stepFormWizard'
import IonRangeSlider from './directives/ionSlider'
import RadioGroup from './directives/radioGroup'
import CheckboxGroup from './directives/checkboxGroup'
import ProgressBar from './directives/progressBar'
import TagsInput from './directives/tagsInput'
import InteractiveMap from './directives/interactiveMap'
import FileUploadDirective from './directives/fileUpload'
import Tooltip from './directives/tooltip'
import Header from './directives/header'
import Sidebar from './directives/sidebar'
import TableOfTopVideos from './directives/tableOfTopVideos'


var config = {
  'name': 'base',
  'configuration': {
    'controller': {
      'LoginCtrl': LoginCtrl,
    },
    'service': {
      'LoginService': LoginService,
      'BaseService': BaseService,
      'gApi': () => window.gapi,
      '$': () => window.$
    },
    'directive': {
      'stepFormWizard': StepFormWizard,
      'ionSlider': IonRangeSlider,
      'radioGroup': RadioGroup,
      'checkboxGroup': CheckboxGroup,
      'progressBar': ProgressBar,
      'tagsInput': TagsInput,
      'interactiveMap': InteractiveMap,
      'fileUpload': FileUploadDirective,
      'toggle': Tooltip,
      'pageHeader': Header,
      'pageSidebar': Sidebar,
      'tableOfTopVideos':TableOfTopVideos
    },

    'constant': {
      'loginInfo': {
        'client_id': '145822096776-a9kv6s7ml3iubvg081627pniadag5fll.apps.googleusercontent.com',
        'redirectTo':'/channel-analyse/form/1',
        'loginPage': '/base/login'
      }

    }
  },

  'route': {
    '/login': {
      'templateUrl': 'base/templates/login.html',
      'controller': 'LoginCtrl',
      'controllerAs': 'vm'
    },
     otherwise: {
      'redirectTo':'base/login'
    }

  }
};

export default config;
