import axios from 'axios'
import { browserHistory } from 'react-router'
import { assign, concat } from 'lodash'
import {
  UPDATE_DASHBOARD,

  FETCH_DASHBOARD_INCIDENTS,
  FETCH_DASHBOARD_BIGINCIDENTS,

  API_ERROR
} from './types'