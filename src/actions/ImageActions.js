import axios from 'axios'
import {
  OPEN_TPL_IMAGE_MODAL,
  CLOSE_TPL_IMAGE_MODAL,

  FETCH_IMAGES,
  UPLOAD_IMAGE
} from './types'

import { apiError } from './errors'

import { ROOT_URL } from './config'

export const openTplImageModal = () => {
  return (dispatch) => {
    dispatch({
      type: OPEN_TPL_IMAGE_MODAL
    })
  }
}

export const closeTplImageModal = (selectedImage) => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_TPL_IMAGE_MODAL,
      data: selectedImage
    })
  }
}

export const uploadImage = (formData) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/upload`, formData)
      .then(response => uploadImageSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const uploadImageSuccess = (dispatch, response) => {
  dispatch({
    type: UPLOAD_IMAGE,
    data: response.data
  })
}

export const fetchImages = () => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/customImage`)
      .then(response => fetchImagesSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const fetchImagesSuccess = (dispatch, response) => {
  dispatch({
    type: FETCH_IMAGES,
    data: response.data._embedded.customImages
  })
}
