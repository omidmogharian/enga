import {enga} from 'enga'
import ngRoute from 'ngRoute'
import ngCookies from 'ngCookies'
import jQuery from 'jquery'
import stepFormWizard from 'stepFormWizard'
import ionRangeSlider from 'ionRangeSlider'
import iCheck from 'iCheck'
//import dropzone from 'dropzone'
import progressBar from 'progressBar'
import tagsInput from 'tagsInput'
import AmCharts from 'interactiveMap'
//import fileupload from 'fileupload'
import ngFileUpload from 'ngFileUpload'
import bootstrap from 'bootstrap'
import ngTypeahead from 'ngTypeahead'
import angularuibootstraptemplates from 'angular-ui-bootstrap-templates'
import angularuibootstrap from 'angular-ui-bootstrap'
import ngCkeditor from 'ngCkeditor'
import CKEDITOR from 'ckeditor'
import summernoteOriginal from 'summernote'
import summernote from 'angular-summernote'
import Highcharts from 'Highcharts'
import HighchartsMore from 'HighchartsMore'
import HighchartsRegression from 'HighchartsRegression'
import HighchartsExporting from 'HighchartsExporting'
import DataTables from 'DataTables'
import uiRouter from 'ui.router'
import underscore from 'underscore'
import ngSanitize from 'angular-sanitize'

import Bridge from './lib/bridge'
import basicAdapter from './cas/basicAdapter'
import app from './app/app.js'

var bridge = new Bridge(basicAdapter);

enga.factory(app, bridge, ['ngRoute','ngCookies', 'ngFileUpload', 'ui.router', 'ui.bootstrap', 'ui.bootstrap.tpls', 'ngSanitize']);